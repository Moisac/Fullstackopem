const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
  const likes = (sum, item) => {
    return sum + item.likes
  }
  return blogs.reduce(likes, 0)
}


const favoriteBlog = (blogs) => {
  if(blogs.length === 0) {
    return null
  }
  const favorite = blogs.reduce((old, curr) =>
  old.likes > curr.likes ? old : curr
);

const favoriteArticle = {
  title: favorite.title,
  author: favorite.author,
  likes: favorite.likes
};
return favoriteArticle;
}

  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
  }