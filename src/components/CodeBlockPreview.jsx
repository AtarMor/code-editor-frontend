export function CodeBlockPreview({code}) {
    return <li className="code-block-preview">
        <h4>{code.title}</h4>
        <h4 className={code.difficulty}>{code.difficulty}</h4>
    </li>                
}