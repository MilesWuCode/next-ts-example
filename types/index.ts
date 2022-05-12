export interface Post {
  id: number
  title: string
  content: string
  category: string
}

export interface Posts {
  posts: Post[]
}

export interface Dashboard {
  like: number
  dislike: number
}
