<script setup>
// Importerar alla composables som behövs
import { useTodoList } from '../composables/useTodoList'
import { useTodoValidation } from '../composables/useTodoValidation'
import { useTodoStats } from '../composables/useTodoStats'
import { useTheme } from '../composables/useTheme'

// Hämtar funktioner och data från composables
const { todos, addTodo, togglePriority, removeTodo } = useTodoList()
const { newTodoText, showError, isValidTodo, validateAndClear, handleInput } = useTodoValidation()
const { totalTodos, completedTodos, remainingTodos, completionRate } = useTodoStats(todos)
const { isDarkMode, toggleTheme } = useTheme()

// Hanterar tillägg av ny todo
const handleAddTodo = () => {
  const validatedText = validateAndClear()
  if (validatedText) {
    addTodo(validatedText)
  }
}
</script>

<template>
  <div class="app-container">
    <header :class="{ 'dark-mode': isDarkMode }">
      <h1>Min Todo App</h1>
      <button 
        :class="{ 'theme-btn': true, 'dark': isDarkMode }"
        @click="toggleTheme"
      >
        {{ isDarkMode ? '☀️' : '🌙' }}
      </button>
    </header>

    <div class="add-todo">
      <input 
        type="text" 
        v-model="newTodoText"
        @input="handleInput($event.target.value)"
        placeholder="Lägg till ny todo..."
        :class="{ 'error': showError }"
        @keyup.enter="handleAddTodo"
      >
      <button 
        @click="handleAddTodo"
        :disabled="!isValidTodo"
      >
        Lägg till
      </button>
    </div>

    <p v-if="showError" class="error-message">
      En todo måste ha minst 3 tecken
    </p>

    <div class="stats">
      <p>Totalt antal: {{ totalTodos }}</p>
      <p>Klara: {{ completedTodos }}</p>
      <p>Återstående: {{ remainingTodos }}</p>
      <p>Procent klara: {{ completionRate }}%</p>
    </div>

    <ul class="todo-list">
      <li 
        v-for="todo in todos" 
        :key="todo.id"
        :class="{ 
          'todo-item': true,
          'completed': todo.completed,
          'priority': todo.priority
        }"
      >
        <input 
          type="checkbox"
          v-model="todo.completed"
        >
        <span :class="{ 'done': todo.completed }">
          {{ todo.text }}
        </span>
        <div class="todo-actions">
          <button @click="togglePriority(todo)" class="priority-btn">
            {{ todo.priority ? '⭐' : '☆' }}
          </button>
          <button @click="removeTodo(todo.id)" class="delete-btn">
            🗑️
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<style>
.app-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 8px;
  margin-bottom: 20px;
}

header.dark-mode {
  background-color: #333;
  color: white;
}

.theme-btn {
  padding: 8px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  background: white;
}

.theme-btn.dark {
  background: #666;
}

.add-todo {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.add-todo input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.add-todo input.error {
  border-color: red;
}

.error-message {
  color: red;
  font-size: 0.9em;
  margin-top: -15px;
  margin-bottom: 15px;
}

.stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  background: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.todo-list {
  list-style: none;
  padding: 0;
}

.todo-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background: white;
  border: 1px solid #ddd;
  margin-bottom: 5px;
  border-radius: 4px;
}

.todo-item.completed {
  background: #f8f8f8;
}

.todo-item.priority {
  border-left: 4px solid gold;
}

.done {
  text-decoration: line-through;
  color: #888;
}

button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background: #4CAF50;
  color: white;
  cursor: pointer;
}

button:disabled {
  background: #cccccc;
  cursor: not-allowed;
}

.todo-actions {
  display: flex;
  gap: 8px;
  margin-left: auto;
}

.priority-btn, .delete-btn {
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
}

.delete-btn {
  background-color: #ff4444;
}

.delete-btn:hover {
  background-color: #cc0000;
}
</style>