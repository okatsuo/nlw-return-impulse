import { useState } from 'react'
import logo from './logo.svg'
import { useEffect } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const countFromStorage = localStorage.getItem('count')
    if (countFromStorage) {
      setCount(Number(countFromStorage))
    }
  }, [count])

  const handleClick = () => {
    const plus = count + 1
    setCount(plus)
    localStorage.setItem('count', plus)
  }

  const handleReset = () => {
    localStorage.removeItem('count')
    setCount(0)
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <p>
          <button type="button" onClick={handleClick}>
            count is: {count}
          </button>
          <button type="button" onClick={handleReset}>
            reset count
          </button>
        </p>
        <p>
          Edit <code>App.jsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {' | '}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  )
}

export default App
