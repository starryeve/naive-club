<template>
  <n-card title="成员列表"
          style="margin-bottom: 16px;">
    <n-data-table :columns="columns"
                  :data="data"
                  :pagination="pagination"
                  :row-key="obj => obj.age" />
  </n-card>
</template>

<script>
import { h, defineComponent, onMounted } from 'vue'
import { NTag, NButton, useMessage } from 'naive-ui'
import request from '../../networks/index'
const createColumns = ({ sendMail }) => {
  return [
    {
      title: 'Name',
      key: 'name'
    },
    {
      title: 'Age',
      key: 'age'
    },
    {
      title: 'Address',
      key: 'address'
    },
    {
      title: 'Tags',
      key: 'tags',
      render (row) {
        const tags = row.tags.map((tagKey) => {
          return h(
            NTag,
            {
              style: {
                marginRight: '6px'
              },
              type: 'info'
            },
            {
              default: () => tagKey
            }
          )
        })
        return tags
      }
    },
    {
      title: 'Action',
      key: 'actions',
      render (row) {
        return h(
          NButton,
          {
            size: 'small',
            onClick: () => sendMail(row)
          },
          { default: () => 'Send Email' }
        )
      }
    }
  ]
}

const createData = () => [
  {
    aaa: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer']
  },
  {
    aaa: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['wow']
  },
  {
    aaa: '1',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher']
  }
]

export default defineComponent({
  setup () {
    const message = useMessage()
    onMounted(() => {
      request({
        url: '/member/getMemberListByClub',
        method: 'post',
        data: {
          club_id: sessionStorage.getItem('id')
        }
      }).then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      })
    })
    return {
      data: createData(),
      columns: createColumns({
        sendMail (rowData) {
          message.info('send mail to ' + rowData.name)
        }
      }),
      pagination: {
        pageSize: 10
      }
    }
  }
})
</script>