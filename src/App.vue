<template>
  <n-dialog-provider>
    <n-message-provider>
      <router-view />
    </n-message-provider>
  </n-dialog-provider>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HelloWorld from "./components/HelloWorld.vue";

export default defineComponent({
  name: "App",
  components: {
    HelloWorld
  }
});
</script>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    height: 100%;
    box-sizing: border-box;
  }

  body {
    height: 100%;
  }

  label {
    font-weight: 700;
  }

  #app {
    height: 100%;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  li {
    list-style: none;
  }

  a:focus,
  a:active {
    outline: none;
  }
  #home-wrap {
    height: 100%;
  }
  .n-space {
    height: 100%;
  }
  .n-space > div {
    height: 100%;
  }
  .n-menu {
    transform: translateY(70px);
  }
  .n-layout {
    height: 100%;
  }
  .n-layout-sider-scroll-container .n-button {
    transform: translate(69px, 50px);
  }
</style>
