<template>
  <div>
    <Editor @update="editorContentUpdate" />
  </div>

  <DialogText v-model="showDocumentAccessDialog">
    <div class="share-modal">
      <div class="share-modal__header">
        <h2 class="share-modal__title">Share "Untitled document"</h2>
      </div>
      <div class="share-modal__input-group">
        <div class="share-modal__user-input">
          <InputComponent v-model="shareUserEmail" placeholder="Enter your username" />
        </div>
        <Dropdown :options="option" @update:selected="handleOptionUpdate" />
      </div>
      <div class="share-modal__input-textarea">
        <TextareaComponent
          v-model="message"
          label="Message"
          placeholder="Type your message..."
          :maxlength="200"
          :error="errorMessage"
          @focus="onFocus"
          @blur="onBlur"
        />
      </div>

      <div>
        <button @click="sendEmail">Send Email</button>
      </div>
    </div>
  </DialogText>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Editor from '../../components/Editor.vue'
import { useRouter, useRoute } from 'vue-router'
import socket, {
  joinRoom,
  onDocumentInit,
  onDocumentUpdate,
  sendDocumentUpdate
} from '../../services/socketService.js'
import DialogText from '../../components/Dialog.vue'
import Dropdown from '../../components/form/dropdown.vue'
import InputComponent from '../../components/form/input.vue'
import TextareaComponent from '../../components/form/TextArea.vue'
import { useGet, usePost } from '../../composable/useHttp'

const route = useRoute()
const showDocumentAccessDialog = ref(false)
const selectedOption = ref(null)
const shareUserEmail = ref(null)
const option = [
  {
    label: 'Editor',
    value: 'editor'
  },
  {
    label: 'Reader',
    value: 'reader'
  }
]

//methods
const handleOptionUpdate = (option) => {
  selectedOption.value = option.value
}
const sendEmail = async () => {
  const { post, data, loading, error } = usePost('document/create-link')
  await post({
    to: shareUserEmail.value,
    document: route.params.id,
    canEdit: selectedOption.value == 'editor' ? true : false
  })
}
</script>

<style lang="scss">
.input {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.share-modal {
  &__header {
  }
  &__user-input {
    width: 70%;
  }
  &__input-group {
    margin-top: 1rem;
    display: flex;
    justify-content: space-between;
  }
}
</style>
