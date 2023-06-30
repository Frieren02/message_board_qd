<template>
  <div class="admin_content">
    <control ref="control" :controls.sync="controls" :pageNum.sync="pageNum" @handlebtnClik="handlebtnClik" />
    <msgBoard :loading="loading" :msgInfo="msgInfo" :total="total" :pageNum.sync="pageNum" :pageSize="pageSize"
      @updatamsg="handlebtnClik" />
  </div>
</template>
 
<script>
import { getWorldMsg, getlikeMsgs, getMyMsg } from '@/api/myServerMsg.js'
import { uuid } from '@/utils'
import { mapState } from 'vuex'

import control from './control.vue'
import msgBoard from './msgBoard.vue';
export default {
  name: 'userAdmin',
  components: { control, msgBoard },
  data() {
    const mockData = (() => {
      let data = []
      for (let index = 0; index < 12; index++) {
        data.push({
          content_id: uuid(14),
          nomore: true
        })
      }
      return data
    })();
    return {
      controls: {
        sortOrder: 'DESC',//DESC、ASC
        sortBy: 'create_time',
      },
      loading: true,
      pageNum: 1,
      pageSize: 12,
      total: 12,
      msgInfo: mockData,
    }
  },
  computed: {
    ...mapState({
      cancelTokenList: (state) => state.axiosrequest.cancelTokenList,
      mainType: (state) => state.page.mainType,
    }),
  },
  created() {
    this.handlebtnClik()
  },
  watch: {
  },
  methods: {
    getmsg() {
      this.loading = true
      getWorldMsg({
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        sortBy: this.controls.sortBy,
        sortOrder: this.controls.sortOrder,
      }).then(res => {
        let data
        if (res.msg == 'ok') {
          data = this.handlemsgdata(res.data)
        } else {
          data = this.handlemsgdata([])
        }
        this.total = res.total
        this.msgInfo = data
      }).catch(err => {
        console.log(err);
      }).finally(() => {
        this.loading = false
      })

    },
    getMyMsg() {
      this.loading = true
      getMyMsg({
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        sortBy: this.controls.sortBy,
        sortOrder: this.controls.sortOrder,
      }).then(res => {
        let data
        if (res.msg == 'ok') {
          data = this.handlemsgdata(res.data)
        } else {
          data = this.handlemsgdata([])
        }
        this.total = res.total
        this.msgInfo = data
      }).catch(err => {
        console.log(err);
      }).finally(() => {
        this.loading = false
      })

    },
    getlikemsgs() {
      this.loading = true
      getlikeMsgs({
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        sortOrder: this.controls.sortOrder,
      }).then(res => {
        let data
        if (res.msg == 'ok') {
          data = this.handlemsgdata(res.data)
        } else {
          data = this.handlemsgdata([])
        }
        this.total = res.total
        this.msgInfo = data
      }).catch(err => {
        console.log(err);
      }).finally(() => {
        this.loading = false
      })

    },
    handlemsgdata(data) {
      if (data.length === this.pageSize) {
        return data
      }
      const needNum = this.pageSize - data.length
      for (let index = 0; index < needNum; index++) {
        data.push({
          content_id: uuid(14),
          nomore: true
        })
      }
      return data
    },
    handlebtnClik() {
      const type = this.mainType
      this.cancelTokenList.forEach((cancel, index) => {
        cancel()
        this.$store.commit('axiosrequest/deleteCancelToken', index)
      })
      switch (type) {
        case 'my_msg':
          console.log('我的');
          this.getMyMsg()
          break;
        case 'like_msg':
          console.log('喜欢');
          this.getlikemsgs()
          break;
        default:
          console.log('世界');
          this.getmsg()
          break;
      }
    }
  },
}
</script>
 
<style lang="scss" scoped>
.admin_content {
  position: relative;
  padding: 50px 20px 10px;
  width: 75%;
  margin: 0 auto;
}
</style>