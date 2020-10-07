import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component
  let handleLike, handleRemove
  const blog = {
    id: 'FAKE_ID',
    title: 'Title Example',
    author: 'anonymous',
    url: 'www.google.com',
    likes: 10,
    user: 'FAKE_ID',
  }

  beforeEach(() => {
    handleLike = jest.fn()
    handleRemove = jest.fn()
    component = render(
      <Blog {...blog} handleLike={handleLike} handleRemove={handleRemove} />
    )
  })

  test('render only title initially', () => {
    expect(component.container).toHaveTextContent(blog.title)
    expect(component.container).toHaveTextContent(blog.author)
    expect(component.container).not.toHaveTextContent(blog.url)
    expect(component.container).not.toHaveTextContent(blog.likes)
  })

  test('render all when show button is pressed', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(blog.title)
    expect(component.container).toHaveTextContent(blog.author)
    expect(component.container).toHaveTextContent(blog.url)
    expect(component.container).toHaveTextContent(blog.likes)
  })

  test('click event twice on like button', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(handleLike.mock.calls).toHaveLength(2)
  })
})
