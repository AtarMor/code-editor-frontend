import { useEffect, useState } from "react"

import { codeBlockService } from "../services/code-block.service"
import { CodeBlockList } from "../components/CodeBlockList"

export function Lobby() {
    const [codeBlocks, setCodeBlocks] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        loadCodeBlocks()
    }, [])

    async function loadCodeBlocks() {
        try {
            setIsLoading(true)
            const codeBlocks = await codeBlockService.query()
            setCodeBlocks(codeBlocks)
        } catch (err) {
            console.log('Has issues loading code blocks:', err)
        } finally {
            setIsLoading(false)
        }
    }

    return <div className="lobby-page flex column">
        <header className="flex align-center">
            <img src="../assets/img/logo.png" alt="logo" />
            <h1>Welcome to Codify</h1>
        </header>
        <div className="code-blocks-list-container">
            <h2 className="title">Choose a code block:</h2>
            {isLoading ?
                <div className="lobby-loader">
                    <div className="loader"></div>
                </div> :
                <CodeBlockList codeBlocks={codeBlocks}/>}
        </div>
    </div>
}