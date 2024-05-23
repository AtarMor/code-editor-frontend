import { NavLink } from "react-router-dom";

export function CodeBlockHeader({ isMentor, codeBlock, onSubmitCode, onReset }) {
    return <header className="code-block-header">
        <section className="logo-container flex align-center">
            <NavLink to={'/'}>
                <img src="../assets/img/logo.png" alt="logo" />
            </NavLink>
            <h2 className="code-block-title">{codeBlock.title}</h2>
        </section>
        <section className="btn-container flex">
            <button className="dark-btn" onClick={onReset}>Reset</button>
            <button className="dark-btn" onClick={onSubmitCode}>Submit</button>
        </section>
        <section className="welcome-user flex">
            <h2>Welcome {isMentor ? 'mentor!' : 'student!'}</h2>
        </section>
    </header>
}