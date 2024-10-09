import React, { useState } from 'react'
import { AccountCreationConfig, MusicStreamingConfig } from '../types'

interface TaskConfigModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (taskConfig: AccountCreationConfig | MusicStreamingConfig) => void
}

const TaskConfigModal: React.FC<TaskConfigModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [taskType, setTaskType] = useState<'account_creation' | 'music_streaming'>('account_creation')
  const [accountWebsite, setAccountWebsite] = useState<AccountCreationConfig['website']>('gmail')
  const [streamingPlatform, setStreamingPlatform] = useState<MusicStreamingConfig['platform']>('spotify')
  const [playlist, setPlaylist] = useState('')
  const [duration, setDuration] = useState('60')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    let taskConfig: AccountCreationConfig | MusicStreamingConfig

    if (taskType === 'account_creation') {
      taskConfig = { website: accountWebsite }
    } else {
      taskConfig = {
        platform: streamingPlatform,
        playlist: playlist.split(',').map(track => track.trim()),
        duration: parseInt(duration)
      }
    }

    onSubmit(taskConfig)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Configure Task</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Task Type</label>
            <select
              value={taskType}
              onChange={(e) => setTaskType(e.target.value as 'account_creation' | 'music_streaming')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="account_creation">Account Creation</option>
              <option value="music_streaming">Music Streaming</option>
            </select>
          </div>

          {taskType === 'account_creation' && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Website</label>
              <select
                value={accountWebsite}
                onChange={(e) => setAccountWebsite(e.target.value as AccountCreationConfig['website'])}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                <option value="gmail">Gmail</option>
                <option value="youtube">YouTube</option>
                <option value="amazon">Amazon</option>
                <option value="spotify">Spotify</option>
                <option value="tidal">Tidal</option>
                <option value="deezer">Deezer</option>
                <option value="apple_music">Apple Music</option>
              </select>
            </div>
          )}

          {taskType === 'music_streaming' && (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Streaming Platform</label>
                <select
                  value={streamingPlatform}
                  onChange={(e) => setStreamingPlatform(e.target.value as MusicStreamingConfig['platform'])}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                >
                  <option value="spotify">Spotify</option>
                  <option value="youtube_music">YouTube Music</option>
                  <option value="tidal">Tidal</option>
                  <option value="deezer">Deezer</option>
                  <option value="apple_music">Apple Music</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Playlist (comma-separated)</label>
                <input
                  type="text"
                  value={playlist}
                  onChange={(e) => setPlaylist(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder="Track 1, Track 2, Track 3"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Duration (seconds)</label>
                <input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </>
          )}

          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
            >
              Send Task
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TaskConfigModal