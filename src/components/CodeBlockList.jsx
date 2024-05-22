import { NavLink } from "react-router-dom";
import { CodeBlockPreview } from "./CodeBlockPreview";

export function CodeBlockList({ codeBlocks }) {
    return <ol className="code-block-list">
        {codeBlocks.map(code => (
            <NavLink key={code._id} to={`/code/${code._id}`}>
                <CodeBlockPreview code={code}/>
            </NavLink>
        ))}
    </ol>
}