import request from "@/utils/requestmsg.js"

export function getWorldMsg(params) {
    return request({
        url: "user/api/worldMsg",
        params,
    })
}

export function getlikeMsgs(params) {
    return request({
        url: "user/api/likeMsgs",
        params,
    })
}

export function getMyMsg(params) {
    return request({
        url: "user/api/myMsg",
        params,
    })
}

export function detailMsg(params) {
    return request({
        url: "user/api/detailMsg",
        params,
    })
}

// 获取评论
export function getRemarks(data) {
    return request({
        method: 'POST',
        url: "user/api/getRemark",
        data
    })
}