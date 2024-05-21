import { httpService } from "./http.service"

export const codeBlockService = {
    query,
    getById
}

function query() {
    return httpService.get('code')
}

function getById(codeId) {
    return httpService.get(`code/${codeId}`)
}