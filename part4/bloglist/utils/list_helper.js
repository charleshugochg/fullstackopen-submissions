const dummy = () => {
  return 1
}

const mostFreq = (arr) => ( 
  arr
    .reduce((acc, item) => (
      acc.find(track => track.key === item) 
        ? 
        acc.map(track => 
          track.key === item ? {...track, freq: track.freq + 1} : track
        )
        : 
        (acc.concat({key: item, freq: 1}))
    ), [])
    .reduce((acc, track) => acc.freq > track.freq ? acc : track)
)


const totalLikes = (blogs) => {
  return blogs.reduce((acc, blog) => acc + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((acc, blog) => (acc.likes > blog.likes) ? acc : blog)
}

const mostBlogs = blogs => {
  const most = mostFreq(blogs.map(blog => blog.author))
  return {
    author: most.key,
    blogs: most.freq
  }
}

const mostLikes = blogs => {
  const blog = blogs.reduce((acc, blog) => acc.likes > blog.likes ? acc : blog)
  return {
    author: blog.author,
    likes: blog.likes 
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
