import type { GetStaticProps, GetStaticPaths } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Post } from '~/types'

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context

  if (!params?.postId) {
    return {
      notFound: true,
    }
  }

  if (!/^\d+$/.test(params.postId.toString())) {
    return {
      notFound: true,
    }
  }

  const response = await fetch(`http://localhost:4000/posts/${params.postId}`)

  if (response.status !== 200) {
    return {
      notFound: true,
    }
  }

  const data: Post = await response.json()

  return {
    props: {
      post: data,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch('http://localhost:4000/posts')

  const data = await response.json()

  const paths = data.map((post: { id: number }) => {
    return {
      params: {
        postId: `${post.id}`,
      },
    }
  })

  // * 2
  // return {
  //   paths,
  //   fallback: true
  // }

  // * 1
  return {
    paths: [
      {
        params: {
          postId: '1',
        },
      },
      {
        params: {
          postId: '2',
        },
      },
    ],
    fallback: true,
  }

  // * fallback
  // fallback: false, true, 'blocking'
}

export default function PostId({ post }: { post: Post }) {
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <>
      <h1 className="text-3xl font-bold underline">SSG</h1>

      <div className="my-5 text-lg">
        <p>{post.id}</p>
        <p>{post.title}</p>
        <p>{post.content}</p>
      </div>

      <Link href="/ssg">
        <a className="text-sm">Back</a>
      </Link>
    </>
  )
}
