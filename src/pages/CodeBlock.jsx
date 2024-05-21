import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { codeBlockService } from "../services/code-block.service"
import { SOCKET_EMIT_CODE_UPDATED, SOCKET_EVENT_IS_STUDENT, SOCKET_EVENT_JOIN, socketService } from "../services/socket.service"

export function CodeBlock() {
    const [codeBlock, setCodeBlock] = useState(null)
    const [isMentor, setIsMentor] = useState(true)
    const { codeId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadCodeBlock()
    }, [])

    useEffect(() => {
        socketService.emit(SOCKET_EVENT_JOIN, codeId)
        socketService.on(SOCKET_EMIT_CODE_UPDATED, loadCodeBlock)
        socketService.on(SOCKET_EVENT_IS_STUDENT, () => setIsMentor(false))
        return () => {
            socketService.off(SOCKET_EMIT_CODE_UPDATED, loadCodeBlock)
            socketService.off(SOCKET_EVENT_IS_STUDENT, () => setIsMentor(true))
        }
    }, [])

    async function loadCodeBlock() {
        try {
            const codeBlock = await codeBlockService.getById(codeId)
            setCodeBlock(codeBlock)
        } catch (err) {
            console.log('Had issues loading code block:', err)
            navigate('/')
        }
    }

    function handleCodeChange({ target }) {
        const newCode = target.value
        onUpdateCode(newCode)
    }

    async function onUpdateCode(newCode) {
        const updatedCode = { ...codeBlock, code: newCode }
        try {
            const savedCode = await codeBlockService.update(updatedCode)
            setCodeBlock(savedCode)
            socketService.emit(SOCKET_EMIT_CODE_UPDATED)
        } catch (err) {
            console.log('Had issues updating code', err)
        }
    }

    if (!codeBlock) return <div>Loading...</div>
    return (
        <div className="code-block">
            <h2>{codeBlock.title}</h2>
            <pre>
                <textarea readOnly={isMentor} value={codeBlock.code} onChange={handleCodeChange}>
                </textarea>
            </pre>
        </div>
    )
}