import { Routes, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar/Navbar'
import { Catalog } from './pages/Catalog/Catalog'
import { Home } from './pages/Home/Home'
import { DetailsMovie } from './pages/DetailsMovie/DetailsMovie'
import { DetailsSeries } from './pages/DetailsSerie/DetailsSerie'
import './App.css'

import { FavoritesPage } from './pages/FavoritesPage/FavoritesPage'
import { FavoritesProvider } from './contexts/FavoritesContext/FavoritesProvider'
import { ReviewsProvider } from './contexts/ReviewsContext/ReviewsProvider'
import { ReviewsPage } from './pages/Reviews/ReviewsPage'
import { ThemeProvider } from './contexts/ThemeContext/ThemeProvider'
import { Login } from './pages/Login/Login'
import { Register } from './pages/Register/Register'
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute'
import { AuthProvider } from './contexts/AuthContext/AuthProvider'
import { Profile } from './pages/Profile/Profile'

function App() {
  return (
    <AuthProvider>
    <ThemeProvider>
      <FavoritesProvider>
        <ReviewsProvider>
          
          
          <main className="app">
            <Navbar />

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/detailsMovie/:movieId" element={<DetailsMovie />} />
              <Route path="/detailsSerie/:serieId" element={<DetailsSeries />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />}/>
              <Route path="/profile/:userId" element={<Profile />} />
              
              <Route element={<ProtectedRoute />}>
              <Route path="/reviews" element={<ReviewsPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/profile" element={<Profile />} />
              </Route>
            </Routes>
          </main>
          
          
        </ReviewsProvider>
      </FavoritesProvider>
    </ThemeProvider>
    </AuthProvider>
  )
}

export default App