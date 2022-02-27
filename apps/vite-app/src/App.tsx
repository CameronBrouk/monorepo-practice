import { useState } from 'react'

export function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='max-w-full w-screen h-screen max-h-screen bg-gray-200 text-red-800 flex justify-center items-center text-xl'>
      <header>
        <span className='flex space-x-4'>
          <button onClick={() => setCount((count) => count + 1)}>count</button>
          <p>{count}</p>
        </span>
        <p>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </p>
      </header>
    </div>
  )
}

export default App
