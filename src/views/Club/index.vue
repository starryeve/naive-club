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
    label: '社团成员',
    key: 'member',
    icon: renderIcon(BookIcon),
    children: [
      {
        label: '成员列表',
        key: 'list',
        icon: renderIcon(PersonIcon)
      },
      {
        label: '添加成员',
        key: 'add',
        icon: renderIcon(PersonIcon)
      }
    ]
  },
  {
    label: '社团活动',
    key: 'pinball-1973',
    icon: renderIcon(BookIcon),
    children: [
      {
        label: '活动一览',
        key: 'activity',
        icon: renderIcon(PersonIcon)
      },
      {
        label: '活动申请',
        key: 'apply',
        icon: renderIcon(PersonIcon)
      }
    ]
  },
  {
    label: '账号设置',
    key: 'c-setting',
    icon: renderIcon(BookIcon)
  },


]

import { ref } from 'vue'

export default {
  setup () {
    const router = useRouter()
    let activeKey = ref(null);
    let collapsed = ref(true);
    return {
      activeKey,
      collapsed,
      menuOptions,
      handleUpdateValue (key, item) {
        console.log(key, item);
        router.push({
          path: key
        })
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