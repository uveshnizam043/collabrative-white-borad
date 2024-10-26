<template>
  <div class="editor" style="position: relative">
    <div v-if="showDialogLink" class="dialog">
      <div style="display: flex; justify-content: space-between; align-items: center">
        <div>Enter link</div>
        <div style="margin-left: 5px">
          <input type="text" v-model="currentLink" />
          <button @click="setLink">Submit</button>
          <button @click="showDialogLink = false">close</button>
        </div>
      </div>
    </div>
    <div class="editor_action menubar" v-if="editor">
      <bubble-menu :editor="editor" v-if="editor" :shouldShow="shouldShow()">
        <div style="background-color: white; padding: 0.5rem; min-width: 300px; border-radius: 5px">
          <div v-if="isEditing">
            <span>Enter URL: </span>
            <input
              v-model="currentLink"
              @keyup.enter="setLink"
              @blur="blurInput"
              placeholder="Enter link:"
            />
            <button
              style="
                background-color: transparent;
                color: #06c;
                outline: none;
                border: none;
                margin: 0 5px;
              "
              @click="setLink"
            >
              Save
            </button>
          </div>
          <div style="margin-top: 16px" v-else>
            <span
              >Visit URL:
              <a :href="currentLink" target="_blank" class="link-display">{{
                currentLink
              }}</a></span
            >
            <button
              style="
                background-color: transparent;
                color: #06c;
                outline: none;
                border: none;
                padding: 0 5px;
              "
              @click="isEditing = true"
            >
              Edit
            </button>

            <span class="separator">|</span>

            <button
              style="background-color: transparent; color: #06c; outline: none; border: none"
              @click="editor.chain().focus().unsetLink().run()"
              :disabled="!editor.isActive('link')"
            >
              Remove
            </button>
          </div>
        </div>
        <div
          v-if="false"
          style="
            font-size: 1rem;
            min-width: 150px;
            background-color: white;
            padding: 0.6rem;
            display: flex;
          "
        >
          <div>
            <input v-model="currentLink" />
          </div>
          <div style="display: flex">
            <button @click="setLink">submit</button>
            <button
              @click="editor.chain().focus().unsetLink().run()"
              :disabled="!editor.isActive('link')"
            >
              Unset link
            </button>
          </div>
        </div>
      </bubble-menu>
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#e8eaed"
        >
          <path
            d="M280-280h280v-80H280v80Zm0-160h400v-80H280v80Zm0-160h400v-80H280v80Zm-80 480q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z"
          />
        </svg>
      </div>
      <span class="editor_action__buttons" v-for="actionName in activeButtons" :key="actionName">
        <button
          v-if="actionName === 'bold'"
          class="menubar__button"
          style=""
          :class="{ 'is-active': editor.isActive('bold') }"
          @click="editor.chain().focus().toggleBold().run()"
        >
          Bold
        </button>
        <button
          v-if="actionName === 'italic'"
          class="menubar__button"
          :class="{ 'is-active': editor.isActive('italic') }"
          @click="editor.chain().focus().toggleItalic().run()"
        >
          Italic
        </button>

        <button
          v-if="actionName === 'strike'"
          class="menubar__button"
          :class="{ 'is-active': editor.isActive('strike') }"
          @click="editor.chain().focus().toggleStrike().run()"
        >
          Strike
        </button>

        <button
          v-if="actionName === 'underline'"
          class="menubar__button"
          @click="editor.chain().focus().toggleUnderline().run()"
          :class="{ 'is-active': editor.isActive('underline') }"
        >
          Underline
        </button>
        <button
          v-if="actionName === 'h1'"
          class="menubar__button"
          :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
          @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
        >
          H1
        </button>

        <button
          v-if="actionName === 'h2'"
          class="menubar__button"
          :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
          @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
        >
          H2
        </button>

        <button
          v-if="actionName === 'h3'"
          class="menubar__button"
          :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
          @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
        >
          H3
        </button>
        <button
          v-if="actionName === 'center_left'"
          class="menubar__button"
          @click="editor.chain().focus().setTextAlign('left').run()"
          :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }"
        >
          Center Left
        </button>
        <button
          v-if="actionName === 'center_align'"
          class="menubar__button"
          @click="editor.chain().focus().setTextAlign('center').run()"
          :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }"
        >
          Center Align
        </button>
        <button
          v-if="actionName === 'center_right'"
          class="menubar__button"
          @click="editor.chain().focus().setTextAlign('right').run()"
          :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }"
        >
          Center Right
        </button>
        <button
          v-if="actionName === 'center_justify'"
          class="menubar__button"
          @click="editor.chain().focus().setTextAlign('justify').run()"
          :class="{ 'is-active': editor.isActive({ textAlign: 'justify' }) }"
        >
          Center justify
        </button>

        <button
          v-if="actionName === 'link'"
          class="menubar__button"
          @click="openShowDialogLink()"
          :class="{ 'is-active': editor.isActive('link') }"
        >
          Link
        </button>

        <button
          v-if="actionName === 'bulletList'"
          class="menubar__button"
          :class="{ 'is-active': editor.isActive('bulletList') }"
          @click="editor.chain().focus().toggleBulletList().run()"
        >
          BulletList
        </button>
        <button
          v-if="actionName === 'orderedList'"
          class="menubar__button"
          :class="{ 'is-active': editor.isActive('orderedList') }"
          @click="editor.chain().focus().toggleOrderedList().run()"
        >
          orderedList
        </button>

        <button
          v-if="actionName === 'blockquote'"
          class="menubar__button"
          :class="{ 'is-active': editor.isActive('blockquote') }"
          @click="editor.chain().focus().toggleBlockquote().run()"
        >
          blockquote
        </button>

        <button
          v-if="false && actionName === 'horizontalRule'"
          class="menubar__button"
          @click="editor.chain().focus().setHorizontalRule().run()"
        >
          horizontalRule
        </button>

        <button
          v-if="actionName === 'undo'"
          class="menubar__button"
          @click="editor.chain().focus().undo().run()"
        >
          undo
        </button>

        <button
          v-if="actionName === 'redo'"
          class="menubar__button"
          @click="editor.chain().focus().redo().run()"
        >
          redo
        </button>
      </span>
    </div>
    <div class="editor__content">
      <editor-content class="editor__content editor-field" :editor="editor" />
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount, onMounted, defineEmits, watch } from 'vue'
import { io } from 'socket.io-client'

