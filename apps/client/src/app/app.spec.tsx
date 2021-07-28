import { cleanup, render, screen } from '@testing-library/react'
import React from 'react'
import App from './app'

describe('App', () => {
  afterEach(() => {
    cleanup()
  })

  it('should render successfully', async () => {
    render(<App />)
    screen.getByText(/jira-clone/i)
  })
})
