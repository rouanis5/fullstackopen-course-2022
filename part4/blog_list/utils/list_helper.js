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

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return {} // empty blogs
  // if only one, just return it :)
  if (blogs.length === 1) return { author: blogs[0].author, blogs: 1 }

  // this function initialize an empty object
  // while looping the blogs, the func will initialize
  // a key with the name of the author with a value of 1
  // while looping, everytime he appear. it will increase its value by 1
  // expected result:
  // {
  //   'aaa hehe': 1,
  //   'zzz jj': 2,
  //   ...
  // }
  let authors = blogs.reduce((obj, blog) => {
    if (!obj[blog.author]) {
      obj[blog.author] = 1
    } else {
      obj[blog.author]++
    }
    return obj
  }, {})

  // Object.keys(authors) return an array that contains all authors
  // [ {author: 'aa', blogs: 1}, {author: 'bb', blogs: 1} ..... ]
  authors = Object.keys(authors).map(name => {
    return {
      author: name,
      blogs: authors[name]
    }
  })

  // return the author who has the biggest num of blogs
  return authors.reduce((obj, author, index) => {
    if (index === 0 | author.blogs > obj.blogs) return author
    return obj
  })
}

const mostLikes = (blogs) => {
  // the logic is the same as the previous function
  if (blogs.length === 0) return {}
  if (blogs.length === 1) return { author: blogs[0].author, likes: blogs[0].likes }

  let authors = blogs.reduce((obj, blog) => {
    if (!obj[blog.author]) {
      obj[blog.author] = 0 // initialize
    }
    obj[blog.author] += blog.likes
    return obj
  }, {})

  authors = Object.keys(authors).map(name => {
    return {
      author: name,
      likes: authors[name]
    }
  })

  return authors.reduce((obj, author, index) => {
    if (index === 0 | author.likes > obj.likes) return author
    return obj
  })
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
