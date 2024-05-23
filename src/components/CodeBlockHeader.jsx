import { NavLink } from "react-router-dom";

export function CodeBlockHeader({ isMentor, codeBlock, onSubmitCode, onReset, onRunCode }) {
    return <header className="code-block-header">
        <section className="logo-container flex align-center">
            <NavLink to={'/'}>
                <img src="../assets/img/logo.png" alt="logo" />
            </NavLink>
            <h2 className="code-block-title">{codeBlock.title}</h2>
        </section>
        <section className="btn-container flex">
            <button className="dark-btn fa-solid reset" onClick={onReset}>Reset</button>
            <button className="dark-btn fa-solid caret-right" onClick={onRunCode}>Run</button>
            <button className="dark-btn fa check" onClick={onSubmitCode}>Submit</button>
        </section>
        <section className="welcome-user flex">
            <h2>Welcome {isMentor ? 'Mentor!' : 'Student!'}</h2>
        </section>
    </header>
}