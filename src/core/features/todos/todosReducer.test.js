import { createStore } from '@reduxjs/toolkit'
import { todoAdded } from './actions'

import { todosReducer } from './todosReducers'
describe('todo', () => {
  it('should contain the initial todo', () => {
    const store = createStore(todosReducer.reducer)

    expect(store.getState()).toEqual({
      status: 'idle',
      todos: [
        { id: 0, text: 'Learn React', completed: true },
        { id: 1, text: 'Learn Redux', completed: false, color: 'purple' },
        {
          id: 2,
          text: 'Build something fun!',
          completed: false,
          color: 'blue',
        },
      ],
    })
  })

  it('should be able to add a todo', () => {
    const store = createStore(todosReducer.reducer)

    store.dispatch(todoAdded('Learn Tdd'))

    expect(store.getState()).toEqual({
      status: 'idle',
      todos: [
        { id: 0, text: 'Learn React', completed: true },
        { id: 1, text: 'Learn Redux', completed: false, color: 'purple' },
        {
          id: 2,
          text: 'Build something fun!',
          completed: false,
          color: 'blue',
        },
        { id: 3, text: 'Learn Tdd', completed: false },
      ],
    })
  })

  it('should be able to add a todo when there is no todo initially', () => {
    const store = createStore(todosReducer.reducer)
    store.dispatch({ type: 'todos/allCompleted' })
    store.dispatch({
      type: 'todos/todoCompletedCleared',
    })
    store.dispatch(todoAdded('Learn Tdd'))

    expect(store.getState()).toEqual({
      status: 'idle',
      todos: [{ id: 1, text: 'Learn Tdd', completed: false }],
    })
  })

  it('should be able to change the color of a task', () => {
    const store = createStore(todosReducer.reducer)
    store.dispatch({
      type: 'todos/colorSelected',
      payload: { todoId: 1, color: 'red' },
    })

    expect(store.getState()).toEqual({
      status: 'idle',
      todos: [
        { id: 0, text: 'Learn React', completed: true },
        { id: 1, text: 'Learn Redux', completed: false, color: 'red' },
        {
          id: 2,
          text: 'Build something fun!',
          completed: false,
          color: 'blue',
        },
      ],
    })
  })

  it('should be able to delete a todo', () => {
    const store = createStore(todosReducer.reducer)
    store.dispatch({
      type: 'todos/todoDeleted',
      payload: 1,
    })

    expect(store.getState()).toEqual({
      status: 'idle',
      todos: [
        { id: 0, text: 'Learn React', completed: true },

        {
          id: 1,
          text: 'Build something fun!',
          completed: false,
          color: 'blue',
        },
      ],
    })
  })

  it('should be able to delete completed todo', () => {
    const store = createStore(todosReducer.reducer)
    store.dispatch({
      type: 'todos/todoCompletedCleared',
    })

    expect(store.getState()).toEqual({
      status: 'idle',
      todos: [
        { id: 1, text: 'Learn Redux', completed: false, color: 'purple' },

        {
          id: 2,
          text: 'Build something fun!',
          completed: false,
          color: 'blue',
        },
      ],
    })
  })

  it('should be able to complete all the todos', () => {
    const store = createStore(todosReducer.reducer)
    store.dispatch({ type: 'todos/allCompleted' })

    expect(store.getState()).toEqual({
      status: 'idle',
      todos: [
        { id: 0, text: 'Learn React', completed: true },
        { id: 1, text: 'Learn Redux', completed: true, color: 'purple' },
        {
          id: 2,
          text: 'Build something fun!',
          completed: true,
          color: 'blue',
        },
      ],
    })
  })

  it('should be able to complete all the todos', () => {
    const store = createStore(todosReducer.reducer)
    store.dispatch({ type: 'todos/allCompleted' })

    expect(store.getState()).toEqual({
      status: 'idle',
      todos: [
        { id: 0, text: 'Learn React', completed: true },
        { id: 1, text: 'Learn Redux', completed: true, color: 'purple' },
        {
          id: 2,
          text: 'Build something fun!',
          completed: true,
          color: 'blue',
        },
      ],
    })
  })

  it('should be able to toggle completed status in each a todo manually', () => {
    const store = createStore(todosReducer.reducer)
    store.dispatch({ type: 'todos/todoToggled', payload: 1 })

    expect(store.getState()).toEqual({
      status: 'idle',
      todos: [
        { id: 0, text: 'Learn React', completed: true },
        { id: 1, text: 'Learn Redux', completed: true, color: 'purple' },
        {
          id: 2,
          text: 'Build something fun!',
          completed: false,
          color: 'blue',
        },
      ],
    })
  })
})
