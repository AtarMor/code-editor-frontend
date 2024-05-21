import { httpService } from "./http.service"

export const codeBlockService = {
    query,
    getById,
    update
}

function query() {
    return httpService.get('code')
}

function getById(codeId) {
    return httpService.get(`code/${codeId}`)
}

function update(code) {
    return httpService.put(`code/${code._id}`, code)
}