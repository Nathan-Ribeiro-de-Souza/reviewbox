import {Routes, Route} from 'react-router-dom'
import { Navbar } from './components/Navbar/Navbar'
import { Catalog } from './pages/Catalog/Catalog'
import { Home } from './pages/Home/Home'
import { DetailsMovie } from './pages/DetailsMovie/DetailsMovie'
import './App.css'
import { FavoritesPage } from './pages/FavoritesPage/FavoritesPage'
import { FavoritesProvider } from './contexts/FavoritesContext/FavoritesProvider'
import { ReviewsProvider } from './contexts/ReviewsContext/ReviewsProvider'
import { ReviewsPage } from './pages/Reviews/ReviewsPage'
import { ThemeProvider } from './contexts/ThemeContext/ThemeProvider'

function App() {

  return (
    <ThemeProvider>
    <FavoritesProvider>
      <ReviewsProvider>
  <main className="app">

    <Navbar />

      <Routes>
        <Route path='/' element={<Home /> } />

        <Route path='/catalog' element={<Catalog />} />

        <Route path='/favorites' element={<FavoritesPage />}/>

        <Route path='/reviews' element={<ReviewsPage />}/>
        
        <Route path='/detailsMovie/:movieId' element={<DetailsMovie />}/>
      </Routes>
    </main>
    </ReviewsProvider>
    </FavoritesProvider>
    </ThemeProvider>
  )
}

export default App