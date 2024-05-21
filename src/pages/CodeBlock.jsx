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

    function handleCodeChange({target}) {
        const newCode = target.value
        setCodeBlock(newCode)
    }

    if (!codeBlock) return <div>Loading...</div>
    return (
        <div className="code-block">
            <pre>
                <h2>{codeBlock.title}</h2>
                    <textarea value={codeBlock.code} onChange={handleCodeChange}>
                    </textarea>
            </pre>
        </div>
    )
}