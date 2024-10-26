import { reactive, toRefs, ref } from "vue";
import { useGet, usePost } from "./useHttp";
export const documentList = ref([])



export const createDocument = async ({ title, content, ownerId }) => {
    try {
        const payload = {
            title,
            content,
            ownerId
        }
        const { post, data, loading, error } = usePost("document/create")
        await post(payload)
    } catch (error) {
        console.error('error:', error)
    }
}
export const getDocuments = async () => {
    try {

        const { get, data, loading, error } = useGet("document/get")
        await get()
        documentList.value = data.value.data

    } catch (error) {
        console.error('error:', error)
    }
}


export const getDocument = async (id) => {
    try {

        const { get, data, loading, error } = useGet(`document/get/${id}`)
        await get()
        return data.value.data
        // documentList.value = data.value.data

    } catch (error) {
        console.error('error:', error)
    }
}