import Blockquote from '@tiptap/extension-blockquote'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import { Editor, EditorContent, BubbleMenu } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import { DOMSerializer } from 'prosemirror-model'
import { Mark } from '@tiptap/pm/model'
import { isTextSelection } from '@tiptap/core'
import TextAlign from '@tiptap/extension-text-align'
import Collaboration from '@tiptap/extension-collaboration'
import * as Y from 'yjs'
import { TiptapCollabProvider } from '@hocuspocus/provider'

const doc = new Y.Doc() // Initialize Y.Doc for shared editing

const dialogPosition = ref({ top: 0, left: 0 })
const showBubbleMenu = ref(false)
const showDialog = ref(false)

const showDialogLink = ref(false)
const openBubble = ref(false)

const openShowDialogLink = () => {
  showDialogLink.value = true
}
const setLink = () => {
  showDialogLink.value = true
  editor.value.chain().focus().extendMarkRange('link').setLink({ href: currentLink.value }).run()
  openBubble.value = false
  editor.value.commands.focus('end')
  isEditing.value = false
  editor.value.commands.unsetMark('link')
  showDialogLink.value = false
}
const forceHide = ref({
  first: false,
  second: false
})
let socket

const blurInput = () => {}

const initialContent = ref('<em>editable text</em>')
const activeButtons = ref([
  'bold',
  'italic',
  'strike',
  'underline',
  'link',
  'code',
  'h1',
  'h2',
  'h3',
  'bulletList',
  'orderedList',
  'blockquote',
  'codeBlock',
  'horizontalRule',
  'undo',
  'redo'
])

const emit = defineEmits(['update'])
const isEditing = ref(false)

const editor = ref(null)
const html = ref('')
const json = ref('')
const openDialog = () => {
  const { state, view } = editor.value
  const { from } = state.selection
  const coords = view.coordsAtPos(from)
  dialogPosition.value = {
    top: coords.top,
    left: coords.left + window.scrollX
  }
  showDialog.value = true
}

const closeDialog = () => {
  showDialog.value = false
}
// const onSelectionUpdate = ({ editor }) => {
//   console.log("onSelectionUpdate");
//   const { from, to } = editor.state.selection;
//   checkSelectedText();
//   if (from !== to) {
//     openDialog();
//   } else {
//     closeDialog();
//   }
// };

const currentLink = ref(null)
// const showTooltip = ref(false);
// const tooltipPosition = ref({ top: "0px", left: "0px" });
// const editLink = () => {
//   // Implement link editing logic
// };
const shouldShow = () => {
  return ({ editor, view, state, oldState, from, to }) => {
    // only show the bubble menu for images and links
    const { doc, selection } = state
    const { empty } = selection
    const hasLink = editor.isActive('link')
    if (hasLink) {
      const linkAttrs = editor.getAttributes('link').href
      currentLink.value = linkAttrs
    }
    // Sometime check for `empty` is not enough.
    // Doubleclick an empty paragraph returns a node size of 2.
    // So we check also for an empty text size.

    const isEmptyTextBlock = !doc.textBetween(from, to).length && isTextSelection(state.selection)
    if (hasLink) {
      openBubble.value = true
      return true
    }
    if (!view.hasFocus() || empty || isEmptyTextBlock) {
      return false
    }
  }
}
let debounceTimer

onMounted(async () => {
  // Handle document-load event to get the current document state

  editor.value = new Editor({
    content: initialContent.value,
    // onSelectionUpdate,
    extensions: [
      StarterKit,
      Underline,
      Document,
      Paragraph,
      Text,
      Blockquote,
      Link.configure({
        openOnClick: false,
        defaultProtocol: 'https'
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph']
      }),
      Link.configure({
        openOnClick: false,
        autolink: true
      }),
      Collaboration.configure({
        document: doc // Configure Y.Doc for collaboration
      })
    ]
  })

  html.value = editor.value.getHTML()
  json.value = editor.value.getJSON()

  editor.value.on('update', () => {
    html.value = editor.value.getHTML()
    json.value = editor.value.getJSON()
    emit('update', json.value)
    clearTimeout(debounceTimer)
    // debounceTimer = setTimeout(() => {
    //   socket.emit('document-change', { docId: route.params.id, changes: editor.value.getJSON() })
    // }, 800) // Send updates after 300ms of inactivity
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
