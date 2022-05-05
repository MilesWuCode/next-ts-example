import type { NextPage, GetServerSideProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'

interface Post {
  id: number
  title: string
  content: string
}

interface Posts {
  posts: Post[]
}

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
const Ssr: NextPage<Posts> = ({ posts }) => {
  return (
    <>
      <Head>
        <title>SSR</title>
      </Head>

      <h1 className="text-3xl font-bold underline">SSR</h1>

      <ul className="menu bg-base-100 w-56">
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
