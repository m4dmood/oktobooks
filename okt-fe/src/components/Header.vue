<script setup lang="ts">
    import { auth } from '@/services/auth';

    const { logout } = auth();

    function disconnect() {
        logout();
    }
</script>

<template>
    <header class="flex items-center justify-between px-3 shadow-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <span class="m-2 p-2 text-xl font-bold">OktoBooks</span>
        <button @click="disconnect" class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition">
            <b>Logout</b>
        </button>
    </header>
</template>

<style>
    
</style>