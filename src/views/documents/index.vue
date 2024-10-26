<template>
  <div class="documents">
    <div class="documents__confiner">
      <div class="documents__create" @click="postDocument">
        <div class="documents__create--icon">+</div>
      </div>
      <div class="documents__item" v-for="(document, index) of documentList" :key="document._id">
        <router-link :to="{ name: 'editor', params: { id: `${document._id}` } }">
          <div class="documents__item-name">
            {{ document.title }}
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { createDocument, getDocuments, documentList } from '../../composable/useDocument'
import { state } from '../../composable/useAuth'

//state
//methods
const postDocument = async () => {
  const object1 = {
    title: 'TITLE',
    content: '',
    ownerId: state.user._id
  }
  await createDocument(object1)
}

//hooks
onMounted(async () => {
  const response = await getDocuments()
})
</script>
<style lang="scss" scoped>
.documents {
  width: 80%;
  margin: auto;

  &__confiner {
    display: grid;

    grid-template-columns: repeat(4, 1fr);
    gap: 10px;

    margin-top: 1rem;
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
    &--icon {
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
}
</style>
