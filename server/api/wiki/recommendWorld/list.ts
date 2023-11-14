// import { $fetch } from 'ofetch'
// import {getRecommendWorld} from "~/server/api/wiki/recommendWorld";
// import request from "/utils/request";

export default defineEventHandler(async (event) => {
    const query = getQuery(event)

    let url= '/wiki/recommendWorld/list?recType=' + recType,
    const response = await fetch(`https://admin.aiavr.uk/album/info?id=`+query.id);
    const dataJson = await response.json();
    // console.log(dataJson.data)
    return {
        code:dataJson.code,
        message: dataJson.message,
        data: dataJson.data,
    };
});


export function getRecommendWorld(recType) {
    let url= '/wiki/recommendWorld/list?recType=' + recType,
    const response = await fetch(url);
    const dataJson = await response.json();
    // console.log(dataJson.data)
    return {
        code:dataJson.code,
        message: dataJson.message,
        data: dataJson.data,
    };
}
