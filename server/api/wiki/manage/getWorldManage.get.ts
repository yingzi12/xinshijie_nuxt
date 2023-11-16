export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();

    const query = getQuery(event)
    console.log(query)

    const url=config.public.baseUrl+'/wiki/manage/getWorldManage?wid='+query.wid
    console.log(url)
    const response = await fetch(url);
    const dataJson = await response.json();

    return {
        code: dataJson.code,
        data: dataJson.data,
        total: dataJson.total,
    };
});