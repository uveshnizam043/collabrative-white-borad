<template>
  <div :class="['textarea-container', { 'textarea-container--error': error }]">
    <label v-if="label" :for="id" class="textarea-container__label">{{ label }}</label>
    <textarea
      :id="id"
      :placeholder="placeholder"
      :rows="rows"
      :cols="cols"
      :maxlength="maxlength"
      :class="[
        'textarea-container__textarea',
        { 'textarea-container__textarea--disabled': disabled }
      ]"
      :disabled="disabled"
      v-model="innerValue"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
    ></textarea>
    <span v-if="error" class="textarea-container__error">{{ error }}</span>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

// Props
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: 'Enter text...'
  },
  rows: {
    type: Number,
    default: 4
  },
  cols: {
    type: Number,
    default: 40
  },
  maxlength: {
    type: Number,
    default: null
  },
  label: {
    type: String,
    default: ''
  },
  error: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  id: {
    type: String,
    default: ''
  }
})

// Emits
const emit = defineEmits(['update:modelValue', 'focus', 'blur'])

// Internal value for two-way binding
const innerValue = ref(props.modelValue)

// Watch for changes in the modelValue prop to update innerValue
watch(
  () => props.modelValue,
  (newValue) => {
    innerValue.value = newValue
  }
)

// Emit the input value whenever the innerValue changes
function handleInput() {
  emit('update:modelValue', innerValue.value)
}

// Emit focus and blur events
function handleFocus(event) {
  emit('focus', event)
}

function handleBlur(event) {
  emit('blur', event)
}
</script>

<style scoped>
.textarea-container {
  display: flex;
  flex-direction: column;
}

.textarea-container__label {
  margin-bottom: 4px;
  font-weight: bold;
  font-size: 0.9rem;
}

.textarea-container__textarea {
  resize: vertical;
  padding: 8px;
  font-size: 1rem;
  border-radius: 4px;
  border-color: #007bff;
  font-family: inherit;
  border-color: #007bff;
}

.textarea-container__textarea--disabled {
  background-color: #f5f5f5;
  color: #a1a1a1;
  cursor: not-allowed;
}

.textarea-container__error {
  margin-top: 4px;
  color: red;
  font-size: 0.8rem;
}

.textarea-container--error .textarea-container__textarea {
  border-color: red;
}

.textarea-container__textarea:focus {
  border-color: #007bff;
}
</style>
