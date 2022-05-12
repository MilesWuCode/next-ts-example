import type { NextPage, GetServerSideProps } from 'next'
import Head from 'next/head'
import { ParsedUrlQuery } from 'querystring'
import { Post } from '~/types'

interface Params extends ParsedUrlQuery {
  category: string
}

export const getServerSideProps: GetServerSideProps<
  { posts: Post[]; category: string },
  Params
> = async (context) => {
  const { params, query, req, res } = context

  // console.log(req.headers.cookie)

  res.setHeader('Set-Cookie', ['name=test'])

  const { category = '' } = params!

  // const category = params?.category || ''

  // if(params?.category) {
  //   const category = params.category
  // }else{
  //   const category = ''
  // }

  // const { category = '' } = query

  const response = await fetch(
    `http://localhost:4000/posts?category=${category}`
  )

  const data = await response.json()

  return {
    props: {
      posts: data,
      category,
    },
  }
}

const PostCategory: NextPage<{
  posts: Post[]
  category: string
}> = ({ posts, category }: { posts: Post[]; category: string }) => {
  return (
    <>
      <Head>
        <title>Post - Category</title>
      </Head>

      <h1 className="text-3xl font-bold underline">Post - Category</h1>
      <h2 className="text-3xl font-bold underline">Category - {category}</h2>

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

export default PostCategory
