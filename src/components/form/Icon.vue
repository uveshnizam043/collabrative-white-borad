<template>
  <div :style="{ height: computedSize, width: computedSize }">
    <component
      :is="icon"
      role="img"
      :style="{ height: computedSize, width: computedSize, fill: color }"
      class="hp-icon"
    />
  </div>
</template>

<script setup>
import { computed, defineAsyncComponent, onMounted } from 'vue'

const props = defineProps({
  name: {
    type: String,
    default: 'cog'
  },
  size: {
    default: 20,
    type: [Number, String]
  },
  color: {
    type: String,
    default: 'currentColor'
  }
})

// Ensure size is always treated as a number with px
const computedSize = computed(() => `${parseInt(props.size)}px`)

const icon = computed(() => {
  const forceComputed = props.name
  const icon = defineAsyncComponent({
    loader: () => import(`../../assets/icons/document.svg`)
  })
  console.log('icon', icon)
  return icon
})
</script>

<style scoped lang="scss">
.hp-icon {
  display: inline-block;
}
</style>
