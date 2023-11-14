import request from '~/server/utils/request'

export function getRecommendStory(recType) {
    return request({
        url: '/wiki/recommendStory/list?recType=' + recType,
        method: 'get'
    })
}
