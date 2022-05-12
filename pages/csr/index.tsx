import Head from 'next/head'
import { useState, useEffect } from 'react'
import { Dashboard } from '~/types'

const Csr = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setPosts] = useState<Dashboard>()

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://localhost:4000/dashboard')

      const data = await response.json()

      setPosts(data)

      setIsLoading(false)
    }
    fetchData()
  }, [])

  if (isLoading) {
    return <h2>Loading...</h2>
  }

  if (!data) {
    return <h2>failed to load</h2>
  }

  return (
    <>
      <Head>
        <title>CSR</title>
      </Head>

      <h1 className="text-3xl font-bold underline">CSR</h1>

      <p>like: {data.like}</p>
      <p>dislike: {data.dislike}</p>
    </>
  )
}

export default Csr
