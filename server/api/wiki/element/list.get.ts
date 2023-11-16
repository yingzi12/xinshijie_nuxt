export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const query = getQuery(event)
    const url=config.public.baseUrl+'/wiki/element/list?'+tansParams2(query)
    console.log(url)
    const response = await fetch(url);
    const dataJson = await response.json();

    return {
        code: dataJson.code,
        data: dataJson.data,
        total: dataJson.total,
    };
});