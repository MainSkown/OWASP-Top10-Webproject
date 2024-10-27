export type Post = {
    id: string
    likes: number
    title: string
    content: string
    comments: Comment[]
}

export type Comment = {
    id: string
    autor: string
    content: string
}