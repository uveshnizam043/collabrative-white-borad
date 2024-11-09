<template>
  <div class="input-container">
    <label v-if="label" class="input-label">{{ label }}</label>
    <input
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="input-field"
    />
    <p v-if="errorMessage" class="input-error">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { computed, toRefs } from 'vue'

// Props for flexibility
const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  label: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: ''
  },
  errorMessage: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])
</script>

<style scoped>
.input-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 1em;
}

.input-label {
  margin-bottom: 0.5em;
  font-weight: 600;
}

.input-field {
  padding: 0.5em;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1em;
  outline: none;
  transition: border-color 0.2s;
}

.input-field:focus {
  border-color: #007bff;
}

.input-error {
  color: red;
  font-size: 0.875em;
  margin-top: 0.25em;
}
</style>
