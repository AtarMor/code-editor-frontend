export function CodeRunner({ output, isError, isRunnerLoading }) {
    return (
        <div className="code-runner">
            {isRunnerLoading ? <div className="loader"></div> :
            <div style={isError ? { color: 'red' } : {}}>
                {output ? output.map((line, idx) => <p key={idx}>{line}</p>)
                    : 'Click "Run" to see the output.'}
            </div>}
        </div>
    )
}