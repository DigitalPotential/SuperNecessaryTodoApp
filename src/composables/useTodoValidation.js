// useTodoValidation.js
import { ref, computed } from "vue";

export function useTodoValidation() {
  // Text för ny todo
  const newTodoText = ref("");
  // Om felmeddelande ska visas
  const showError = ref(false);

  // Kontrollerar om texten är giltig (minst 4 tecken)
  const isValidTodo = computed(() => newTodoText.value.length >= 4);

  // Validerar och rensar input-fältet
  const validateAndClear = () => {
    if (!isValidTodo.value) {
      showError.value = true;
      return false;
    }

    const text = newTodoText.value;
    newTodoText.value = "";
    showError.value = false;
    return text;
  };

  // Hanterar ändringar i input-fältet
  const handleInput = (value) => {
    newTodoText.value = value;
    // Döljer felmeddelande när användaren börjar skriva igen
    if (showError.value && value.length >= 3) {
      showError.value = false;
    }
  };

  return {
    newTodoText,
    showError,
    isValidTodo,
    validateAndClear,
    handleInput,
  };
}
