<template>
  <div class="dropdown" ref="dropdownRef">
    <!-- Trigger button to open dropdown -->
    <button @click="toggleDropdown" class="dropdown-trigger">
      {{ selectedOption ? selectedOption.label : placeholder }}
    </button>

    <!-- Dropdown menu -->
    <ul v-if="isOpen" class="dropdown-menu">
      <li
        v-for="option in options"
        :key="option.value"
        @click="selectOption(option)"
        class="dropdown-item"
      >
        {{ option.label }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { onClickOutside } from '@vueuse/core'

const props = defineProps({
  options: {
    type: Array,
    required: true,
    default: () => []
  },
  placeholder: {
    type: String,
    default: 'Select an option'
  }
})

const emit = defineEmits(['update:selected'])

// Dropdown state
const isOpen = ref(false)
const selectedOption = ref(null)

// Toggle dropdown visibility
function toggleDropdown() {
  isOpen.value = !isOpen.value
}

// Select an option
function selectOption(option) {
  selectedOption.value = option
  emit('update:selected', option)
  isOpen.value = false // Close dropdown after selection
}

// Close dropdown if clicked outside
const dropdownRef = ref(null)
function handleClickOutside(event) {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isOpen.value = false
  }
}

// Add event listener to detect outside clicks
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

// Clean up event listener on component unmount
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
onClickOutside(dropdownRef, (event) => {
  isOpen.value = false
})
</script>

<style scoped>
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-trigger {
  padding: 0.5em;
  cursor: pointer;
  width: 120px;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: white;
  border: 1px solid #ddd;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  list-style: none;
  padding: 0;
  margin: 0;
  z-index: 1000;
}

.dropdown-item {
  padding: 0.5em 1em;
  cursor: pointer;
}

.dropdown-item:hover {
  background-color: #f0f0f0;
}
</style>
