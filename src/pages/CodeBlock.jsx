import { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Editor } from "@monaco-editor/react"

import { CodeBlockHeader } from "../components/CodeBlockHeader"
import { CodeRunner } from "../components/CodeRunner"
import { Modal } from "../components/Modal"

import { codeBlockService } from "../services/code-block.service"
import { SOCKET_EMIT_CODE_UPDATED, SOCKET_EVENT_IS_MENTOR, SOCKET_EVENT_JOIN, socketService } from "../services/socket.service"

export function CodeBlock() {
    const [codeBlock, setCodeBlock] = useState(null)
    const [isMentor, setIsMentor] = useState(false)
    const { codeId } = useParams()
    const navigate = useNavigate()
    const editorRef = useRef(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [userMsg, setUserMsg] = useState('')
    const [isLoading, setIsLoading] = useState(true)

    // CodeRunner states //
    const [output, setOutput] = useState(null)
    const [isError, setIsError] = useState(false)
    const [isRunnerLoading, setIsRunnerLoading] = useState(false)

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
            setIsLoading(true)
            const codeBlock = await codeBlockService.getById(codeId)
            setCodeBlock(codeBlock)
        } catch (err) {
            console.log('Had issues loading code block:', err)
            navigate('/')
        } finally {
            setIsLoading(false)
        }
    }

    function handleCodeChange(value) {
        if (isMentor) return
        const newCode = value
        onUpdateCode(newCode)
    }

    async function onUpdateCode(newCode) {
        const prevCode = { ...codeBlock }
        const updatedCode = { ...codeBlock, code: newCode }
        setCodeBlock(updatedCode)

        try {
            await codeBlockService.update(updatedCode)
            socketService.emit(SOCKET_EMIT_CODE_UPDATED, codeId)
        } catch (err) {
            console.log('Had issues updating code', err)
            setCodeBlock(prevCode)
        }
    }

    async function onReset() {
        const resetCode = { ...codeBlock, code: codeBlock.initialCode }
        try {
            await codeBlockService.update(resetCode)
            setCodeBlock(resetCode)
            socketService.emit(SOCKET_EMIT_CODE_UPDATED, codeId)
        } catch (err) {
            console.log('Had issues resetting code', err)
        }
    }

    async function onSubmitCode() {
        try {
            const { run: expected } = await codeBlockService.runCode(codeBlock.solution + codeBlock.tests)
            const { run: actual } = await codeBlockService.runCode(codeBlock.code + codeBlock.tests)
            checkSolution(actual.output, expected.output)
        } catch (err) {
            console.log('Had issues checking solution:', err)
        }
    }

    function checkSolution(actual, expected) {
        if (actual === expected) {
            setUserMsg({ txt: 'Great job!', type: 'success' })
        } else {
            setUserMsg({ txt: 'Try again', type: 'failure' })
        }
        setIsModalOpen(true)
    }

    async function onRunCode() {
        if (!codeBlock.code) return
        try {
            setIsRunnerLoading(true)
            const { run: res } = await codeBlockService.runCode(codeBlock.code)
            res.output ? setOutput(res.output.split('\n')) :
                setOutput(['It looks like nothing was printed. Make sure your code includes a print statement.'])
            res.stderr ? setIsError(true) : setIsError(false)
        } catch (err) {
            console.log('Unable to run code:', err)
            setOutput('Sorry, unable to run code. Please try again later.')
        } finally {
            setIsRunnerLoading(false)
        }
    }

    function onMount(editor) {
        editorRef.current = editor
        editor.focus()
    }

    if (isLoading) return <div className="code-block-loader"><div className="loader"></div></div>
    return (
        <div className="code-block main-layout">
            <CodeBlockHeader
                isMentor={isMentor}
                codeBlock={codeBlock}
                onSubmitCode={onSubmitCode}
                onReset={onReset}
                onRunCode={onRunCode}
            />
            <div className="code-editor">
                <Editor
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
            <CodeRunner
                output={output}
                isError={isError}
                isRunnerLoading={isRunnerLoading}
            />
            {isModalOpen && userMsg &&
                <Modal userMsg={userMsg} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />}
        </div>
    )
}