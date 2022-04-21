import { createSelector } from '@reduxjs/toolkit'

export const selectTodosIds = createSelector(
  (state) => state.todos,
  (todos) => todos.map((todo) => todo.id)
)

export const selectTodos = (state) => state.todos.todos

export const selectTodoById = (state, todoId) => {
  return selectTodos(state).find((todo) => todo.id === todoId)
}
