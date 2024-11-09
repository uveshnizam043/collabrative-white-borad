<template>
  <div class="not-found">
    <div class="not-found__text">
      <div class="not-found__title">It seems you've sailed into uncharted waters!</div>
      <div class="not-found__subtitle">Sorry, that page can't be found</div>
      <router-link to="/documents" class="not-found__link">Go To Homepage</router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.not-found {
  height: 100vh;
  width: 100vw;
  background-image: url('../../assets/img/not-found-bg.webp');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  &__text {
    padding: 96px 0 0 96px;
    /* Style for the text element */
  }

  &__title {
    font-size: 32px;
    letter-spacing: 2px;
    font-weight: 600;
    color: gray;
  }
  &__subtitle {
    padding: 10px 0 0 0;
    letter-spacing: 1px;
    font-size: 18px;
    font-weight: 500;
    color: gray;
  }
  &__link {
    padding: 0px 0 0 0;
    font-size: 18px;
    text-decoration: none;
    font-weight: 500;
    color: #309cdb;
    letter-spacing: 1px;
  }
}
</style>
