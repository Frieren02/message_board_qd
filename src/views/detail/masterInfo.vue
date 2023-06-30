<template>
  <div class="master_msg">
    <div class="header">
      <el-avatar :size="38" :src="masterMsg.avatar_url" icon="el-icon-user-solid"></el-avatar>
      <span v-text="masterMsg.name" class="master_name"></span>
    </div>
    <div class="content" :style="cardBg">
      <div v-html="masterMsg.content" :style="textColor" class="text_content"></div>
      <div class="footer">
        <span v-text="masterMsg.create_time" class="time"></span>
        <div class="like_box">
          <svg-icon :icon-file-name="islike ? 'heart_light' : 'heart_dark'"
            @click.native="throttle(clickLike, 1500)"></svg-icon>
          <span class="count"> {{ masterMsg.like_count ? masterMsg.like_count > 999 ? "999+" : masterMsg.like_count : '0'
          }}</span>
        </div>
        <div class="remark_box">
          <svg-icon icon-file-name="remark"></svg-icon>
          <span class="count"> {{ masterMsg.remark_count ? masterMsg.remark_count > 999 ? "999+" : masterMsg.remark_count
            : '0'
          }}</span>
        </div>
        <div class="other_box">
          <template v-if="$route.query.type === 'my'">
            <el-popconfirm title="确定删除吗？" @confirm="del">
              <i slot="reference" :style="icon" class="el-icon-delete"></i>
            </el-popconfirm>
          </template>
          <template v-else>
            <el-popconfirm confirm-button-text='确定' @confirm="reportMsg" cancel-button-text='不用了' icon="el-icon-info" icon-color="red"
              title="确定要举报吗？">
              <i slot="reference" :style="icon" class="el-icon-warning-outline"></i>
            </el-popconfirm>
          </template>
          <!-- <svg-icon icon-file-name="other"></svg-icon> -->
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { likeMsg, deleteMsg, reportMsg } from '@/api/myServer.js'

export default {
  name: 'masterInfo',
  props: {
    masterMsg: {
      type: Object,
      default: () => { }
    },
    bgColor: {
      type: String,
      default: 'transparent'
    },
    islike: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      valid: true,
    }
  },
  computed: {
    cardBg() {
      let option = {
        'background-color': this.bgColor
      }
      if (this.masterMsg.bg_url) {
        let obj = {
          'background-image': `url('${this.masterMsg.bg_url}')`,
          'background-position': 'center',
          'background-size': 'cover',
          'background-repeat': 'no-repeat',
          '-webkit-filter': 'opacity(90%)',
          'filter': 'opacity(90%)',
        }
        Object.assign(option, obj)
      }
      return option
    },
    textColor() {
      return this.masterMsg.text_color ?
        { color: this.masterMsg.text_color } : {}
    },
    icon () {
      let option = {
        cursor: 'pointer'
      }
      return option
    },
  },
  created() {

  },
  methods: {
    clickLike() {
      likeMsg({
        content_id: this.masterMsg.content_id
      }).then(res => {
        if (res.code == 200) {
          let newcount = this.masterMsg.like_count
          this.islike ? newcount-- : newcount++
          this.$set(this.masterMsg, 'like_count', newcount)
          this.$emit('update:islike', !this.islike)
        }
      })
    },
    // 按钮防止多次点击
    throttle(fn, delay) {
      if (!this.valid) {
        return false
      } else {
        fn()
        this.valid = false
        setTimeout(() => {
          this.valid = true
        }, delay)
      }
    },
    del() {
      deleteMsg({
        content_id: this.masterMsg.content_id
      }).then(res => {
        if (res.code === 200) {
          this.$message.success('已删除')
          this.$router.replace('/')
        }
      })
    },
    reportMsg() {
      reportMsg({
        content_id: this.masterMsg.content_id
      }).then(res => {
        if (res.code == 200) {
          this.$message.success('已收到您的举报')
        }
      })
    }
  },
}
</script>

<style lang="scss" scoped>
.master_msg {
  margin-bottom: 20px;

  .header {
    display: grid;
    grid-template-columns: 50px auto;
    align-items: center;
    margin-bottom: 10px;

    .master_name {
      font-size: 18px;
    }
  }

  .content {
    border-radius: 8px 8px 0 0;
    padding: 10px 20px 25px;
    min-height: 250px;
    position: relative;
    box-shadow: 3px 3px 5px 3px rgba(0, 0, 0, .5);

    .text_content {
      text-align: center;
      word-break: break-all;
      white-space: pre-wrap;
      line-break: anywhere;
    }

    .footer {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 4px 7px;
      background-color: var(--bgColor);
      display: grid;
      grid-template-columns: auto repeat(2, 62px) 30px;
      align-items: center;

      .time {
        font-size: 12px;
      }

      .svg-icon {
        cursor: pointer;
        font-size: 17px;
      }
    }
  }
}
</style>