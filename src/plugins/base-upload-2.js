import { warn } from '@/utils'

export default function attachment() {
  let suffixList = []
  let fileNum = 1
  let customFunction

  function init(type, num) {
    suffixList = type //type为数组 ：['jpg','png']
    if (num) {
      fileNum = num
    }
  }

  function bindDomUpload(dom, cb, lsfile) {
    customFunction = cb
    /* 绑定 */
    if (dom) {
      dom.onchange = (e) => {
        const files = e.target.files
        // startUpload(files)
        // console.log(files);
        if (!files.length) {
          return
        }
        let fileUrl = []
        const reader = new FileReader()
        reader.onload = (e) => {
          fileUrl.push(e.target.result)
        }
        for (let index = 0; index < files.length; index++) {
          const file = files[index];
          const [res, suffix] = checkBeforeUploading(file)
          if (!res) {
            return
          }
          reader.readAsDataURL(file)
        }
        lsfile(files, fileUrl)
        // dom.value = null
      }
    }
  }

  function checkBeforeUploading(file) {
    const fileSize = file.size

    const suffix = file.name.indexOf('.') === -1
      ? ''
      : (() => {
        const arr = file.name.split('.')
        return arr[arr.length - 1]
      })()

    if (fileSize > 4 * 1024 * 1024) {
      setTimeout(async () => {
        await warn(`文件大小不能超过4MB`)
      })
      return [false, suffix]
    }

    if (suffixList.length > 0 && !suffixList.includes(suffix.toLowerCase())) {
      setTimeout(async () => {
        await warn(`暂不支持 .${suffix} 后缀的文件`)
      })
      return [false, suffix]
    }
    return [true, suffix]
  }

  function startUpload(files) {
    if (!files || !files.length) {
      console.log('没有文件');
      return
    }
    if (files.length > fileNum) {
      customFunction(file, false)
      return
    }
    for (let index = 0; index < files.length; index++) {
      const file = files[index];
      const [res, suffix] = checkBeforeUploading(file)
      console.info('文件上传后缀为', suffix)
      if (!res) {
        return
      }

      /* 提供外部添加或删除参数 */
      customFunction(file, true)
    }
    // files.forEach(file => {
    //   const [res, suffix] = checkBeforeUploading(file)
    //   console.info('文件上传后缀为', suffix)
    //   if (!res) {
    //     return
    //   }

    //   /* 提供外部添加或删除参数 */
    //   customFunction(file, true)
    // })
  }

  return { bindDomUpload, init, startUpload }
}
