<template>
  <n-card title="活动总览"
          style="margin-bottom: 16px;">
    <n-tabs type="line">
      <n-tab-pane name="unaudited"
                  tab="待审核">
        <n-data-table :columns="columns"
                      :data="activities.unaudited"
                      :pagination="pagination"
                      :row-key="obj => obj.club_id" />
      </n-tab-pane>
      <n-tab-pane name="audited"
                  tab="已通过">
        <n-data-table :columns="confirmColumns"
                      :data="activities.audited"
                      :pagination="pagination"
                      :row-key="obj => obj.club_id" />
      </n-tab-pane>
      <n-tab-pane name="disallowed"
                  tab="不通过">
        <n-data-table :columns="columns"
                      :data="activities.disallowed"
                      :pagination="pagination"
                      :row-key="obj => obj.club_id" />
      </n-tab-pane>
      <n-tab-pane name="held"
                  tab="已举办">
        <n-data-table :columns="heldColumns"
                      :data="activities.held"
                      :pagination="pagination"
                      :row-key="obj => obj.club_id" />
      </n-tab-pane>
    </n-tabs>
  </n-card>
</template>
<script>
import { h, defineComponent, onMounted, toRefs, reactive } from 'vue'
import { NButton, useMessage, useDialog } from 'naive-ui'
import request from '../../networks/index'

const createColumns = () => {
  return [
    {
      title: '活动',
      key: 'activity_name'
    },
    {
      title: '地点',
      key: 'place'
    },
    {
      title: '时间',
      key: 'time'
    },
    {
      title: '经费',
      key: 'budget'
    },
    {
      title: '主题',
      key: 'title'
    },
    {
      title: '负责人',
      key: 'head_name'
    },
    {
      title: '负责人手机',
      key: 'phone'
    },

  ]
}
const createHeldColumns = () => {
  return [
    {
      title: '活动',
      key: 'activity_name'
    },
    {
      title: '地点',
      key: 'place'
    },
    {
      title: '时间',
      key: 'time'
    },
    {
      title: '经费',
      key: 'budget'
    },
    {
      title: '主题',
      key: 'title'
    },
    {
      title: '负责人',
      key: 'head_name'
    },
    {
      title: '负责人手机',
      key: 'phone'
    },
    {
      title: '教师评价',
      key: 'comment'
    }
  ]
}
const createComfirmColumns = ({ comfirm }) => {
  return [
    {
      title: '活动',
      key: 'activity_name'
    },
    {
      title: '地点',
      key: 'place'
    },
    {
      title: '时间',
      key: 'time'
    },
    {
      title: '经费',
      key: 'budget'
    },
    {
      title: '主题',
      key: 'title'
    },
    {
      title: '负责人',
      key: 'head_name'
    },
    {
      title: '负责人手机',
      key: 'phone'
    },
    {
      title: '已顺利举办',
      key: 'held',
      render (row) {
        return h(
          NButton,
          {
            size: 'small',
            onClick: () => comfirm(row)
          },
          { default: () => '确认' },
        )
      }
    }
  ]
}


export default defineComponent({
  setup () {
    const info = useMessage()
    const dialog = useDialog()
    let data = reactive({
      activities: []
    })

    onMounted(() => {
      request({
        url: '/activity/getActivityListByClub',
        method: 'post',
        data: {
          club_id: sessionStorage.getItem('id')
        }
      }).then(res => {
        const { data: { activities } } = res;
        data.activities = activities;
        console.log(activities);
        console.log(data);
      }).catch(err => {
        console.log(err);
      })
    })
    return {
      columns: createColumns(),
      heldColumns: createHeldColumns(),
      confirmColumns: createComfirmColumns({
        comfirm (rowData) {
          request({
            url: '/activity/finishActivity',
            method: 'put',
            data: {
              activity_id: rowData.activity_id
            }
          }).then(res => {
            info.success('顺利结束活动！')
            window.location.reload()
          }).catch(err => {
            info.success('出错了')
          })
        }
      }),
      pagination: {
        pageSize: 10
      },
      ...toRefs(data)
    }
  }
})
</script>
