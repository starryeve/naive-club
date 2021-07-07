<template>
  <n-card title="成员列表"
          style="margin-bottom: 16px;">
    <n-data-table :columns="columns"
                  :data="members"
                  :pagination="pagination"
                  :row-key="obj => obj.member_id" />
  </n-card>
</template>

<script>
import { h, defineComponent, onMounted, reactive, toRefs } from 'vue'
import { NButton, useMessage } from 'naive-ui'
import request from '../../networks/index'
const createColumns = ({ deleteMember }) => {
  return [
    {
      title: '姓名',
      key: 'member_name'
    },
    {
      title: '手机',
      key: 'phone'
    },
    {
      title: '性别',
      key: 'gender',
    },
    {
      title: '职位',
      key: 'position',
    },
    {
      title: '学号',
      key: 'student_id',
    },
    {
      title: '加入年份',
      key: 'session',
    },
    {
      title: '操作',
      key: 'actions',
      render (row) {
        return h(
          NButton,
          {
            size: 'small',
            type: 'warning',
            onClick: () => deleteMember(row)
          },
          { default: () => '删除' }
        )
      }
    }
  ]
}



export default defineComponent({
  setup () {
    const info = useMessage()
    const data = reactive({
      members: []
    })
    onMounted(() => {
      request({
        url: '/member/getMemberListByClub',
        method: 'post',
        data: {
          club_id: sessionStorage.getItem('id')
        }
      }).then(res => {
        const { data: { members } } = res
        data.members = members
      }).catch(err => {
        console.log(err);
      })
    })
    return {
      ...toRefs(data),
      columns: createColumns({
        deleteMember (rowData) {
          request({
            url: '/member/deleteMember',
            method: 'post',
            data: {
              member_id: rowData.member_id
            }
          }).then(res => {
            info.success('删除成功')
            window.location.reload()
          }).catch(err => {
            info.success('出错了')
          })
        }
      }),
      pagination: {
        pageSize: 10
      }
    }
  }
})
</script>