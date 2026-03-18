import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import ProofArtifact from './ProofArtifact.jsx'
import SecurityCompliance from './SecurityCompliance.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/proof" element={<ProofArtifact />} />
        <Route path="/compliance" element={<SecurityCompliance />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
