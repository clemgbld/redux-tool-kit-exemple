import { configureStore } from '@reduxjs/toolkit'

import { todosReducer } from '../features/todos/todosReducers'
import { filterReducer } from '../features/filter/filterReducer'

export const store = configureStore({
  reducer: {
    todos: todosReducer.reducer,
    filters: filterReducer,
  },
})
