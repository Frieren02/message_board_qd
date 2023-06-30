import request from "@/utils/request.js"

export function sendEmail(data) {
    return request({
        method: 'POST',
        url: "user/api/sendEmail",
        data
    })
}

export function confirmRegister(id) {
    return request({
        method: 'POST',
        url: "user/api/confirmRegister",
        data: {
            id
        }
    })
}

export function login(data) {
    return request({
        method: 'POST',
        url: "user/api/login",
        data
    })
}

export function getInfo() {
    return request({
        url: "user/api/getUserInfo"
    })
}

export function logout() {
    return request({
      url: 'user/api/logout',
      method: 'delete'
    })
}

export function giteeLogin(data) {
    return request({
        method: 'POST',
        url: "user/api/giteeLogin",
        data
    })
}

export function saveMsg(data) {
    return request({
        method: 'POST',
        url: "user/api/saveMsg",
        data
    })
}

// 查询是否点赞留言
export function islike(params) {
    return request({
        url: "user/api/isLike",
        params
    })
}

// 点赞接口
export function likeMsg(params) {
    return request({
        url: "user/api/like",
        params
    })
}

// 评论接口
export function remarkMsg(data) {
    return request({
        method: 'POST',
        url: "user/api/remarkMsg",
        data
    })
}

export function changePrivacy(data) {
    return request({
        method: 'POST',
        url: "user/api/changePrivacy",
        data
    })
}

export function deleteMsg(params) {
    return request({
      url: 'user/api/delMsg',
      method: 'delete',
      params
    })
}

export function ignoreMsg(data) {
    return request({
        method: 'POST',
        url: "user/api/ignoreMsg",
        data
    })
}

export function reportMsg(params) {
    return request({
        url: "user/api/reportMsg",
        params
    })
}