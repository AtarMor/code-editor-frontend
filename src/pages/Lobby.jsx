import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"

import { codeBlockService } from "../services/code-block.service"

export function Lobby() {
    const [codeBlocks, setCodeBlocks] = useState([])

    useEffect(() => {
        loadCodeBlocks()
    }, [])

    async function loadCodeBlocks() {
        try {
            const codeBlocks = await codeBlockService.query()
            setCodeBlocks(codeBlocks)
        } catch (err) {
            console.log('Has issues loading code blocks:', err)
        }
    }

    return <div className="code-blocks-container">
        <h2>Choose code block</h2>
        <ul className="code-blocks-list clean-list">
            {codeBlocks.map(code => (
                <NavLink to={`/code/${code._id}`}>
                    <li key={code.id}>{code.title}</li>
                </NavLink>
            ))}
        </ul>
    </div>
}