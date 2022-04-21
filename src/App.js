import React from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchTodos } from './core/features/todos/todosReducers'
import { selectTodosIds, selectTodos } from './core/features/todos/selectors'

function App() {
  const todos = useSelector((state) => state)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchTodos())
  }, [dispatch])

  console.log(todos)

  return (
    <div className="App">
      <nav>
        <section>
          <h1>Redux Fundamentals Example</h1>

          <div className="navContent">
            <div className="navLinks"></div>
          </div>
        </section>
      </nav>
      <section>
        <h2>Welcome to the Redux Fundamentals example app!</h2>
      </section>
    </div>
  )
}

export default App
