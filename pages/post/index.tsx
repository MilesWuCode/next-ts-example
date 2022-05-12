import type { NextPage, GetServerSideProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Post, Posts } from '~/types'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context
  const { category } = query
  const queryString = category ? 'category=sport' : ''
  const response = await fetch(`http://localhost:4000/posts?${queryString}`)

  const data = await response.json()

  return {
    props: {
      posts: data,
    },
  }
}

const Post: NextPage<Posts> = ({ posts: list }: { posts: Post[] }) => {
  const [posts, setPosts] = useState<Post[]>(list)
  const router = useRouter()

  const fetchSport = async () => {
    const response = await fetch('http://localhost:4000/posts?category=sport')

    const data = await response.json()

    setPosts(data)

    router.push('/post?category=sport', undefined, { shallow: true })
  }

  return (
    <>
      <Head>
        <title>Post</title>
      </Head>

      <h1 className="text-3xl font-bold underline">Post</h1>

      <button onClick={fetchSport}>Sport</button>

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

export default Post
