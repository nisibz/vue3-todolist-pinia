<script setup>
import { ref, onMounted } from 'vue'
import { useTodoListStore } from '../stores/todoListItem'

const todoListStore = useTodoListStore()

const lists = ref([])
const userInput = ref('')

const addTodoList = () => {
  if (userInput.value !== '') {
    lists.value.push(userInput.value)
    userInput.value = ''
  }
}

const saveData = () => {
  todoListStore.saveData(lists.value)
}

const deleteTodoList = (index) => {
  lists.value.splice(index, 1)
}
onMounted(() => {
  lists.value = todoListStore.lists
})
</script>

<template>
  <pre>
lists value is : {{ lists }}
userInput value is : {{ userInput }}

  </pre>
  <form @submit.prevent="addTodoList">
    <input type="text" v-model.trim="userInput" />
    <button>submit</button>
  </form>
  <ul>
    <li v-for="(list, index) of lists" :key="index">
      {{ list }} <button @click="deleteTodoList(index)">delete</button>
    </li>
  </ul>
  <button @click="saveData">save</button>
</template>

<style lang="scss" scoped></style>
