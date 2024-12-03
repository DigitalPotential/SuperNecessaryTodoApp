import { computed } from 'vue'

export function useTodoStats(todos) {
  // Beräknar totalt antal todos
  const totalTodos = computed(() => todos.value.length)

  // Beräknar antal färdiga todos
  const completedTodos = computed(() => 
    todos.value.filter(todo => todo.completed).length
  )

  // Beräknar antal återstående todos
  const remainingTodos = computed(() => 
    todos.value.filter(todo => !todo.completed).length
  )

  // Beräknar procentandel färdiga todos
  const completionRate = computed(() => {
    if (totalTodos.value === 0) return 0
    return Math.round((completedTodos.value / totalTodos.value) * 100)
  })

  return {
    totalTodos,
    completedTodos,
    remainingTodos,
    completionRate
  }
}