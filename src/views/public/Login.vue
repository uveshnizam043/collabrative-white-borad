<template>
  <div class="login">
    <div class="login__container">
      <form @submit.prevent.capture="loginUser" class="login__form">
        <div class="login__field login__field--email">
          <label for="email" class="login__label"> Email</label>

          <input
            v-model="form.email"
            class="login__input"
            type="email"
            name="email"
            placeholder="Enter your email"
          />
        </div>
        <div class="login__field login__field--password">
          <label for="password" class="login__label"> Password</label>
          <input
            class="login__input"
            type="password"
            v-model="form.password"
            name="password"
            placeholder="Enter your password"
          />
        </div>
        <div class="login__submit">
          <button class="login__button" type="submit" @click="loginUser">Login</button>
          <div class="login__signup">
            Don't have an account?
            <router-link to="/signup" class="login__signup-link">Sign up here</router-link>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// import axios from '@/service/axios'
import { login } from '../../composable/useAuth'
import { useRouter } from 'vue-router' // Import useRouter
import { useGet, usePost } from '../../composable/useAuth'

const router = useRouter() // Get the router instance

//state
const form = ref({
  email: '',
  password: null
})
const errorMessage = ref(null)
const successMessage = ref(null)

//methods
const loginUser = async (e) => {
  e.preventDefault()
  errorMessage.value = null
  successMessage.value = null
  const payload = { email: form.value.email, password: form.value.password }
  await login(payload)
  router.push('/documents')
}
</script>

<style scoped lang="scss">
.login {
  background-color: aliceblue;
  height: 100vh;
  width: 100vw;

  &__container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  &__form {
    background-color: #e7e7e7;
    padding: 2rem;
    border-radius: 1rem;
    width: 100%;
    max-width: 400px; /* Ensure responsiveness */
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  }

  &__field {
    margin-bottom: 1.5rem;
    display: flex;
    flex-direction: column;

    &--email,
    &--password {
      width: 100%;
    }
  }

  &__label {
    font-size: 1rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
  }

  &__input {
    padding: 0.8rem;
    border: 1px solid #ccc;
    border-radius: 0.5rem;
    font-size: 1rem;
    outline: none;
    transition: border 0.3s ease;

    &:focus {
      border-color: #007bff;
    }
  }

  &__submit {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;

    .login__button {
      padding: 0.75rem 1.5rem;
      font-size: 1rem;
      font-weight: 600;
      color: #fff;
      background-color: #007bff;
      border: none;
      border-radius: 0.5rem;
      cursor: pointer;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #0056b3;
      }
    }
  }

  &__signup {
    margin-top: 1rem;
    font-size: 1rem;
    text-align: center;

    &-link {
      color: #007bff; /* Primary blue color */
      text-decoration: none;
      font-weight: 600;
      transition: color 0.3s ease;

      &:hover {
        color: #0056b3; /* Darker shade on hover */
        text-decoration: underline;
      }
    }
  }
}
</style>
