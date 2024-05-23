import { NavLink } from "react-router-dom";
import { CodeBlockPreview } from "./CodeBlockPreview";

export function CodeBlockList({ codeBlocks }) {
    return <ul className="code-block-list clean-list">
        {codeBlocks.map(code => (
            <NavLink key={code._id} to={`/code/${code._id}`}>
                <CodeBlockPreview code={code}/>
            </NavLink>
        ))}
    </ul>
}