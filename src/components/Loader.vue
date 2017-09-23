<template>
  <div class="loader">
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve"><g><path fill="#000000" d="M74,25v-9c0-1.1-0.9-2-2-2H28c-1.1,0-2,0.9-2,2v9c0,1.1,0.9,2,2,2h2.8c-2.9,2.7-4.8,6.7-4.8,11v32   c0,8.3,6.7,15,14.9,15h18.5C67.4,85,74,78.3,74,70V38c0-4.3-1.8-8.3-4.7-11H72C73.1,27,74,26.1,74,25z M70,38v32   c0,6.1-4.8,11-10.6,11H40.9C35,81,30,76,30,70V38c0-6,5-11,10.9-11h18.5C65.2,27,70,31.9,70,38z M70,23H30v-5h40V23z"/></g><g><path fill="#000000" d="M65.3,67c-0.5,0-1-0.4-1-1V40.3c0-0.5,0.4-1,1-1s1,0.4,1,1V66C66.2,66.5,65.8,67,65.3,67z"/></g><g><circle fill="#000000" cx="65.3" cy="71" r="2.2"/></g></svg> 
  </div>
</template>

<script>
export default {

}
</script>

<style>
.loader {
  width: 100px;
  height: 100px;
  animation: 0.7s loader linear infinite;
}

@keyframes loader {
  30% {
    transform: translateY(-30px);
  }
  
  50% {
    transform: translateY(0)
  }
}
</style>