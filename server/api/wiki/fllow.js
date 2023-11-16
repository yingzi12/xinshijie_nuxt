

//
export function getInfoByWid(wid) {
    return request({
        url: '/wiki/fllow/getInfoByWid?wid=' + wid,
        method: 'get'
    })
}

