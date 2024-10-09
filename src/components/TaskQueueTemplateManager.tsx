import React, { useState } from 'react'
import { TaskQueueTemplate, Task, AccountCreationConfig, MusicStreamingConfig, PcGroup } from '../types'

interface TaskQueueTemplateManagerProps {
  templates: TaskQueueTemplate[]
  onUpdateTemplates: (newTemplates: TaskQueueTemplate[]) => void
  onApplyTemplate: (templateId: string, target: PcGroup['id'] | string) => void
  pcGroups: PcGroup[]
  slavePcIds: string[]
}

const TaskQueueTemplateManager: React.FC<TaskQueueTemplateManagerProps> = ({
  templates,
  onUpdateTemplates,
  onApplyTemplate,
  pcGroups,
  slavePcIds
}) => {
  const [newTemplateName, setNewTemplateName] = useState('')
  const [editingTemplateId, setEditingTemplateId] = useState<string | null>(null)
  const [applyTarget, setApplyTarget] = useState<PcGroup['id'] | string>(pcGroups[0]?.id || '')

  const handleAddTemplate = () => {
    if (newTemplateName.trim()) {
      const newTemplate: TaskQueueTemplate = {
        id: Date.now().toString(),
        name: newTemplateName.trim(),
        tasks: []
      }
      onUpdateTemplates([...templates, newTemplate])
      setNewTemplateName('')
    }
  }

  const handleDeleteTemplate = (templateId: string) => {
    onUpdateTemplates(templates.filter(t => t.id !== templateId))
  }

  const handleEditTemplate = (templateId: string) => {
    setEditingTemplateId(templateId)
  }

  const handleSaveTemplate = (template: TaskQueueTemplate) => {
    onUpdateTemplates(templates.map(t => t.id === template.id ? template : t))
    setEditingTemplateId(null)
  }

  const handleAddTask = (templateId: string, taskType: 'account_creation' | 'music_streaming') => {
    const newTask: Task = {
      id: Date.now().toString(),
      type: taskType,
      status: 'in_queue',
      config: taskType === 'account_creation' 
        ? { website: 'gmail' } as AccountCreationConfig
        : { platform: 'spotify', playlist: [], duration: 60 } as MusicStreamingConfig
    }
    onUpdateTemplates(templates.map(t => 
      t.id === templateId ? { ...t, tasks: [...t.tasks, newTask] } : t
    ))
  }

  const handleRemoveTask = (templateId: string, taskId: string) => {
    onUpdateTemplates(templates.map(t => 
      t.id === templateId ? { ...t, tasks: t.tasks.filter(task => task.id !== taskId) } : t
    ))
  }

  const handleUpdateTaskConfig = (templateId: string, taskId: string, newConfig: AccountCreationConfig | MusicStreamingConfig) => {
    onUpdateTemplates(templates.map(t => 
      t.id === templateId ? {
        ...t,
        tasks: t.tasks.map(task => 
          task.id === taskId ? { ...task, config: newConfig } : task
        )
      } : t
    ))
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Task Queue Templates</h2>
      <div className="mb-4">
        <input
          type="text"
          value={newTemplateName}
          onChange={(e) => setNewTemplateName(e.target.value)}
          placeholder="New template name"
          className="mr-2 px-2 py-1 border rounded"
        />
        <button
          onClick={handleAddTemplate}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
        >
          Add Template
        </button>
      </div>
      {templates.map(template => (
        <div key={template.id} className="mb-4 p-4 border rounded">
          <h3 className="text-xl font-semibold mb-2">{template.name}</h3>
          {editingTemplateId === template.id ? (
            <div>
              <input
                type="text"
                value={template.name}
                onChange={(e) => onUpdateTemplates(templates.map(t => t.id === template.id ? { ...t, name: e.target.value } : t))}
                className="mr-2 px-2 py-1 border rounded"
              />
              <button
                onClick={() => handleSaveTemplate(template)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
              >
                Save
              </button>
            </div>
          ) : (
            <div>
              <button
                onClick={() => handleEditTemplate(template.id)}
                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteTemplate(template.id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mr-2"
              >
                Delete
              </button>
              <select
                value={applyTarget}
                onChange={(e) => setApplyTarget(e.target.value)}
                className="mr-2 px-2 py-1 border rounded"
              >
                {pcGroups.map(group => (
                  <option key={group.id} value={group.id}>{group.name}</option>
                ))}
                {slavePcIds.map(pcId => (
                  <option key={pcId} value={pcId}>{pcId}</option>
                ))}
              </select>
              <button
                onClick={() => onApplyTemplate(template.id, applyTarget)}
                className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-1 px-2 rounded"
              >
                Apply Template
              </button>
            </div>
          )}
          <div className="mt-2">
            <button
              onClick={() => handleAddTask(template.id, 'account_creation')}
              className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-1 px-2 rounded mr-2"
            >
              Add Account Creation Task
            </button>
            <button
              onClick={() => handleAddTask(template.id, 'music_streaming')}
              className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-1 px-2 rounded"
            >
              Add Music Streaming Task
            </button>
          </div>
          <ul className="mt-2">
            {template.tasks.map(task => (
              <li key={task.id} className="flex items-center justify-between bg-gray-100 p-2 rounded mb-2">
                <span>{task.type}</span>
                {task.type === 'account_creation' && (
                  <select
                    value={(task.config as AccountCreationConfig).website}
                    onChange={(e) => handleUpdateTaskConfig(template.id, task.id, { website: e.target.value as AccountCreationConfig['website'] })}
                    className="ml-2 px-2 py-1 border rounded"
                  >
                    <option value="gmail">Gmail</option>
                    <option value="youtube">YouTube</option>
                    <option value="amazon">Amazon</option>
                    <option value="spotify">Spotify</option>
                    <option value="tidal">Tidal</option>
                    <option value="deezer">Deezer</option>
                    <option value="apple_music">Apple Music</option>
                  </select>
                )}
                {task.type === 'music_streaming' && (
                  <select
                    value={(task.config as MusicStreamingConfig).platform}
                    onChange={(e) => handleUpdateTaskConfig(template.id, task.id, { ...(task.config as MusicStreamingConfig), platform: e.target.value as MusicStreamingConfig['platform'] })}
                    className="ml-2 px-2 py-1 border rounded"
                  >
                    <option value="spotify">Spotify</option>
                    <option value="youtube_music">YouTube Music</option>
                    <option value="tidal">Tidal</option>
                    <option value="deezer">Deezer</option>
                    <option value="apple_music">Apple Music</option>
                  </select>
                )}
                <button
                  onClick={() => handleRemoveTask(template.id, task.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default TaskQueueTemplateManager