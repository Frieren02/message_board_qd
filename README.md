

# message_board_qd

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```



## 联系方式

+ QQ: 2562429588
+ VX: 15179362314
+ 有任何问题可联系作者

## 介绍 ##

### 项目技术

vue2 + vueX + vueRouter + axios + element-ui

### 配置文件

```
// 开发环境配置文件
.env.development

// 生产环境配置文件
.env.production
```

参数介绍

|           参数名           |        解释         |
| :------------------------: | :-----------------: |
|          NODE_ENV          |    表明当前环境     |
|      VUE_APP_BASE_API      | 网络请求的公共地址  |
| VUE_APP_GITEE_REDIRECT_URI | gitee配置的回调地址 |
|  VUE_APP_GITEE_CLIENT_ID   |  gitee第三方应用id  |

### 功能介绍

+ 登录、注册、退出
+ 文件上传
+ 发布、公开、私密留言
+ 点赞、喜欢留言
+ 删除留言
+ 评论留言（多级评论，类似抖音）
+ 举报留言

### 登录、注册

+ 该项目在用户注册时使用了QQ邮箱验证的方式进行注册
+ 登录方式分为账号密码登录和第三方gitee登录

### 图片上传

可上传头像、留言的背景图片（大小可限制，本项目限制为4mb）

### 数据分页显示

对留言的信息显示做了分页处理

### 权限控制

未登录状态下用户只可查看留言，无法进行其他操作，相应的页面也有做路由权限控制

### 其他

#### 目录介绍

| 目录              | 介绍                       |
| ----------------- | -------------------------- |
| public            | 静态文件资源               |
| src/api           | api接口                    |
| src/assets        | vue静态文件，包括svg图标等 |
| src/components    | vue公共组件                |
| src/layout        | 路由布局主页               |
| src/plugins       | 插件、方法                 |
| src/router        | xue-router路由文件         |
| src/store         | xuex状态管理文件           |
| src/utils         | 公共方法、轮子、验证函数等 |
| src/views         | vue页面文件                |
| src/app.vue       | app文件                    |
| src/main          | 主文件、入口文件           |
| src/permission.js | 全局路由守卫，权限控制文件 |
| .env              | 环境文件                   |
| .gitignore        | git忽略配置文件            |
| packge            | 包管理记录文件             |
| vue.config.js     | vue2脚手架配置文件         |

#### tips

项目中使用了第三方的接口，在此感谢，

接口可能会失效，包括天气预报、页面的雪花特效

更多功能请在启动项目或代码中发现

### last

项目由作者独立开发，不设计版权问题，觉得对您有帮助的可以给点点star，非常感谢您的喜欢。**还有，作为一名失业人员，如有好的机会还望推荐一二， -_-  阿里嘎多** 

