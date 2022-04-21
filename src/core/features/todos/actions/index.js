export const todoAdded = (text) => {
  return {
    type: 'todos/todoAdded',
    payload: text,
  }
}
