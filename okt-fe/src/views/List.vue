<template>
  <div class="p-4">
    <div class="w-100 p-2 m-2">
        <h2 class="text-2xl font-bold mb-4">Reading List</h2>
        <div class="p-2 m-2 flex justify-space-between items-center">
            <h2 class="text-xl font-bold">Filter by status:</h2>
            <button v-for="s in statusCodes" 
                class="px-4 py-2 m-1 rounded bg-gray-100 hover:bg-gray-500 text-gray-900"
                @click="filterByStatus(s)"
                :class="{ active: currentStatus === s}">{{ statusLabels[s] }}</button>
            <button class="px-4 py-2 m-1 rounded bg-gray-100 hover:bg-gray-500 text-gray-900"
                @click="filterByStatus(null)">All</button>
        </div>
    </div>
    <table class="min-w-full bg-white rounded shadow overflow-hidden">
      <thead class="bg-gray-100 text-gray-700 text-left">
        <tr>
          <th class="px-4 py-2">Title</th>
          <th class="px-4 py-2">Author</th>
          <th class="px-4 py-2">Year</th>
          <th class="px-4 py-2">Status</th>
          <th class="px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="book in books" :key="book.id" class="border-t hover:bg-gray-50">
          <td class="px-4 py-2">{{ book.title }}</td>
          <td class="px-4 py-2">{{ book.author }}</td>
          <td class="px-4 py-2">{{ book.year }}</td>
          <td class="px-4 py-2">
            <span
              :class="[
                'px-2 py-1 rounded text-sm font-semibold',
                book.status === 'to-read' ? 'bg-yellow-100 text-yellow-700' :
                book.status === 'reading' ? 'bg-blue-100 text-blue-700' :
                'bg-green-100 text-green-700'
              ]"
            >
              {{ statusLabels[book.status] }}
            </span>
          </td>
          <td class="px-4 py-2 flex items-center justify-center">
            <select
              v-model="book.status"
              @change="updateStatus(book.id, book.status)"
              class="px-2 py-1 m-1 border rounded"
            >
              <option value="to-read">To Read</option>
              <option value="reading">Reading</option>
              <option value="read">Read</option>
            </select>
            <button 
                class="px-2 py-1 m-1 bg-red-500 hover:bg-red-700 text-white rounded transition"
                @click="removeBook(book.id)">Remove</button>
          </td>
        </tr>
        <tr v-if="books?.length === 0">
            <td colspan="3" class="text-center text-gray-400 py-4">No books yet.</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="flex m-2 p-3 justify-end items-center">{{ count }} {{ count === 1 ? ' book ' : ' books ' }} found</div>
  <div class="flex justify-center items-center m-2">
    <button @click="openModal" class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
    + New book
  </button>
  </div>

  <InsertBook
    v-if="isModalOpen"
    @close="closeModal"
    @book-inserted="addBook"
    />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { book } from '../services/book';
import { onMounted } from 'vue';
import InsertBook from '@/components/InsertBook.vue';

const { retrieve, insert, changeStatus, remove, searchByStatus } = book();

interface Book {
  id: number;
  title: string;
  author: string;
  year: string;
  status: 'to-read' | 'reading' | 'read';
}

const statusLabels = {
  'to-read': 'To Read',
  'reading': 'Reading',
  'read': 'Read',
};

const statusCodes: Book['status'][] = ['to-read', 'reading', 'read'];

let currentStatus: Book['status'] | null = null;


const books = ref<Book[]>();
const modalRef = ref();
const count = ref(0);

onMounted(async () => {
    const data = await retrieve();
    books.value = data?.data;
    count.value = data?.count;
});

const isModalOpen = ref(false);

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

async function filterByStatus(status: Book['status'] | null) {
    currentStatus = status;
    let data = null;

    if (status !== null) {
        data = await searchByStatus(status);
    } else {
        data = await retrieve();
    }
    books.value = data?.data;
    count.value = data?.count;
}

async function addBook({ title, author, year }: { title: string, author: string, year: string }) {
    await insert(title, author, year);
    const data = await retrieve();
    books.value = data?.data;
    count.value = data?.count;
    closeModal();
    console.log("Book saved successfully");
}

async function updateStatus(id: number, newStatus: Book['status']) {
    await changeStatus(id, newStatus);
    const data = await retrieve();
    books.value = data?.data;
    count.value = data?.count;
    console.log(`Updated book ${id} to status ${newStatus}`);
}

async function removeBook(id: number) {
    await remove(id);
    const data = await retrieve();
    books.value = data?.data;
    count.value = data?.count;
    console.log(`Book ID ${id} removed successfully`);
}

</script>
