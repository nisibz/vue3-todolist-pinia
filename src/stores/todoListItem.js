import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTodoListStore = defineStore('todoList', () => {
  const lists = ref([])
  const listStore = localStorage.getItem('lists')
  if (listStore) {
    lists.value = JSON.parse(listStore)
  }

  const saveData = (lists) => {
    localStorage.setItem('lists', JSON.stringify(lists))
  }
  return { lists, saveData }
})
