import Head from 'next/head'
import { useState, useEffect } from 'react'
import { Post } from '~/types'

const Csr = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [posts, setPosts] = useState([])

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://localhost:4000/posts')

      const data = await response.json()

      setPosts(data)

      setIsLoading(false)
    }
    fetchData()
  }, [])

  if (isLoading) {
    return <h2>Loading...</h2>
  }

  return (
    <>
      <Head>
        <title>CSR</title>
      </Head>

      <h1 className="text-3xl font-bold underline">CSR</h1>

      <ul className="w-56 menu bg-base-100">
        {posts.map((item: Post) => {
          return (
            <li key={item.id}>
              {item.id}.{item.title} - {item.category}
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default Csr
