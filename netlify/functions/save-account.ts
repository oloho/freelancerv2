import { Handler } from '@netlify/functions'
import faunadb from 'faunadb'

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET
})

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  try {
    const data = JSON.parse(event.body || '{}')
    const { pcId, accountType, accountData } = data

    if (!pcId || !accountType || !accountData) {
      return { statusCode: 400, body: 'Missing required fields' }
    }

    const result = await client.query(
      q.Create(
        q.Collection('accounts'),
        {
          data: {
            pcId,
            accountType,
            accountData,
            createdAt: q.Now()
          }
        }
      )
    )

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Account saved successfully', id: result.ref.id })
    }
  } catch (error) {
    console.error('Error saving account:', error)
    return { statusCode: 500, body: JSON.stringify({ error: 'Failed to save account' }) }
  }
}