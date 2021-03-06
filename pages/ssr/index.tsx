import type { NextPage, GetServerSideProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { Post, Posts } from '~/types'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const response = await fetch('http://localhost:4000/posts')

  const data = await response.json()

  return {
    props: {
      posts: data,
    },
  }
}

// const Ssr: NextPage = ({ posts }: { posts: Post[] }) => {
const Ssr: NextPage<Posts> = ({ posts }: { posts: Post[] }) => {
  return (
    <>
      <Head>
        <title>SSR</title>
      </Head>

      <h1 className="text-3xl font-bold underline">SSR</h1>

      <ul className="w-56 menu bg-base-100">
        {posts.map((item: Post) => {
          return (
            <li key={item.id}>
              <Link href={`/ssr/${item.id}`}>
                <a>{item.title}</a>
              </Link>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default Ssr
