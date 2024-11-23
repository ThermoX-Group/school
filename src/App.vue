<template>
  <!-- <router-view class="w-95% absolute left-0"></router-view> -->
  <!-- <SideBarPages></SideBarPages> -->
  <router-view></router-view>
  <ButtonMenu></ButtonMenu>

</template>

<script>
import { onMounted, provide, ref } from 'vue';
import ButtonMenu from './components/ButtonMenu.vue';
import SideBarPages from './components/SideBarPages.vue';
export default {
  components: {
    ButtonMenu,
    SideBarPages,
  },
  setup() {
    let userDatas = ref('')
    let allClass = ref('')
    let allStudents = ref([])
    let allPersonnels = ref([])
    let disciplinaryCase = ref([])
    let allNotics = ref([])
    function getUserDatas() {
      fetch(`https://payambar-azam-a7b19-default-rtdb.firebaseio.com/user/-OBaUdCZ2cz21J1umrlj.json`)
        .then(res => res.json())
        .then(data => {
          userDatas.value = data
        })
    }
    function getClass() {
      fetch(`https://payambar-azam-a7b19-default-rtdb.firebaseio.com/class.json`)
        .then(res => res.json())
        .then(data => {
          if (data) {
            allClass.value = Object.entries(data)
          }
        })
    }
    function getStudents() {
      fetch(`https://payambar-azam-a7b19-default-rtdb.firebaseio.com/students.json`)
        .then(res => res.json())
        .then(data => allStudents.value = Object.entries(data))
    }
    function getDisciplinaryCases() {
      fetch(`https://payambar-azam-a7b19-default-rtdb.firebaseio.com/disciplinaryCase.json`)
        .then(res => res.json())
        .then(data => disciplinaryCase.value = Object.entries(data))
    }
    function getPersonnels() {
      fetch(`https://payambar-azam-a7b19-default-rtdb.firebaseio.com/personnels.json`)
        .then(res => res.json())
        .then(data => allPersonnels.value = Object.entries(data))
    }
    function getNotics() {
      fetch(`https://payambar-azam-a7b19-default-rtdb.firebaseio.com/notics.json`)
        .then(res => res.json())
        .then(data => allNotics.value = Object.entries(data))
    }
    onMounted(() => {
      getUserDatas()
      getClass()
      getStudents()
      getDisciplinaryCases()
      getPersonnels()
      getNotics()
    })

    provide("getUserDatas", getUserDatas)
    provide("userDatas", userDatas)
    provide("allClass", allClass)
    provide("getClass", getClass)
    provide("getStudents", getStudents)
    provide("allStudents", allStudents)
    provide("getPersonnels", getPersonnels)
    provide("allPersonnels", allPersonnels)
    provide("disciplinaryCase", disciplinaryCase)
    provide("getDisciplinaryCases", getDisciplinaryCases)
    provide("allNotics", allNotics)
    provide("getNotics", getNotics)

    return {}
  }
}
</script>