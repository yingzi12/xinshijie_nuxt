import request from '~/server/utils/request'

//
export function getInfoByWid(wid) {
    return request({
        url: '/wiki/fllow/getInfoByWid?wid=' + wid,
        method: 'get'
    })
}

