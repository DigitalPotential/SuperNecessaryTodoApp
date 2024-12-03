import { ref } from 'vue'

export function useTodoList() {
  // Lista med todos, varje todo har ett id, text, completed status och priority status
  const todos = ref([
    { id: 1, text: 'Lär dig Vue', completed: false, priority: true },
    { id: 2, text: 'Bygg en app', completed: false, priority: false }
  ])

  // Lägger till en ny todo i listan
  const addTodo = (text) => {
    todos.value.push({
      id: Date.now(), // Använder timestamp som unikt id
      text,
      completed: false,
      priority: false
    })
  }

  // Växlar priority status för en specifik todo
  const togglePriority = (todo) => {
    todo.priority = !todo.priority
  }

  // Tar bort en todo från listan baserat på dess id
  const removeTodo = (todoId) => {
    todos.value = todos.value.filter(todo => todo.id !== todoId)
  }

  return {
    todos,
    addTodo,
    togglePriority,
    removeTodo
  }
}
