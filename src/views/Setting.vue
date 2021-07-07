<template>
  <div class="main-box">
    <n-image width="400"
             :src="close" />
  </div>
</template>
<script>
import close from '../assets/images/close.png'
export default {
  data () {
    return {
      close: close
    }

  }
}
</script>
<style>
  .main-box {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>