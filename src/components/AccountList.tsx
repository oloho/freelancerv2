import React, { useState, useEffect } from 'react'

interface Account {
  data: {
    pcId: string
    accountType: string
    accountData: string
    createdAt: string
  }
}

// Mock data
const mockAccounts: Account[] = [
  {
    data: {
      pcId: 'PC-001',
      accountType: 'gmail',
      accountData: 'user1@example.com',
      createdAt: '2023-11-15T10:30:00Z'
    }
  },
  {
    data: {
      pcId: 'PC-002',
      accountType: 'youtube',
      accountData: 'YouTubeUser1',
      createdAt: '2023-11-16T14:45:00Z'
    }
  },
  {
    data: {
      pcId: 'PC-001',
      accountType: 'spotify',
      accountData: 'SpotifyUser1',
      createdAt: '2023-11-17T09:15:00Z'
    }
  }
]

const AccountList: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Simulate API call with setTimeout
    const fetchAccounts = () => {
      setTimeout(() => {
        setAccounts(mockAccounts)
        setLoading(false)
      }, 1000) // Simulate 1 second loading time
    }

    fetchAccounts()
  }, [])

  if (loading) return <div>Loading accounts...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Created Accounts</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">PC ID</th>
              <th className="px-4 py-2 text-left">Account Type</th>
              <th className="px-4 py-2 text-left">Account Data</th>
              <th className="px-4 py-2 text-left">Created At</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((account, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                <td className="px-4 py-2">{account.data.pcId}</td>
                <td className="px-4 py-2">{account.data.accountType}</td>
                <td className="px-4 py-2">{account.data.accountData}</td>
                <td className="px-4 py-2">{new Date(account.data.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AccountList