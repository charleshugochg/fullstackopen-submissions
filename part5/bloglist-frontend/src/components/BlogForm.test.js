import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  let handleSubmit, component

  beforeEach(() => {
    handleSubmit = jest.fn()
    component = render(
      <BlogForm
        handleSubmit={handleSubmit} />
    )
  })

  test('called callback with correct inputs if form submit', () => {
    const formInputs = {
      title: 'Title Test',
      author: 'anonymous',
      url: 'www.google.com'
    }

    const form = component.container.querySelector('form')
    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')

    fireEvent.change(title, {
      target: { value: formInputs.title }
    })
    fireEvent.change(author, {
      target: { value: formInputs.author }
    })
    fireEvent.change(url, {
      target: { value: formInputs.url }
    })

    fireEvent.submit(form)

    expect(handleSubmit.mock.calls).toHaveLength(1)
    expect(handleSubmit.mock.calls[0][0].title).toBe(formInputs.title)
    expect(handleSubmit.mock.calls[0][0].author).toBe(formInputs.author)
    expect(handleSubmit.mock.calls[0][0].url).toBe(formInputs.url)
  })
})
