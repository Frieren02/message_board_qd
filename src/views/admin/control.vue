<template>
  <div class="control_box">
    <div class="tags">
      <div v-for="btn, i in tags" :key="i">
        <span :class="{ tag: true, isactive: btn.isactive }" @click="triggerTag(btn, i)">
          {{ btn.name }}
        </span>
      </div>
    </div>
    <div class="sort_box">
      <span v-for="btn, i in sortBtns" :key="i">
        <template v-if="!btn.hidden">
          <svg-icon :iconFileName="btn.iconName" class="btn" @click.native="handleBtnClick(btn, i)"></svg-icon>
        </template>
      </span>
    </div>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'
import { mapState } from 'vuex'

export default {
  name: 'control',
  props: {
    controls: {
      type: Object,
      default: () => { }
    },
    pageNum: {
      type: Number
    },
  },
  data() {
    return {
      sortBtns: [{
        iconName: 'sort_down',
        FunName: 'sort',
        isactive: true,
      }, {
        iconName: 'time_active',
        FunName: 'time',
        isactive: true,
      }, {
        iconName: 'heart2_white',
        FunName: 'heart',
        isactive: false,
        hidden: false,
      }],
      tags: [{
        name: '大厅',
        FunName: 'word_msg',
        isactive: true,
      }, {
        name: '我的',
        FunName: 'my_msg',
        isactive: false,
      }, {
        name: '喜欢',
        FunName: 'like_msg',
        isactive: false,
      }],

    }
  },
  computed: {
    ...mapState({
      theme: (state) => state.page.theme,
      mainType: (state) => state.page.mainType,
    }),
  },
  watch: {
    theme: {
      handler: function (val) {
        const index = this.sortBtns[1].isactive ? 2 : 1
        const iconName = val ? index === 2 ? 'heart2_black' : 'time_black' : index === 2 ? 'heart2_white' : 'time_white'
        this.$set(this.sortBtns[index], 'iconName', iconName)
      },
      immediate: true
    },
    'sortBtns.1.isactive': {
      handler: function (newVal) {
        const aindex = newVal ? 1 : 2
        const nindex = newVal ? 2 : 1
        const niconName = this.theme ? aindex === 1 ? 'heart2_black' : 'time_black' : aindex === 1 ? 'heart2_white' : 'time_white'
        const aiconName = aindex === 2 ? 'heart2_active' : 'time_active'
        this.$set(this.sortBtns[aindex], 'iconName', aiconName)
        this.$set(this.sortBtns[nindex], 'iconName', niconName)
      }
    }
  },
  created() {
    this.tags.forEach((item) => {
      if (item.FunName == this.mainType) {
        item.isactive = true
      } else {
        item.isactive = false
      }
    })
  },
  methods: {
    handleBtnClick(btn, i) {
      if (btn.FunName !== 'sort' && btn.isactive) {
        return
      }
      this.$emit('update:pageNum', 1)
      if (btn.FunName === 'sort') {
        let newName = this.sortBtns[0].iconName === 'sort_down' ? 'sort_up' : 'sort_down'
        this.$set(this.sortBtns[0], 'iconName', newName)
        const newsort = this.controls.sortOrder === 'DESC' ? 'ASC' : 'DESC'
        this.$set(this.controls, 'sortOrder', newsort)
      }
      if (i !== 0) {
        let indexs = []
        i == 1 ? indexs = [2, 1] : indexs = [1, 2]
        this.changeActive(indexs)
        const newsortBy = this.controls.sortBy === 'create_time' ? 'like_count' : 'create_time'
        this.$set(this.controls, 'sortBy', newsortBy)
      }
      this.$emit('handlebtnClik')
    },
    triggerTag(btn, i) {
      if (btn.isactive) {
        return
      }
      const hasToken = getToken()
      if (!hasToken) {
        return this.$message.info('请先登录')
      }
      this.tags.forEach((item, index) => {
        if (index == i) {
          item.isactive = true
        } else {
          item.isactive = false
        }
      })
      if (btn.FunName === 'like_msg') {
        this.changeActive([2, 1])
        this.sortBtns[2].hidden = true
        this.$set(this.controls, 'sortBy', 'create_time')
      } else {
        this.sortBtns[2].hidden = false
      }
      this.$emit('update:pageNum', 1)
      this.$store.commit('page/SET_MAINTYPE', btn.FunName)
      this.$emit('handlebtnClik')
    },
    changeActive(arr) {
      this.$set(this.sortBtns[arr[0]], 'isactive', false)
      this.$set(this.sortBtns[arr[1]], 'isactive', true)
    }
  },
}
</script>

<style lang="scss" scoped>
.control_box {
  margin-bottom: 35px;
  display: grid;
  grid-template-columns: auto 105px;
  align-items: center;

  .tags {
    display: grid;
    grid-template-columns: repeat(3, auto);
    gap: 50px;
    justify-content: center;
    text-align: center;

    .tag {
      display: inline-block;
      font-size: 17px;
      background-color: var(--bgColor);
      border-radius: 99px;
      padding: 4px 20px 5px;
      cursor: pointer;
      transition: all 0.3s;

      &:hover {
        background-color: rgba(80, 92, 126, .75);
        color: black;
        transform: translate(1px, 1px);
        box-shadow: 3px 3px 4px 1px rgba(0, 0, 0, .31);
      }

      &.isactive {
        background-color: rgba(80, 92, 126, .75);
        color: black;
        transform: translate(1px, 1px);
        box-shadow: 3px 3px 4px 1px rgba(0, 0, 0, .31);
      }
    }
  }

  .sort_box {
    background-color: var(--bgColor);
    border-radius: 99px;
    padding: 0 10px;
    font-size: 24px;
    display: flex;
    justify-content: space-between;
    align-content: center;

    ::v-deep .btn {
      cursor: pointer;
    }
  }
}
</style>