import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { Lobby } from './pages/Lobby'
import { CodeBlock } from './pages/CodeBlock'

function App() {

  return (
    <Router>
      <main>
        <Routes>
          <Route element={<Lobby />} path="/" />
          <Route element={<CodeBlock />} path="/code/:codeId" />
        </Routes>
      </main>
    </Router>
  )
}

export default App