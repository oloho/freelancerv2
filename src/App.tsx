import React, { useState, useEffect, useCallback } from 'react'
import { RefreshCw, Power, List, X, Send, AlertTriangle, Download, Trash, CheckCircle } from 'lucide-react'
import { SlavePc, Task, TaskQueueTemplate, AppState, PcGroup, AccountCreationConfig, MusicStreamingConfig } from './types'
import { updatePc, updateAllPcs, rebootPc, fetchTaskQueueTemplates, updateBotVersion, checkPcStatus } from './services/pcManagement'
import { mockSlavePcs, getCurrentBotVersion, isBotVersionOutdated } from './services/mockData'
import ErrorBoundary from './components/ErrorBoundary'
import LogViewer from './components/LogViewer'
import TaskConfigModal from './components/TaskConfigModal'
import AccountList from './components/AccountList'
import TaskQueueTemplateManager from './components/TaskQueueTemplateManager'
import PcGroupManager from './components/PcGroupManager'

function App() {
  const [slavePcs, setSlavePcs] = useState<SlavePc[]>(mockSlavePcs)
  const [selectedPcs, setSelectedPcs] = useState<string[]>([])
  const [taskQueueTemplates, setTaskQueueTemplates] = useState<TaskQueueTemplate[]>([])
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false)
  const [logs, setLogs] = useState<string[]>([])
  const [pcGroups, setPcGroups] = useState<PcGroup[]>([
    { id: 'group1', name: 'Group 1' },
    { id: 'group2', name: 'Group 2' },
  ])
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null)
  const currentBotVersion = getCurrentBotVersion()

  useEffect(() => {
    const fetchTemplates = async () => {
      const templates = await fetchTaskQueueTemplates()
      setTaskQueueTemplates(templates)
    }
    fetchTemplates()
  }, [])

  const addLog = useCallback((message: string) => {
    setLogs(prevLogs => [...prevLogs, `${new Date().toLocaleTimeString()}: ${message}`])
  }, [])

  const handleUpdateAll = async () => {
    const outdatedPcs = slavePcs.filter(pc => isBotVersionOutdated(pc.botVersion))
    if (outdatedPcs.length === 0) {
      addLog('All bots are up to date')
      return
    }

    for (const pc of outdatedPcs) {
      await updateBotVersion(pc.id)
      setSlavePcs(prevPcs => prevPcs.map(p => 
        p.id === pc.id ? { ...p, botVersion: currentBotVersion } : p
      ))
      addLog(`Updated bot version for PC ${pc.id}`)
    }

    addLog('All outdated bots have been updated')
  }

  const handleCheckAllStatus = async () => {
    addLog('Checking status of all PCs...')
    for (const pc of slavePcs) {
      const isResponsive = await checkPcStatus(pc.id)
      setSlavePcs(prevPcs => prevPcs.map(p => 
        p.id === pc.id ? { ...p, status: isResponsive ? 'online' : 'offline' } : p
      ))
      addLog(`PC ${pc.id} is ${isResponsive ? 'responsive' : 'unresponsive'}`)
    }
    addLog('Status check completed for all PCs')
  }

  const handleReboot = async (pcId: string) => {
    await rebootPc(pcId)
    addLog(`PC ${pcId} rebooted`)
  }

  const handleRemoveTask = (pcId: string, taskId: string) => {
    setSlavePcs(prevPcs => prevPcs.map(pc => 
      pc.id === pcId 
        ? { ...pc, taskQueue: pc.taskQueue.filter(task => task.id !== taskId) }
        : pc
    ))
    addLog(`Task ${taskId} removed from PC ${pcId}`)
  }

  const handleUpdateBotVersion = async (pcId: string) => {
    await updateBotVersion(pcId)
    setSlavePcs(prevPcs => prevPcs.map(pc => 
      pc.id === pcId ? { ...pc, botVersion: currentBotVersion } : pc
    ))
    addLog(`Bot version updated for PC ${pcId}`)
  }

  const getTaskDetails = (task: Task) => {
    if (task.type === 'account_creation') {
      const config = task.config as AccountCreationConfig
      return `Create ${config.website} account`
    } else if (task.type === 'music_streaming') {
      const config = task.config as MusicStreamingConfig
      return `Stream on ${config.platform} for ${config.duration}s`
    }
    return 'Unknown task'
  }

  const handleApplyTemplate = (templateId: string, target: PcGroup['id'] | string) => {
    const template = taskQueueTemplates.find(t => t.id === templateId)
    if (!template) {
      addLog(`Template ${templateId} not found`)
      return
    }

    setSlavePcs(prevPcs => prevPcs.map(pc => {
      if (
        (target === pc.group) ||
        (target === pc.id)
      ) {
        return {
          ...pc,
          taskQueue: [...pc.taskQueue, ...template.tasks.map(task => ({ ...task, id: Date.now().toString() }))]
        }
      }
      return pc
    }))

    addLog(`Applied template "${template.name}" to ${target}`)
  }

  const handleUpdateGroups = (newGroups: PcGroup[]) => {
    setPcGroups(newGroups)
    addLog('PC groups updated')
  }

  const handleUpdatePcGroup = (pcId: string, groupId: string) => {
    setSlavePcs(prevPcs => prevPcs.map(pc => 
      pc.id === pcId ? { ...pc, group: groupId === 'none' ? '' : groupId } : pc
    ))
    addLog(`PC ${pcId} ${groupId === 'none' ? 'removed from' : 'added to'} group ${groupId}`)
  }

  const filteredPcs = selectedGroup
    ? slavePcs.filter(pc => pc.group === selectedGroup)
    : slavePcs

  return (
    <ErrorBoundary>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Slave PC Control Panel</h1>
        <div className="mb-4">
          <select
            value={selectedGroup || ''}
            onChange={(e) => setSelectedGroup(e.target.value || null)}
            className="mr-2 px-2 py-1 border rounded"
          >
            <option value="">All PCs</option>
            {pcGroups.map(group => (
              <option key={group.id} value={group.id}>{group.name}</option>
            ))}
          </select>
          <button
            onClick={handleUpdateAll}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            <RefreshCw className="inline-block mr-1" size={16} /> Update All Bots
          </button>
          <button
            onClick={handleCheckAllStatus}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            <CheckCircle className="inline-block mr-1" size={16} /> Check All PC Status
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPcs.map(pc => (
            <div key={pc.id} className="border p-4 rounded">
              <h2 className="text-xl font-semibold mb-2">{pc.name}</h2>
              <p className={`mb-2 ${pc.status === 'online' ? 'text-green-500' : 'text-red-500'}`}>
                Status: {pc.status}
              </p>
              <p className="mb-2">Last Update: {new Date(pc.lastUpdate).toLocaleString()}</p>
              <p className={`mb-2 ${isBotVersionOutdated(pc.botVersion) ? 'text-red-500' : 'text-green-500'}`}>
                Bot Version: {pc.botVersion}
                {isBotVersionOutdated(pc.botVersion) && (
                  <button
                    onClick={() => handleUpdateBotVersion(pc.id)}
                    className="ml-2 bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded"
                  >
                    Update
                  </button>
                )}
              </p>
              <button
                onClick={() => handleReboot(pc.id)}
                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2"
              >
                <Power size={16} className="inline-block mr-1" /> Reboot
              </button>
              <div>
                <h3 className="text-lg font-semibold mb-2">Task Queue</h3>
                {pc.taskQueue.length === 0 ? (
                  <p className="text-gray-500">No tasks in queue</p>
                ) : (
                  <ul className="space-y-2">
                    {pc.taskQueue.map((task, index) => (
                      <li key={`${pc.id}-${task.id}`} className="flex items-center justify-between bg-gray-100 p-2 rounded">
                        <div className="flex-grow">
                          <span className="font-semibold">{index + 1}. </span>
                          <span>{getTaskDetails(task)} - </span>
                          <span className={`font-bold ${
                            task.status === 'in_queue' ? 'text-yellow-500' :
                            task.status === 'running' ? 'text-blue-500' :
                            task.status === 'completed' ? 'text-green-500' :
                            'text-red-500'
                          }`}>
                            {task.status}
                          </span>
                        </div>
                        {task.status === 'in_queue' && (
                          <button
                            onClick={() => handleRemoveTask(pc.id, task.id)}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ml-2"
                          >
                            <Trash size={16} />
                          </button>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
        <LogViewer logs={logs} />
        <AccountList />
        <TaskQueueTemplateManager
          templates={taskQueueTemplates}
          onUpdateTemplates={setTaskQueueTemplates}
          onApplyTemplate={handleApplyTemplate}
          pcGroups={pcGroups}
          slavePcIds={slavePcs.map(pc => pc.id)}
        />
        <PcGroupManager 
          groups={pcGroups} 
          onUpdateGroups={handleUpdateGroups} 
          slavePcs={slavePcs}
          onUpdatePcGroup={handleUpdatePcGroup}
        />
      </div>
    </ErrorBoundary>
  )
}

export default App