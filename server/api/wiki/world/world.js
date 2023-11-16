

// 查询世界列表
import request from "~/server/utils/request";

export function listWorld(query) {
  console.log("listworld")
  return request({
    url: '/wiki/world/list',
    method: 'get',
    params: query
  })
}

// 查询世界详细
export function getWorld(id) {
  return request({
    url: '/wiki/world/getInfo/' + id,
    method: 'get'
  })
}
export function getWorldByName(name) {
  return request({
    url: '/wiki/world/getInfoByName/' + name,
    method: 'get'
  })
}


