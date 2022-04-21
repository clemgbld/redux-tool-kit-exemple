import { client } from '../../../api/client'
import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit'

const todosAdapter = createEntityAdapter()

console.log(todosAdapter.getInitialState())

console.log(todosAdapter.getSelectors())

const initialState = {
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
}

// export async function fetchTodos(dispatch, getState) {
//   const response = await client.get('/fakeApi/todos')
//   dispatch({ type: 'todos/todosLoaded', payload: response.todos })
// }

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const res = await client.get('/fakeApi/todos')
  return res.todos
})

export const todosReducer = createSlice({
  name: 'todos',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        const newEntities = {}
        action.payload.forEach((todo) => (newEntities[todo.id] = todo))
        state.todos = newEntities
        state.status = 'idle'
      })
  },
  reducers: {
    todoAdded(state, action) {
      state.todos.push({
        text: action.payload,
        id: state.todos[state.todos.length - 1]
          ? state.todos[state.todos.length - 1].id + 1
          : 1,
        completed: false,
      })
    },
    colorSelected(state, action) {
      const { color, todoId } = action.payload
      state.todos[todoId].color = color
    },

    todoDeleted(state, action) {
      delete state.todos[action.payload]
      state.todos = state.todos
        .filter((todo) => todo !== undefined)
        .map((todo, i) => {
          return { ...todo, id: i }
        })
    },

    todoCompletedCleared(state) {
      state.todos = state.todos.filter((todo) => todo.completed === false)
    },

    allCompleted(state) {
      state.todos = state.todos.map((todo) =>
        todo.completed === true
          ? todo
          : {
              ...todo,
              completed: true,
            }
      )
    },

    todoToggled(state, action) {
      state.todos[action.payload].completed =
        !state.todos[action.payload].completed
    },
  },
})

// export const todosReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'todos/todosLoaded':
//       return { ...state, todos: action.payload }
//     case 'todos/todoAdded':
//       return {
//         ...state,
//         todos: [
//           ...state.todos,
//           {
//             id: state.todos[state.todos.length - 1]
//               ? state.todos[state.todos.length - 1].id + 1
//               : 1,
//             text: action.payload,
//             completed: false,
//           },
//         ],
//       }
//     case 'todos/colorSelected':
//       return {
//         ...state,
//         todos: [...state.todos].map((todo) =>
//           todo.id === action.payload.todoId
//             ? (todo = {
//                 ...todo,
//                 color: action.payload.color,
//               })
//             : todo
//         ),
//       }

//     case 'todos/todoDeleted':
//       return {
//         ...state,
//         todos: [...state.todos].filter(
//           (todo) => todo.id !== action.payload.todoId
//         ),
//       }
//     case 'todos/todoCompletedCleared':
//       return {
//         ...state,
//         todos: [...state.todos].filter((todo) => todo.completed !== true),
//       }

//     case 'todos/allCompleted':
//       return {
//         ...state,
//         todos: [...state.todos].map((todo) =>
//           todo.completed
//             ? todo
//             : {
//                 ...todo,
//                 completed: true,
//               }
//         ),
//       }

//     case 'todos/todoToggled':
//       return {
//         ...state,
//         todos: [...state.todos].map((todo) =>
//           todo.id === action.payload.id
//             ? {
//                 ...todo,
//                 completed: !todo.completed,
//               }
//             : todo
//         ),
//       }

//     default:
//       return state
//   }
// }
