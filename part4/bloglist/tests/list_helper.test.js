const listHelper = require('../utils/list_helper')

const biggerList = [
  {
    _dummy: '_dummy',
    author: 'john',
    likes: 3
  },
  {
    _dummy: '_dummy',
    author: 'john',
    likes: 9
  },
  {
    _dummy: '_dummy',
    author: 'snow',
    likes: 5
  },
  {
    _dummy: '_dummy',
    author: 'legend',
    likes: 4
  }
]

const oneEntryList = [
  {
    _dummy: '_dummy',
    author: 'legend',
    likes: 5
  }
]

const emptyList = []

test('dummy return one', () => {
  expect(listHelper.dummy(emptyList)).toBe(1)
})

describe('total likes', () => {
  test('of empty list is zero', () => {
    expect(listHelper.totalLikes([])).toBe(0)
  })

  test('of one blog is the likes of that', () => {
    expect(listHelper.totalLikes(oneEntryList)).toBe(5)
  })

  test('of bigger list is calculated right', () => {
    expect(listHelper.totalLikes(biggerList)).toBe(21)
  })
})

describe('favorite blog', () => {
//  test('of empty list ', () => {
//    expect(listHelper.favoriteBlog(emptyList)).toThrow()
//  })

  test('of one blog list is that', () => {
    expect(listHelper.favoriteBlog(oneEntryList)).toEqual(oneEntryList[0])
  })

  test('of bigger list is calculated right', () => {
    expect(listHelper.favoriteBlog(biggerList)).toEqual(biggerList[1])
  })
})

describe('most blog', () => {
//  test('of empty list should throw error', () => {
//    expect(listHelper.mostBlogs(emptyList)).toThrow()
//  })

  test('of one blog list return that author', () => {
    expect(listHelper.mostBlogs(oneEntryList)).toEqual({author: 'legend', blogs: 1})
  })

  test('of bigger list is calculated right', () => {
    expect(listHelper.mostBlogs(biggerList)).toEqual({author: 'john', blogs: 2})
  })
})

describe('most likes', () => {
//  test('of empty list should throw error', () => {
//    expect(listHelper.mostLikes(emptyList)).toThrow()
//  })

  test('of one blog list return that', () => {
    expect(listHelper.mostLikes(oneEntryList)).toEqual({author: 'legend', likes: 5})
  })

  test('of bigger list is calculated right', () => {
    expect(listHelper.mostLikes(biggerList)).toEqual({author: 'john', likes: 9})
  })
})
