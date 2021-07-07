<template>
  <div id="home-wrap">
    <n-space vertical>
      <n-layout has-sider>
        <n-layout-sider bordered
                        collapse-mode="width"
                        :collapsed-width="64"
                        :width="240"
                        :collapsed="collapsed"
                        show-trigger
                        @collapse="collapsed = true"
                        @expand="collapsed = false">
          <n-button @click="logout">退出登录</n-button>
          <n-menu :collapsed="collapsed"
                  :collapsed-width="64"
                  :collapsed-icon-size="22"
                  :options="menuOptions"
                  @update:value="handleUpdateValue"
                  v-model:value="activeKey" />
        </n-layout-sider>
        <n-layout class="main">
          <router-view></router-view>
        </n-layout>
      </n-layout>
    </n-space>
  </div>
</template>

<script>
import { h } from 'vue'
import { useRouter } from 'vue-router'
import { NIcon } from 'naive-ui'
import {
  BookOutline as BookIcon,
  PersonOutline as PersonIcon,

} from '@vicons/ionicons5'

function renderIcon (icon) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const menuOptions = [
  {
    label: '活动一览',
    key: 'attend',
    icon: renderIcon(BookIcon),
  },
  {
    label: '我已参与',
    key: 'attended',
    icon: renderIcon(BookIcon),
  },
  {
    label: '账号设置',
    key: 's-setting',
    icon: renderIcon(BookIcon)
  },


]

import { ref } from 'vue'

export default {
  setup () {
    const router = useRouter()
    let activeKey = ref(null);
    let collapsed = ref(false);
    return {
      activeKey,
      collapsed,
      menuOptions,
      handleUpdateValue (key, item) {
        console.log(key, item);
        router.push({
          path: key
        })
      },
      logout: () => {
        router.push('/login');
        sessionStorage.clear();
      }
    }
  }

}
</script>

<style scope>
  #home-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .n-space {
    width: 90%;
  }
</style>