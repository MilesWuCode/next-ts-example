import type { GetServerSideProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'

interface Post {
  id: number
  title: string
  content: string
}

export const getServerSideProps: GetServerSideProps = async (context) => {
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

  const data = await response.json()

  return {
    props: {
      post: data,
    },
  }
}

export default function Post({ post }: { post: Post }) {
  return (
    <>
      <h1 className="text-3xl font-bold underline">SSR</h1>

      <div className="my-5 text-lg">
        <p>{post.id}</p>
        <p>{post.title}</p>
        <p>{post.content}</p>
      </div>

      <Link href="/ssr">
        <a className="text-sm">Back</a>
      </Link>
    </>
  )
}
