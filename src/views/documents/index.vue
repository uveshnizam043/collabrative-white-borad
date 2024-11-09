<template>
  <div class="documents">
    <div class="documents__parent">
      122
      <div class="documents__container">
        <div class="documents__create" @click="postDocument">
          <div class="documents__create-icon">+</div>
        </div>
        <div class="documents__item" v-for="(document, index) of documentList" :key="document._id">
          <router-link :to="{ name: 'editor1', params: { id: `${document._id}` } }">
            <div class="documents__item-name">
              {{ document.title }}
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { createDocument, getDocuments, documentList } from '../../composable/useDocument'
import { state } from '../../composable/useAuth'

// state
// methods
const postDocument = async () => {
  console.log('state', state)
  const payload = {
    title: 'TITLE',
    content: '',
    ownerId: state.user._id
  }
  await createDocument(payload)
}

// hooks
onMounted(async () => {
  const response = await getDocuments()
})
</script>

<style lang="scss" scoped>
.documents {
  background: #ffefba;
  background: -webkit-linear-gradient(to right, #ffffff, #e7d8a7);
  background: linear-gradient(to right, #ffffff, #e7d8a7);
  height: 100vh;
  display: flex;
  align-items: center;

  &__parent {
    width: 80%;
    margin: auto;
  }

  &__container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
    padding: 2rem;
  }

  &__create {
    background-color: rgb(221, 221, 221);
    display: flex;
    justify-content: center;
    align-items: center;
    height: 250px;
    border-radius: 1rem;
    cursor: pointer;
    transition: all ease-in-out 0.3s;

    &:hover {
      background-color: rgba(208, 206, 206, 1);
    }

    &-icon {
      font-size: 3.5rem;
      font-weight: 100;
    }
  }

  &__item {
    background-color: rgb(221, 221, 221);
    height: 250px;
    border-radius: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__item-name {
    /* Add specific styles here if needed */
  }
}
</style>
