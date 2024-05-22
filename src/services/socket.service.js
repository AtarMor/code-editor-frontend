import io from 'socket.io-client'

export const SOCKET_EMIT_CODE_UPDATED = 'codeUpdated'
export const SOCKET_EVENT_IS_MENTOR = 'mentor'
export const SOCKET_EVENT_JOIN = 'join'

const baseUrl = (process.env.NODE_ENV === 'production') ? '' : '//localhost:3030'
export const socketService = createSocketService()

socketService.setup()

function createSocketService() {
    var socket = null
    const socketService = {
        setup() {
            socket = io(baseUrl)
        },
        on(eventName, cb) {
            socket.on(eventName, cb)
        },
        off(eventName, cb = null) {
            if (!socket) return;
            if (!cb) socket.removeAllListeners(eventName)
            else socket.off(eventName, cb)
        },
        emit(eventName, data) {
            socket.emit(eventName, data)
        }
    }
    return socketService
}