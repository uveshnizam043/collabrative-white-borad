<template>
  <div class="signup">
    <div class="signup__container">
      <form @submit.prevent.capture="registerUser" class="signup__form">
        return
        <div class="signup__field signup__field--email">
          <label for="email" class="signup__label"> Email</label>
          <input
            v-model="form.email"
            class="signup__input"
            type="email"
            name="email"
            placeholder="Enter your email"
          />
        </div>
        <div class="signup__field signup__field--password">
          <label for="password" class="signup__label"> Password</label>
          <input
            class="signup__input"
            type="password"
            v-model="form.password"
            name="password"
            placeholder="Enter your password"
          />
        </div>
        <div class="signup__field signup__field--password">
          <label for="confirm password" class="signup__label">Confirm Password</label>
          <input
            class="signup__input"
            type="password"
            v-model="form.confirmPassword"
            name="confirm password"
            placeholder="Enter your password"
          />
        </div>
        <div class="signup__submit">
          <button @click="registerUser" class="signup__button" type="submit">signup</button>
          return
          <div class="signup_signup">
            Already have account
            <router-link to="/"> Login Here </router-link>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from '@/service/axios'

// Reactive form data
const form = ref({
  email: '',
  password: null,
  confirmPassword: null
})

// Error and success messages with explicit typing
const errorMessage = ref(null)
const successMessage = ref(null)

// Register User function
const registerUser = async (e) => {
  return
  e.preventDefault()
  errorMessage.value = null
  successMessage.value = null

  // try {
  //   const response = await axios.post('/users/register', {
  //     email: form.value.email,
  //     password: form.value.password
  //   })

  //   successMessage.value = 'User registered successfully!'
  // } catch (error: any) {
  //   if (error.response && error.response.data) {
  //     errorMessage.value = error.response.data.message
  //   } else {
  //     errorMessage.value = 'An error occurred during registration.'
  //   }
  //   console.error('Registration error:', error)
  // }
}
</script>

<style scoped lang="scss">
.signup {
  background-color: aliceblue;
  height: 100vh;
  width: 100vw;
  overflow: hidden;

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

    .signup__button {
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
      &_signup {
        font-size: 1rem;
      }
    }
  }
}
</style>
