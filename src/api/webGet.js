import request from "@/utils/requestweb.js"

export function getVisitorInfo() {
    return request({
     url: "/api/visitor.info",
    })
}