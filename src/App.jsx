import React from 'react'
import Weather from './components/WeatherPage.jsx'
import Navbar from './components/nav/Navbar.jsx'

const App = () => {
  return (
    <div className='app'>
      <Navbar/>
      <Weather/>
    </div>
  )
}

export default App
