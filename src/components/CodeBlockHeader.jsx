import { NavLink } from "react-router-dom";

export function CodeBlockHeader({ isMentor, codeBlock }) {
    return <header className="code-block-header">
        <section className="logo-container flex align-center">
            <NavLink to={'/'}>
                <img src="../img/logo.png" alt="logo" />
            </NavLink>
            <h2>{codeBlock.title}</h2>
        </section>
        <section className="btn-container flex">
            <button>Reset</button>
            <button>Run</button>
        </section>
        <section className="welcome-user flex">
            <h2>Welcome {isMentor ? 'mentor!' : 'student!'}</h2>
        </section>
    </header>
}