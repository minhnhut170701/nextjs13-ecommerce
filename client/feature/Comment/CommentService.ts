

// add comment 
const fetchCommentData = async (commentData: any, productId: string) =>{
  const response = await fetch(`http://localhost:3003/api/comment/add/${productId}`,{
    method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      next: {revalidate: 0},
      body: JSON.stringify(commentData),
    }
  )

  return response.json()
}

// get comment 
const getComment = async (productId: any) =>{
  const response = await fetch(`http://localhost:3003/api/comment/${productId}`, {next: {revalidate: 0}})

  return response.json()
}

export const CommentService = {
  fetchCommentData,
  getComment
}