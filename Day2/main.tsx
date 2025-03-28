import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'
import App from './App.tsx'
import Admintable from './Admintable.tsx'
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <App /> */}
    <Admintable/>
    {/* <Router>
       <Routes>
         <Route path="/" element={<Admintable />} />
       </Routes>
     </Router> */}
  </StrictMode>,
)


