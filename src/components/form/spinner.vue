<template>
  <div
    class="spinner"
    :style="{
      width: props.size,
      height: props.size,
      borderColor: props.color,
      borderTopColor: 'transparent'
    }"
  ></div>
</template>
<script setup>
import { computed, defineProps } from 'vue'

const props = defineProps({
  size: {
    type: String,
    default: '40px' // Default size of the spinner
  },
  color: {
    type: String,
    default: '#3498db' // Default color of the spinner
  }
})

// Generate spinner styles based on props
const spinnerStyle = computed(() => ({
  width: props.size,
  height: props.size,
  borderColor: props.color,
  borderTopColor: 'transparent'
}))
</script>

<style scoped>
.spinner {
  border-radius: 50%;
  border: 4px solid;
  border-top: 4px solid transparent;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
