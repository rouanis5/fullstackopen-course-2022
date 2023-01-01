const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  // old syntax
  // let sum = 0
  // blogs.forEach(blog => {
  //   sum += blog.likes
  // })
  // return sum

  // new syntax with reduce
  return blogs.reduce((sum, blog) => {
    return sum + blog.likes
  }, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((favorite, blog, index) => {
    if (index === 0 || blog.likes > favorite.likes) return blog
    return favorite
  })
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
