import { SlavePc, Task, TaskQueueTemplate } from '../types'
import { getCurrentBotVersion } from './mockData'

const mockDelay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const updatePc = async (pcId: string): Promise<void> => {
  await mockDelay(1000)
  console.log(`Mock: Updated PC ${pcId}`)
}

export const updateAllPcs = async (): Promise<void> => {
  await mockDelay(2000)
  console.log('Mock: Updated all PCs')
}

export const rebootPc = async (pcId: string): Promise<void> => {
  await mockDelay(1500)
  console.log(`Mock: Rebooted PC ${pcId}`)
}

export const sendTask = async (pcId: string, taskId: string): Promise<void> => {
  await mockDelay(3000) // Simulate a longer process
  console.log(`Mock: Processed task ${taskId} for PC ${pcId}`)
}

export const fetchTaskQueueTemplates = async (): Promise<TaskQueueTemplate[]> => {
  await mockDelay(1000)
  // This is a mock implementation. In a real application, you would fetch this data from your backend.
  return [
    {
      id: '1',
      name: 'Gmail Creation',
      tasks: [
        { id: '1', type: 'account_creation', status: 'in_queue', config: { website: 'gmail' } }
      ]
    },
    {
      id: '2',
      name: 'Spotify Streaming',
      tasks: [
        { id: '2', type: 'music_streaming', status: 'in_queue', config: { platform: 'spotify', playlist: ['track1', 'track2'], duration: 300 } }
      ]
    }
  ]
}

export const saveTaskQueueTemplate = async (template: TaskQueueTemplate): Promise<void> => {
  await mockDelay(1000)
  console.log(`Mock: Saved task queue template ${template.name}`)
}

export const deleteTaskQueueTemplate = async (templateId: string): Promise<void> => {
  await mockDelay(1000)
  console.log(`Mock: Deleted task queue template ${templateId}`)
}

export const updateBotVersion = async (pcId: string): Promise<void> => {
  await mockDelay(2000)
  console.log(`Mock: Updated bot version for PC ${pcId} to ${getCurrentBotVersion()}`)
}

export const checkPcStatus = async (pcId: string): Promise<boolean> => {
  await mockDelay(1000)
  const isResponsive = Math.random() > 0.2 // 80% chance of being responsive
  console.log(`Mock: Checked status for PC ${pcId}, isResponsive: ${isResponsive}`)
  return isResponsive
}