<template>
  <div>
    <template v-if="num === 1">
      <input type='file' style='display: none' ref='uploadRef' />
    </template>
    <template v-else>
      <input type='file' style='display: none' ref='uploadRef' multiple /> <!-- multiple 开启多个文件 -->
    </template>
  </div>
</template>

<script>
import axios from 'axios'
import { getToken } from '@/utils/auth'
import attachment from '@/plugins/base-upload-2.js'
import { warn, error, success } from '@/utils'

export default {
  name: 'uploadCP',
  props: {
    num: {
      type: Number,
      default: 1
    },
    fileType: {
      type: Array,
      default: []
    },
    item: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      startUpload: undefined,
      status: Object.freeze({
        START: 1,
        ON_THE_CROSS: 2,
        END_SUCCESS: 3,
        END_FAIL: 4
      }),
      files: null,
      fileUrl: [],
    }
  },
  watch: {
    fileUrl: {
      handler: function(val) {
        this.$emit('update:fileUrls', val)
      },
      deep: true
    }
  },
  async mounted() {
    const { bindDomUpload, init, startUpload } = attachment()
    await init(this.fileType, this.num)
    this.startUpload = startUpload
    this.$nextTick(() => {
      bindDomUpload(this.$refs.uploadRef, this.upload, this.lsfile)
    })
  },
  methods: {
    uploadFile() {
      this.$refs.uploadRef.click()
    },
    lsfile(files,fileUrl) {
      this.files = files
      this.fileUrl = fileUrl
    },
    saveToCloud() {
      this.startUpload(this.files)
    },
    upload(file, ok) {
      if (!ok) {
        warn(`最多上传${this.num}个文件`)
      }
      const formData = new FormData()
      formData.append('file', file)

      const obj = {
        fileName: file.name,
        status: this.status.START,
        progress: '0%'
      }

      const CancelToken = axios.CancelToken
      const source = CancelToken.source()
      this.$set(obj, 'source', source)
      let uploadUrl
      if (this.item.fileKey) {
        uploadUrl = process.env.VUE_APP_BASE_API +
          'user/api/upload?fileType=' + this.item.fileKey + '&attachmentUuid=' + this.item._attachmentUuid
      } else {
        uploadUrl = process.env.VUE_APP_BASE_API + 'user/api/upload'
      }
      axios({
        // fileType指定文件存哪[头像还是背景]，attachmentUuid指明用户的id或留言信息的id
        url: uploadUrl,
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + getToken()
        },
        data: formData,
        cancelToken: source.token,
        onUploadProgress: progressEvent => {
          const progress =
            ((progressEvent.loaded / progressEvent.total) * 100) | 0
          this.$set(obj, 'progress', progress + '%')
          this.$set(obj, 'status', this.status.ON_THE_CROSS)
        }
      })
        .then(res => res.data)
        .then(res => {
          if (res.code === 200) {
            this.$set(obj, 'fileId', res.data?.id)
            this.$set(obj, 'url', res.data?.url)
            this.$set(obj, 'source', null)
            this.$set(obj, 'status', this.status.END_SUCCESS)
            this.$set(obj, 'updateDate', res.data?.createDate)
            // success('文件上传成功')
            this.$emit('successCB')
          } else {
            error(res.msg)
            this.$set(obj, 'progress', '失败')
            this.$set(obj, 'source', null)
            this.$set(obj, 'status', this.status.END_FAIL)
          }
        })
    },
  },
}
</script>

