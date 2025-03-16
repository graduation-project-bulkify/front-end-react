import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import App from './App.jsx'
import Header from '../Header_Footer/header.jsx'
import Footer from '../Header_Footer/footer.jsx'
import {AuthProvider} from './components/context/AuthProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header />
    <AuthProvider>
      <App />
    </AuthProvider>
    <Footer />
  </StrictMode>,
)
