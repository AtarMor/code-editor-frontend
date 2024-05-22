import { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { codeBlockService } from "../services/code-block.service"
import { SOCKET_EMIT_CODE_UPDATED, SOCKET_EVENT_IS_MENTOR, SOCKET_EVENT_JOIN, socketService } from "../services/socket.service"
import { Editor } from "@monaco-editor/react"
import { CodeBlockHeader } from "../components/CodeBlockHeader"

export function CodeBlock() {
    const [codeBlock, setCodeBlock] = useState(null)
    const [isMentor, setIsMentor] = useState(false)
    const { codeId } = useParams()
    const navigate = useNavigate()
    const editorRef = useRef(null)

    useEffect(() => {
        loadCodeBlock()
        if (sessionStorage.getItem(`isMentor-${codeId}`)) setIsMentor(true)
    }, [])

    useEffect(() => {
        if (isMentor) sessionStorage.setItem(`isMentor-${codeId}`, true)
    }, [isMentor])

    useEffect(() => {
        socketService.emit(SOCKET_EVENT_JOIN, codeId)
        socketService.on(SOCKET_EMIT_CODE_UPDATED, loadCodeBlock)
        socketService.on(SOCKET_EVENT_IS_MENTOR, () => setIsMentor(true))
        return () => {
            socketService.off(SOCKET_EMIT_CODE_UPDATED, loadCodeBlock)
            socketService.off(SOCKET_EVENT_IS_MENTOR, () => setIsMentor(false))
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

    function handleCodeChange(value) {
        if (isMentor) return
        const newCode = value
        onUpdateCode(newCode)
    }

    async function onUpdateCode(newCode) {
        const updatedCode = { ...codeBlock, code: newCode }
        try {
            await codeBlockService.update(updatedCode)
            socketService.emit(SOCKET_EMIT_CODE_UPDATED, codeId)
        } catch (err) {
            console.log('Had issues updating code', err)
        }
    }

    function onMount(editor) {
        editorRef.current = editor
        editor.focus()
    }

    if (!codeBlock) return <div>Loading...</div>
    return (
        <div className="code-block">
            <CodeBlockHeader isMentor={isMentor} codeBlock={codeBlock} />
            <div className="code-editor">
                <Editor
                    height="90vh"
                    defaultLanguage="javascript"
                    value={codeBlock.code}
                    options={{
                        readOnly: isMentor,
                        fontSize: 16,
                        minimap: {
                            enabled: false
                        },
                        contextmenu: false
                    }}
                    onMount={onMount}
                    onChange={handleCodeChange}
                    theme="vs-dark"
                />
            </div>
        </div>
    )
}