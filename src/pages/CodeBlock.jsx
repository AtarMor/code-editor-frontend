import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { codeBlockService } from "../services/code-block.service"

export function CodeBlock() {
    const [codeBlock, setCodeBlock] = useState(null)
    const { codeId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadCodeBlock()
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
        const updatedCode = {...codeBlock, code: newCode}
        try {
            const savedCode = await codeBlockService.update(updatedCode)
            setCodeBlock(savedCode)
        } catch (err) {
            console.log('Had issues updating code', err)
        }
    }

    if (!codeBlock) return <div>Loading...</div>
    return (
        <div className="code-block">
                <h2>{codeBlock.title}</h2>
            <pre>
                <textarea value={codeBlock.code} onChange={handleCodeChange}>
                </textarea>
            </pre>
        </div>
    )
}