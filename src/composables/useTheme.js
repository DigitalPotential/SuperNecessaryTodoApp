import { ref } from 'vue'

export function useTheme() {
  // Håller koll på om dark mode är aktiverat
  const isDarkMode = ref(false)
  
  // Växlar mellan light/dark mode
  const toggleTheme = () => {
    isDarkMode.value = !isDarkMode.value
  }

  return {
    isDarkMode,
    toggleTheme
  }
} 