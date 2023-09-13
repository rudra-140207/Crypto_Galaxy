import React from 'react'
import {BrowserRouter as Router , Routes ,Route} from 'react-router-dom'
import Header from './components/Header'
import Home from './components/Home'
import Exchange from './components/Exchange'
import Coins from './components/Coins'
import CoinDetails from './components/CoinDetails'
import Footer from './components/Footer'

const App = () => {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/coins' element={<Coins />} />
          <Route path='/exchange' element={<Exchange />} />
          <Route path='/coins/:id' element={<CoinDetails />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  )
}

export default App
