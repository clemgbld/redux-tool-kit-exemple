import { filterReducer } from './filterReducer'
import { createStore } from '@reduxjs/toolkit'

describe('filter', () => {
  it('should have the correct initial value in the filter', () => {
    const store = createStore(filterReducer)

    expect(store.getState()).toEqual({
      filters: {
        status: 'Active',
        colors: ['red', 'blue'],
      },
    })
  })

  it('should have the correct initial value in the filter', () => {
    const store = createStore(filterReducer)

    store.dispatch({ type: 'filters/statusFilterChanged', payload: 'All' })

    expect(store.getState()).toEqual({
      filters: {
        status: 'All',
        colors: ['red', 'blue'],
      },
    })
  })

  it('should be able to add a color in the filter', () => {
    const store = createStore(filterReducer)

    store.dispatch({
      type: 'filters/colorFilterChanged',
      payload: { color: 'purple', changeType: 'added' },
    })

    expect(store.getState()).toEqual({
      filters: {
        status: 'Active',
        colors: ['red', 'blue', 'purple'],
      },
    })
  })

  it('should be able to delete a color in the filter', () => {
    const store = createStore(filterReducer)

    store.dispatch({
      type: 'filters/colorFilterChanged',
      payload: { color: 'red', changeType: 'delete' },
    })

    expect(store.getState()).toEqual({
      filters: {
        status: 'Active',
        colors: ['blue'],
      },
    })
  })
})
