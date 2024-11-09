<template>
  <div v-if="isOpen" class="dialog-overlay" @click="closeDialog">
    <div class="dialog" @click.stop>
      <button class="close-btn" @click="closeDialog">×</button>
      <slot />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import Icon from '../components/form/Icon.vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const isOpen = ref(props.modelValue)

watch(
  () => props.modelValue,
  (newVal) => {
    isOpen.value = newVal
  }
)

function closeDialog() {
  isOpen.value = false
  emit('update:modelValue', false)
}
</script>

<style scoped lang="scss">
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.dialog {
  background: white;
  padding: 1rem;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
}

.close-btn {
  margin-right: 0;
  /* position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer; */
}
</style>
