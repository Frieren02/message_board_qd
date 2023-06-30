<template>
  <div class="outer_box" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
    <div class="grid_box">
      <div v-for="item, i in msgInfo" :key="item.content_id" class="item" :class="{ nomore: item.nomore }">
        <template v-if="!item.nomore">
          <template v-if="item.notfund">
            <div class="skeleton">
              <span>丢失找不到了</span>
              <p><el-link @click="ingore(item.content_id)">忽略</el-link></p>
            </div>
          </template>
          <template v-else-if="mainType === 'my_msg'">
            <msg-card-my :item="item" :bgColor="bgColors[i]" />
          </template>
          <template v-else>
            <msg-card :item="item" :bgColor="bgColors[i]" />
          </template>
        </template>
        <template v-else>
          <div class="skeleton">
            <span>没有更多了...</span>
          </div>
        </template>
      </div>
    </div>
    <div class="left_btn">
      <template v-if="!firstPage">
        <el-tooltip :effect="theme ? 'light' : 'dark'" content="上一页" :enterable="false" placement="top">
          <svg-icon :iconFileName="iconNames[0]" class="po_btn" @click.native="handlerFlip('pre')"></svg-icon>
        </el-tooltip>
      </template>
      <template v-else>
        <svg-icon iconFileName="arrow-left_dis" class="dis_btn"></svg-icon>
      </template>
    </div>
    <div class="right_btn">
      <template v-if="!lastPage">
        <el-tooltip :effect="theme ? 'light' : 'dark'" content="下一页" :enterable="false" placement="top">
          <svg-icon :iconFileName="iconNames[1]" class="po_btn" @click.native="handlerFlip('next')"></svg-icon>
        </el-tooltip>
      </template>
      <template v-else>
        <svg-icon iconFileName="arrow-right_dis" class="dis_btn"></svg-icon>
      </template>
    </div>
  </div>
</template>

<script>
import randomcolor from 'randomcolor'
import msgCard from './msgCard.vue';
import msgCardMy from './msgCardMy.vue';
import { mapState } from 'vuex'
import { ignoreMsg } from '@/api/myServer.js'

export default {
  name: 'msgBoard',
  components: { msgCard, msgCardMy },
  props: {
    loading: {
      type: Boolean,
      default: true
    },
    msgInfo: {
      type: Array,
      default: () => []
    },
    pageSize: {
      type: Number
    },
    pageNum: {
      type: Number
    },
    total: {
      type: Number
    }
  },
  data() {
    return {
      bgColors: [],
      iconNames: ['', ''],
    }
  },
  computed: {
    ...mapState({
      theme: (state) => state.page.theme,
      mainType: (state) => state.page.mainType,
    }),
    firstPage() {
      return this.pageNum == 1
    },
    lastPage() {
      return this.total <= this.pageNum * this.pageSize
    }
  },
  watch: {
    theme: {
      handler: function (val) {
        val ? this.iconNames = ['arrow-left_dark', 'arrow-right_dark'] : this.iconNames = ['arrow-left_light', 'arrow-right_light']
        const luminosity = val ? 'light' : 'dark'
        const colors = randomcolor({
          hue: 'blue',
          luminosity,
          format: 'rgba',
          alpha: 0.8,
          count: 12,
        })
        this.bgColors = colors
      },
      immediate: true
    }
  },
  created() {

  },
  methods: {
    ingore(content_id) {
      ignoreMsg({
        content_id,
        overlook: 1
      }).then(res => {
        if (res.code == 200) {
          this.$emit('updatamsg')
        }
      })
    },
    handlerFlip(type) {
      let newpagenum = this.pageNum
      type === 'pre' ? newpagenum-- : newpagenum++
      this.$emit('update:pageNum', newpagenum)
      this.$emit('updatamsg')
    }
  },
}
</script>

<style lang="scss" scoped>
@mixin btn-base-style() {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 48px;
}

.outer_box {
  position: relative;

  .grid_box {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px 15px;

    .item {
      position: relative;
      padding-top: 60%;

      .skeleton {
        position: absolute;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        border: 1px dotted var(--textColor);
        display: grid;
        justify-content: center;
        align-items: center;
        top: 0;
        text-align: center
      }
    }

  }

  .left_btn {
    @include btn-base-style();
    left: -90px;
  }

  .right_btn {
    @include btn-base-style();
    right: -90px;
  }

  ::v-deep .po_btn {
    cursor: pointer;
  }

  ::v-deep .dis_btn {
    cursor: not-allowed;
  }
}
</style>