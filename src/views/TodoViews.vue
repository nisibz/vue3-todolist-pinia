<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
// import { useTodoListStore } from '../stores/todoListItem'

// const todoListStore = useTodoListStore()

const lists = ref([])
const userInput = ref('')

// const addTodoList = () => {
//   if (userInput.value !== '') {
//     lists.value.push(userInput.value)
//     userInput.value = ''
//   }
// }

const saveData = () => {
  // todoListStore.saveData(lists.value)
}

// const deleteTodoList = (index) => {
//   lists.value.splice(index, 1)
// }

const fetchData = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/todolist')
    lists.value = response.data
    console.log(lists.value)
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

const postData = async () => {
  try {
    // Replace with your actual data
    const data = {
      name: userInput.value,
      time: new Date(),
      success: false
    }
    userInput.value = ''
    const response = await axios.post('http://localhost:3000/api/todolist', data)
    console.log(response)
    await fetchData()
  } catch (error) {
    console.error('Error posting data:', error)
  }
}

const deleteData = async (id) => {
  const response = await axios.delete(`http://localhost:3000/api/todolist/${id}`)
  console.log(response)
  await fetchData()
}

const updateTodolist = async (data) => {
  data.success = !data.success
  const response = await axios.put(`http://localhost:3000/api/todolist/${data._id}`, data)
  await fetchData()
}

onMounted(async () => {
  await fetchData()
  // lists.value = todoListStore.lists
})
</script>

<template>
  <pre>
<!-- lists value is : {{ lists }}
userInput value is : {{ userInput }} -->

  </pre>
  <form @submit.prevent="postData">
    <input type="text" v-model.trim="userInput" />
    <button>submit</button>
  </form>
  <ul>
    <li v-for="(list, index) of lists" :key="index">
      <input type="checkbox" v-model="list.success" @click="updateTodolist(list)" />
      {{ list.name }} {{ list.time }}<button @click="deleteData(list._id)">delete</button>
    </li>
  </ul>
  <button @click="saveData">save</button>
</template>

<style lang="scss" scoped></style>
