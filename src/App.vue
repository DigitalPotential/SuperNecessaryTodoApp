<script setup>
import { ref, computed } from 'vue'

const showError = ref(false)
const newTodoText = ref('')
const todos = ref([
  { id: 1, text: 'Lär dig Vue', completed: false },
  { id: 2, text: 'Bygg en app', completed: true }
])

const isValidTodo = computed(() =>
  newTodoText.value.length >= 4
)

const addTodo = () => {
  if (!isValidTodo.value) {
    showError.value = true
    return
  }

  showError.value = false
  todos.value.push({
    id: Date.now(),
    text: newTodoText.value,
    completed: false
  })
  newTodoText.value = ''
}

</script>

<template>
  <div class="app-container">
    <div class="add-todo">
      <input type="text"
      v-model="newTodoText"
      placeholder="Lägg till todo..."
      v-bind:class="{ error: showError}"
      >
      <button
        @click="addTodo"
        :disabled="!isValidTodo"
      >
        Lägg Till
      </button>
    </div>
    <ul class="todo-list">
      <li 
        v-for="todo in todos"
        v-bind:key="todo.id"
        v-bind:class="{
        'todo-item': true,
        'completed': todo.completed
        }"
      >
        <input
        type="checkbox"
        v-model="todo.completed"
        >
        <span :class="{ 'done': todo.completed }">
          {{ todo.text }}
        </span>
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