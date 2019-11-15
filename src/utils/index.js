/*
* 工具函数
* */

export function getRedirectTo(type, head) {
    let path
    if (type === 'boss') {
        path = '/boss'
    } else {
        path = '/tech'
    }
    if (!head) {
        // eslint-disable-next-line
        path += 'info'
    }
    return path
}