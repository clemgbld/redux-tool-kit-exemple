export const StatusFilters = {
  All: 'All',
  Active: 'Active',
  Completed: 'Completed',
}

const initialState = {
  filters: {
    status: StatusFilters.Active,
    colors: ['red', 'blue'],
  },
}

export const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'filters/statusFilterChanged':
      return { ...state, filters: { ...state.filters, status: action.payload } }

    case 'filters/colorFilterChanged':
      if (action.payload.changeType === 'added') {
        return {
          ...state,
          filters: {
            ...state.filters,
            colors: [...state.filters.colors, action.payload.color],
          },
        }
      }

      return {
        ...state,
        filters: {
          ...state.filters,
          colors: [...state.filters.colors].filter(
            (color) => color !== action.payload.color
          ),
        },
      }

    default:
      return state
  }
}
