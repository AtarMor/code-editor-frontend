import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"

import { codeBlockService } from "../services/code-block.service"

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

    return <div className="lobby-page flex column align-center">
        <header className="flex align-center">
            <img src="../assets/img/logo.png" alt="logo" />
            <h1>Welcome to Codify</h1>
        </header>
        <div className="code-blocks-list">
            <h2 className="title">Choose a code block:</h2>
            {isLoading ? <div className="lobby-loader"><div className="loader"></div></div> :
                <ol>
                    {codeBlocks.map(code => (
                        <NavLink to={`/code/${code._id}`}>
                            <li key={code.id}>{code.title}</li>
                        </NavLink>
                    ))}
                </ol>}
        </div>
    </div>
}