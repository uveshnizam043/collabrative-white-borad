<template>
  <div class="editor" style="position: relative">
    <div v-if="showDialogLink" class="dialog">
      <div style="display: flex; justify-content: space-between; align-items: center">
        <div>Enter link</div>
        <div style="margin-left: 5px">
          <input type="text" v-model="currentLink" />
          <button @click="setLink">Submit</button>
          <button @click="showDialogLink = false">Close</button>
        </div>
      </div>
    </div>
    <div class="editor_action menubar" v-if="editor">
      <bubble-menu :editor="editor" v-if="editor" :shouldShow="shouldShow">
        <div style="background-color: white; padding: 0.5rem; min-width: 300px; border-radius: 5px">
          <div v-if="isEditing">
            <span>Enter URL: </span>
            <input
              v-model="currentLink"
              @keyup.enter="setLink"
              @blur="blurInput"
              placeholder="Enter link:"
            />
            <button @click="setLink">Save</button>
          </div>
          <div v-else>
            <span
              >Visit URL:
              <a :href="currentLink" target="_blank" class="link-display">{{
                currentLink
              }}</a></span
            >
            <button @click="isEditing = true">Edit</button>
            <button @click="removeLink" :disabled="!editor.isActive('link')">Remove</button>
          </div>
        </div>
      </bubble-menu>
      <button v-for="action in activeButtons" :key="action" @click="applyFormat(action)">
        {{ action }}
      </button>
    </div>
    <editor-content class="editor__content" :editor="editor" />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Editor, EditorContent, BubbleMenu } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Underline from '@tiptap/extension-underline'
import Collaboration from '@tiptap/extension-collaboration'
import { HocuspocusProvider } from '@hocuspocus/provider'
import * as Y from 'yjs'

const ydoc = new Y.Doc()
const provider = new HocuspocusProvider({
  url: 'ws://localhost:1234', // Ensure Hocuspocus is running on this port
  name: 'my-collaborative-document',
  document: ydoc
})

const editor = ref(
  new Editor({
    content: '<p>Hello, world!</p>',
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false }),
      Underline,
      Collaboration.configure({ document: ydoc })
    ]
  })
)

const showDialogLink = ref(false)
const currentLink = ref('')
const isEditing = ref(false)

const activeButtons = ['bold', 'italic', 'strike', 'underline', 'link']

const openLinkDialog = () => {
  showDialogLink.value = true
}

const setLink = () => {
  editor.value.chain().focus().extendMarkRange('link').setLink({ href: currentLink.value }).run()
  showDialogLink.value = false
}

const removeLink = () => {
  editor.value.chain().focus().unsetLink().run()
  showDialogLink.value = false
}

const applyFormat = (action) => {
  if (action === 'bold') editor.value.chain().focus().toggleBold().run()
  if (action === 'italic') editor.value.chain().focus().toggleItalic().run()
  if (action === 'strike') editor.value.chain().focus().toggleStrike().run()
  if (action === 'underline') editor.value.chain().focus().toggleUnderline().run()
  if (action === 'link') openLinkDialog()
}

onMounted(() => {
  provider.on('status', (status) => {
    console.log('Collaboration status:', status)
  })
})

onBeforeUnmount(() => {
  editor.value.destroy()
})
</script>

<style scoped lang="scss">
[contenteditable='true'] {
  border: 0px solid #ccc; /* Example: Add a border */
  font-style: italic; /* Example: Italicize the text */

  padding: 1rem;
  // background-color: red;
}
/* Global styling */
p {
  margin: 1em 0;
  color: red;
}

.editor {
  background-color: #f0f4f9;
  &_action {
    display: flex;
    padding: 1rem;
    background-color: #dbdbdb;

    &__buttons {
      display: flex;
      button {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 0.5rem;
        padding: 10px;
        border-radius: 10px;
        outline: none;
        border: none;
        cursor: pointer;
        // :hover{
        //   background
        // }
      }
    }
  }
  &__content {
    width: 80vw;
    margin: auto;
    background-color: white;
  }
}

.ProseMirror:focus {
  outline: none;
}

strong {
  font-weight: bolder;
}
.editor-field {
  box-sizing: border-box;
  padding: 1rem 1.5rem;
  height: 100vh;
  border-right: 3px solid #ccc;
  border-left: 3px solid #ccc;
  border-bottom: 3px solid #ccc;
}
.editor-field::v-deep(.ProseMirror) {
  outline: none;
}

.ProseMirror:focus {
  outline: none;
}

.dialog {
  position: absolute;
  background-color: white;
  border: 1px solid #ccc;
  padding: 1px;
  z-index: 1000;
  top: 26px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  left: 40%;
  padding: 10px;
  border-radius: 10px;
}

.dialog p {
  margin: 0 0 16px;
  color: #333;
}
.dialog input {
}
.dialog button {
  border: 0px solid none;
  background-color: transparent;
  outline: none;
  margin-left: 5px;
  // padding: 2px ;
  // background-color: #4caf50;
  // color: white;
  // border: none;
  // border-radius: 4px;
  // cursor: pointer;
}

// .dialog button:hover {
//   background-color: #45a049;
// }

.tooltip {
  position: absolute;
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 10;
}
.separator {
  margin: 0 5px;
  color: #ccc; /* Light grey color */
}

.link-display {
  max-width: 120px; /* Set maximum width */
  white-space: nowrap; /* Prevent text from wrapping */
  overflow: hidden; /* Hide overflowed content */
  text-overflow: ellipsis; /* Add ellipsis (...) */
  display: inline-block;
  vertical-align: middle; /* Align vertically with buttons */
}
</style>
