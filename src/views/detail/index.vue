<template>
  <div class="commondetail">
    <masterInfo :islike.sync="islike" :masterMsg="masterMsg" :bgColor="bgColor" />
    <remark :remarks="remarks" @chooseItem="chooseItem" @getChildRemark="getChildRemark" />
    <template v-if="remarks.length >= 10">
      <div class="loadMore">
        <span class="pointer" @click="mainLoadMore" v-if="remarks.length < mainTotal">
          查看更多
        </span>
        <span v-else>没有更多了</span>
      </div>
    </template>
    <div class="bottom_remark">
      <el-input v-model="remark_content" :maxlength="255" :placeholder="placeholdercp" @keyup.native.enter="handleRemark">
        <!-- <i slot="prefix" class="el-input__icon"></i> -->
        <i slot="suffix" class="el-input__icon el-icon-s-promotion"></i>
      </el-input>
    </div>
  </div>
</template>

<script>
import { detailMsg, getRemarks } from '@/api/myServerMsg.js'
import { islike, remarkMsg } from '@/api/myServer.js'
import { mapState } from 'vuex'
import randomcolor from 'randomcolor'

import masterInfo from './masterInfo.vue'
import remark from './remark.vue'

export default {
  name: 'detail',
  components: { masterInfo, remark },
  data() {
    return {
      islike: false,
      masterMsg: {},
      remarks: [],
      bgColor: '',
      remark_content: '',
      backOther: {},//回复其他评论信息
      mainTotal: 0,
      mainPageNum: 2,
    }
  },
  computed: {
    ...mapState({
      theme: (state) => state.page.theme,
      cancelTokenList: (state) => state.axiosrequest.cancelTokenList,
    }),
    placeholdercp() {
      let msg = '善语结善缘，恶语伤人心'
      if (this.backOther.name) {
        msg = `@${this.backOther.name}`
      }
      return msg
    },
  },
  watch: {
    theme: {
      handler: function (val) {
        const luminosity = val ? 'light' : 'dark'
        this.bgColor = randomcolor({
          hue: 'blue',
          luminosity,
          format: 'rgba',
          alpha: 0.8,
        })
      },
      immediate: true
    }
  },
  created() {
    this.init()
  },
  methods: {
    async init() {
      if (this.$route.params.id) {
        islike({
          content_id: this.$route.params.id
        }).then(res => {
          if (res.msg == 'ok') {
            this.islike = res.isLike
          }
        })
        const res_msg = await detailMsg({ content_id: this.$route.params.id })
        if (res_msg.msg == 'ok') {
          this.masterMsg = res_msg.data
          const { content_id, id, } = this.masterMsg
          this.getRemarks(content_id, id, '', 'content_id', 1)
        } else {
          this.$router.replace('/404')
        }
      } else {
        this.$router.replace('/404')
      }
    },
    handleRemark() {
      if (!this.remark_content.trim()) {
        return
      }
      let back_id = ''
      if (this.backOther.id) {
        if (this.backOther.back_id) {
          back_id = this.backOther.back_id.split("_")[0] + '_' + this.backOther.id
        } else {
          back_id = this.backOther.id
        }
      }
      // const {remark_content, sort_id, content_id, back_id} = req.body
      remarkMsg({
        remark_content: this.remark_content,
        sort_id: this.masterMsg.id,
        content_id: this.masterMsg.content_id,
        back_id
      }).then(res => {
        if (res.code == 200) {
          this.remark_content = ''
          this.backOther = {}
          let newCount = this.masterMsg.remark_count + 1
          this.$set(this.masterMsg, 'remark_count', newCount)
          this.$message.success('留下了您的赞美')
          const { content_id, id, } = this.masterMsg
          this.getRemarks(content_id, id, '', 'content_id', 1)
        }
      })
    },
    getRemarks(content_id, sort_id, id, col, pageNum) {
      this.clearnetwork()
      getRemarks({
        content_id,
        sort_id,
        id,
        col,
        pageNum
      }).then(res => {
        if (res.code == 200) {
          this.mainTotal = res.total
          this.mainPageNum = 2
          this.remarks = res.data
        }
      })
    },
    chooseItem(item) {
      this.backOther = item
    },
    getChildRemark(i) {
      this.clearnetwork()
      const { content_id, id, } = this.masterMsg
      const item = this.remarks[i]
      const pageNum = item.nowPageNum ? item.nowPageNum : 1
      getRemarks({
        content_id,
        sort_id: id,
        id: item.id,
        col: ['content_id'],
        pageNum
      }).then(res => {
        if (res.code == 200) {
          if (!item.nowPageNum) {
            item.nowPageNum = 2
          } else {
            item.nowPageNum++
          }

          if (!item.children) {
            this.$set(item, 'children', res.data)
          } else {
            item.children.push(...res.data)
          }
          // 赋值-回复的用户
          let idMap = new Map()
          item.children.forEach(item => {
            idMap.set(String(item.id), item.name);
          })
          item.children.forEach(item => {
            if (item.back_id.split("_").length == 1) {
              return
            }
            const id = item.back_id.split("_").pop()
            this.$set(item, 'back_name', idMap.get(id))
          })

          this.$set(item, 'isOpen', true)
        }
      })
    },
    clearnetwork() {
      this.cancelTokenList.forEach((cancel, index) => {
        cancel()
        this.$store.commit('axiosrequest/deleteCancelToken', index)
      })
    },
    mainLoadMore() {
      if (this.remarks.length >= this.mainTotal) {
        return
      }
      this.clearnetwork()
      const { content_id, id } = this.masterMsg
      const pageNum = this.mainPageNum
      getRemarks({
        content_id,
        sort_id: id,
        id: "",
        col: 'content_id',
        pageNum
      }).then(res => {
        if (res.code == 200) {
          this.mainPageNum++
          this.remarks.push(...res.data)
        }
      })
    }
  },
}
</script>

<style lang="scss" scoped>
.commondetail {
  position: relative;
  padding: 50px 20px 80px;
  width: 75%;
  margin: 0 auto;
  .loadMore {
    text-align: center;
    .pointer {
      cursor: pointer;
    }
  }
  .bottom_remark {
    position: fixed;
    bottom: 20px;
    width: 75%;
  }
}
</style>