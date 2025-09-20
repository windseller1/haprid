import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import { getTranslation } from './translations.js'
import './App.css'

// Import pages
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import MarketplacePage from './pages/MarketplacePage'
import UserDashboard from './pages/UserDashboard'
import ProfilePage from './pages/ProfilePage'
import WalletPage from './pages/WalletPage'
import AdminDashboard from './components/AdminDashboard'
import LanguageSwitcher from './components/LanguageSwitcher'

function App() {
  const [currentLanguage, setCurrentLanguage] = useState('ar')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  const t = (key) => getTranslation(currentLanguage, key)

  return (
    <Router>
      <div className={`min-h-screen ${currentLanguage === 'ar' ? 'rtl' : 'ltr'}`}>
        <Routes>
          <Route path="/" element={
            <HomePage 
              currentLanguage={currentLanguage} 
              setCurrentLanguage={setCurrentLanguage}
              isAuthenticated={isAuthenticated}
              user={user}
              setIsAuthenticated={setIsAuthenticated}
              setUser={setUser}
            />
          } />
          <Route path="/login" element={
            <LoginPage 
              currentLanguage={currentLanguage} 
              setCurrentLanguage={setCurrentLanguage}
              setIsAuthenticated={setIsAuthenticated}
              setUser={setUser}
            />
          } />
          <Route path="/register" element={
            <RegisterPage 
              currentLanguage={currentLanguage} 
              setCurrentLanguage={setCurrentLanguage}
              setIsAuthenticated={setIsAuthenticated}
              setUser={setUser}
            />
          } />
          <Route path="/marketplace" element={
            <MarketplacePage 
              currentLanguage={currentLanguage} 
              setCurrentLanguage={setCurrentLanguage}
              isAuthenticated={isAuthenticated}
            />
          } />
          <Route path="/dashboard" element={
            <UserDashboard 
              currentLanguage={currentLanguage} 
              setCurrentLanguage={setCurrentLanguage}
              user={user}
              isAuthenticated={isAuthenticated}
            />
          } />
          <Route path="/profile" element={
            <ProfilePage 
              currentLanguage={currentLanguage} 
              setCurrentLanguage={setCurrentLanguage}
              user={user}
              isAuthenticated={isAuthenticated}
            />
          } />
          <Route path="/wallet" element={
            <WalletPage 
              currentLanguage={currentLanguage} 
              setCurrentLanguage={setCurrentLanguage}
              user={user}
              isAuthenticated={isAuthenticated}
            />
          } />
          <Route path="/admin" element={
            <div>
              <div className="bg-white border-b p-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                  <a href="/" className="text-blue-600 hover:text-blue-800">
                    ← العودة للموقع الرئيسي
                  </a>
                  <div className="flex items-center space-x-4">
                    <LanguageSwitcher 
                      currentLanguage={currentLanguage} 
                      onLanguageChange={setCurrentLanguage} 
                    />
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-600">وضع الإدارة</span>
                    </div>
                  </div>
                </div>
              </div>
              <AdminDashboard />
            </div>
          } />
        </Routes>
      </div>
    </Router>
  )
}

export default App
