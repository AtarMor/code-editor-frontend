export function CodeRunner({ output, isError, isRunnerLoading }) {
    if (isRunnerLoading) return <div className="loader"></div>
    return (
        <div className="code-runner">
            <div style={isError ? { color: 'red' } : {}}>
                {output ? output.map((line, idx) => <p key={idx}>{line}</p>)
                    : 'Click "Run" to see the output.'}
            </div>
        </div>
    )
}