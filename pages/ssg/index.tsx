import type { NextPage, GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { Post, Posts } from '~/types'

export const getStaticProps: GetStaticProps = async (context) => {
  const response = await fetch('http://localhost:4000/posts')

  const data = await response.json()

  return {
    props: {
      // posts: data,
      posts: data.slice(0,3),
    },
  }
}

// const Ssg: NextPage = ({ posts }: { posts: Post[] }) => {
const Ssg: NextPage<Posts> = ({ posts }: { posts: Post[] }) => {
  return (
    <>
      <Head>
        <title>SSG</title>
      </Head>

      <h1 className="text-3xl font-bold underline">SSG</h1>

      <ul className="w-56 menu bg-base-100">
        {posts.map((item: Post) => {
          return (
            <li key={item.id}>
              <Link href={`/ssg/${item.id}`}>
                <a>{item.title}</a>
              </Link>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default Ssg
