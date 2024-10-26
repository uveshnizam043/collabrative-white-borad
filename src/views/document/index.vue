<script setup lang="ts">
import { onMounted } from 'vue'
import Editor from '../../components/Editor.vue'
import socket from '../../services/socketService'

//hooks
onMounted(() => {
  try {
    // const connection = new ShareDB.Connection(socket)
  } catch (error) {}
  // const doc = connection.get('documents', 'exampleDocumentId')
})
const editorContentUpdate = (data) => {}
</script>

<template>
  <div></div>
  <Editor @update="editorContentUpdate" />
</template>
