import { Handler } from '@netlify/functions'
import faunadb from 'faunadb'

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET
})

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  try {
    const result = await client.query(
      q.Map(
        q.Paginate(q.Documents(q.Collection('accounts'))),
        q.Lambda(x => q.Get(x))
      )
    )

    return {
      statusCode: 200,
      body: JSON.stringify(result.data)
    }
  } catch (error) {
    console.error('Error fetching accounts:', error)
    return { statusCode: 500, body: JSON.stringify({ error: 'Failed to fetch accounts' }) }
  }
}