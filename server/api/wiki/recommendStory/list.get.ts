// import { defineEventHandler, useRuntimeConfig } from 'nuxt3'

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const query = getQuery(event)
    let url = config.public.baseUrl+`/wiki/recommendStory/list?recType=${query.kind}`;
    console.log(url)
    const response = await fetch(url);
    const dataJson = await response.json();
    return {
        code: dataJson.code,
        data: dataJson.data,
    };
});
