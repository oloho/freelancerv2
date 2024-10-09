import React, { useState } from 'react'
import { PcGroup, SlavePc } from '../types'
import { X, Plus, Edit2, Save, UserPlus, UserMinus, Users } from 'lucide-react'

interface PcGroupManagerProps {
  groups: PcGroup[]
  onUpdateGroups: (newGroups: PcGroup[]) => void
  slavePcs: SlavePc[]
  onUpdatePcGroup: (pcId: string, groupId: string) => void
}

const PcGroupManager: React.FC<PcGroupManagerProps> = ({ groups, onUpdateGroups, slavePcs, onUpdatePcGroup }) => {
  const [newGroupName, setNewGroupName] = useState('')
  const [editingGroupId, setEditingGroupId] = useState<string | null>(null)
  const [editingGroupName, setEditingGroupName] = useState('')
  const [showPcsForGroup, setShowPcsForGroup] = useState<string | null>(null)

  const handleAddGroup = () => {
    if (newGroupName.trim()) {
      const newGroup: PcGroup = {
        id: Date.now().toString(),
        name: newGroupName.trim()
      }
      onUpdateGroups([...groups, newGroup])
      setNewGroupName('')
    }
  }

  const handleDeleteGroup = (groupId: string) => {
    onUpdateGroups(groups.filter(group => group.id !== groupId))
  }

  const handleEditGroup = (group: PcGroup) => {
    setEditingGroupId(group.id)
    setEditingGroupName(group.name)
  }

  const handleSaveEdit = () => {
    if (editingGroupId && editingGroupName.trim()) {
      onUpdateGroups(groups.map(group =>
        group.id === editingGroupId ? { ...group, name: editingGroupName.trim() } : group
      ))
      setEditingGroupId(null)
      setEditingGroupName('')
    }
  }

  const toggleShowPcs = (groupId: string) => {
    setShowPcsForGroup(showPcsForGroup === groupId ? null : groupId)
  }

  const handleRemoveAllPcsFromGroup = (groupId: string) => {
    slavePcs.forEach(pc => {
      if (pc.group === groupId) {
        onUpdatePcGroup(pc.id, 'none')
      }
    })
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Manage PC Groups</h2>
      <div className="flex mb-4">
        <input
          type="text"
          value={newGroupName}
          onChange={(e) => setNewGroupName(e.target.value)}
          placeholder="New group name"
          className="mr-2 px-2 py-1 border rounded"
        />
        <button
          onClick={handleAddGroup}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded flex items-center"
        >
          <Plus size={16} className="mr-1" /> Add Group
        </button>
      </div>
      <ul className="space-y-4">
        {groups.map(group => (
          <li key={group.id} className="bg-gray-100 p-4 rounded">
            <div className="flex items-center justify-between mb-2">
              {editingGroupId === group.id ? (
                <>
                  <input
                    type="text"
                    value={editingGroupName}
                    onChange={(e) => setEditingGroupName(e.target.value)}
                    className="mr-2 px-2 py-1 border rounded"
                  />
                  <button
                    onClick={handleSaveEdit}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded flex items-center"
                  >
                    <Save size={16} className="mr-1" /> Save
                  </button>
                </>
              ) : (
                <>
                  <span className="text-lg font-semibold">{group.name}</span>
                  <div>
                    <button
                      onClick={() => handleEditGroup(group)}
                      className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteGroup(group.id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mr-2"
                    >
                      <X size={16} />
                    </button>
                    <button
                      onClick={() => toggleShowPcs(group.id)}
                      className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-1 px-2 rounded mr-2"
                    >
                      {showPcsForGroup === group.id ? 'Hide PCs' : 'Show PCs'}
                    </button>
                    <button
                      onClick={() => handleRemoveAllPcsFromGroup(group.id)}
                      className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-1 px-2 rounded flex items-center"
                    >
                      <Users size={16} className="mr-1" /> Remove All PCs
                    </button>
                  </div>
                </>
              )}
            </div>
            {showPcsForGroup === group.id && (
              <ul className="mt-2 space-y-2">
                {slavePcs.map(pc => (
                  <li key={pc.id} className="flex items-center justify-between bg-white p-2 rounded">
                    <span>{pc.name}</span>
                    {pc.group === group.id ? (
                      <button
                        onClick={() => onUpdatePcGroup(pc.id, 'none')}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded flex items-center"
                      >
                        <UserMinus size={16} className="mr-1" /> Remove
                      </button>
                    ) : (
                      <button
                        onClick={() => onUpdatePcGroup(pc.id, group.id)}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded flex items-center"
                      >
                        <UserPlus size={16} className="mr-1" /> Add
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PcGroupManager