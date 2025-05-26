<script setup lang="ts">
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    import { auth } from '../services/auth.ts';
import { onMounted } from 'vue';

    const router = useRouter();
    const { authenticate } = auth();

    const username = ref('');
    const password = ref('');

    onMounted(() => {
        if (localStorage.getItem("token")) {
            router.push('/');
        }
    });

    const submit = async () => {
        const success = await authenticate(username.value, password.value);
        if (success) {
            router.push('/');
        } else {
            alert("Username o password errati");
        }
    };
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white shadow-lg rounded-xl p-8 w-full max-w-sm">
      <h1 class="text-center text-2xl font-bold mb-6 text-black dark:text-black">Welcome!</h1>
      <form @submit.prevent="submit" class="space-y-4">
        <div>
          <label for="username" class="block text-sm font-medium text-gray-700 mb-1">Username</label>
          <input
            id="username"
            v-model="username"
            type="text"
            placeholder="Enter username"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-black"
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            placeholder="Enter password"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-black"
          />
        </div>

        <button
          type="submit"
          class="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  </div>
</template>


<style></style>