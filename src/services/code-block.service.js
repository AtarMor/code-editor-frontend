import { httpService } from "./http.service"

export const codeBlockService = {
    query,
    getById,
    update,
    runCode
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

function runCode(userCode) {
    return httpService.post('code/execute', {
        language: 'javascript',
        version: '18.15.0',
        files: [
            {
                content: userCode
            }
        ]
    })
}