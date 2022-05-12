import Head from 'next/head'
import useSWR, {Fetcher, Key} from 'swr'
import { Dashboard } from '~/types'

const fetcher:Fetcher<Dashboard> = async () => {
  const response = await fetch('http://localhost:4000/dashboard')

  return response.json()
}

const Swr = () => {
  const key:Key = 'dashboard'

  const { data, error } = useSWR<Dashboard>(key, fetcher)

  if (error) return <h2>failed to load</h2>

  if (!data) return <h2>Loading...</h2>

  return (
    <>
      <Head>
        <title>SWR</title>
      </Head>

      <h1 className="text-3xl font-bold underline">SWR</h1>

      <p>like: {data.like}</p>
      <p>dislike: {data.dislike}</p>
    </>
  )
}

export default Swr
