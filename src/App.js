
import './App.css'

import React, { Component } from 'react'
import Navbar from './Components/Navbar'
import NewsItem from './Components/NewsItem'
import NewsComponent from './Components/NewsComponent'
import Footer from './Components/Footer'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function App() {

  return (
    <Router>
      <Navbar /> {/* Stays at the top */}
      <Routes>
        {/* All NewsComponents MUST be inside Routes and have a unique KEY */}

        {/* <NewsComponent /> */}
        <Route exact path="/" key='general' element={<NewsComponent pageSize={10} category="general" />} />
        <Route exact path="/business" key='business' element={<NewsComponent pageSize={10} category="business" />} />
        <Route exact path="/entertainment" key='entertainment' element={<NewsComponent pageSize={10} category="entertainment" />} />
        <Route exact path="/health" key='health' element={<NewsComponent pageSize={10} category="health" />} />
        <Route exact path="/science" key='science' element={<NewsComponent pageSize={10} category="science" />} />
        <Route exact path="/sports" key='sports' element={<NewsComponent pageSize={10} category="sports" />} />
        <Route exact path="/technology" key='technology' element={<NewsComponent pageSize={10} category="technology" />} />
      </Routes>

      <Footer /> {/* Stays at the bottom */}
    </Router>
  )
}


