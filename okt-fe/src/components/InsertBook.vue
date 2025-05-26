<script setup lang="ts">
    import { ref } from 'vue';

    const title = ref('');
    const author = ref('');
    const year = ref('');

    const emit = defineEmits(['book-inserted', 'close']);

    const submit = () => {
        emit('book-inserted', { title: title.value, author: author.value, year: year.value });
        title.value = '';
        author.value= '';
        year.value = '';
    };

    defineExpose({ open });
</script>

<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
      <h2 class="text-lg font-semibold mb-4">New book</h2>

      <form @submit.prevent="submit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-1">Title</label>
          <input v-model="title" type="text" required
            class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Author</label>
          <input v-model="author" type="text" required
            class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Year</label>
          <input v-model="year" type="text" required
            class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div class="flex justify-end space-x-2 pt-4">
          <button type="button"
            class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            @click="$emit('close')">Cancel</button>
          <button type="submit"
            class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Save</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style></style>