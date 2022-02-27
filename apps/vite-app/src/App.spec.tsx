import { App } from './App'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('App Has Content', () => {
  beforeEach(() => {
    render(<App />)
  })

  it('shows count button', () => {
    expect(screen.getByText(/.*count.*/i)).toBeInTheDocument()
  })

  it('iterates up by 1 when count button is clicked', () => {
    userEvent.click(screen.getByText(/.*count.*/i))
    expect(screen.getByText('1')).toBeInTheDocument()
  })
})
