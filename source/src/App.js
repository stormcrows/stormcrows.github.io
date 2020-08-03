import React from 'react';

import './App.css';
import MusicOverTimeSlide from './components/MusicOverTimeSlide'
import TopArtists from './components/TopArtists'
import SongsScatterSlide from './components/SongsScatterSlide'

function App() {
  const slides = [
    <MusicOverTimeSlide />,
    <TopArtists />,
    <SongsScatterSlide />
  ]

  const DEFAULT_SIDE = 1
  const [slide, setSlide] = React.useState(slides[DEFAULT_SIDE])
  const [slideNum, setSlideNum] = React.useState(DEFAULT_SIDE)

  const gotoSlide = nextSlide => {
    setSlide(slides[nextSlide])
    setSlideNum(nextSlide)
  }

  const nextSlide = () => gotoSlide(Math.min(slideNum + 1, slides.length))
  const prevSlide = () => gotoSlide(Math.max(slideNum - 1, 0))

  return (
    <div id="App" className="App">
      <div>
        <h1>Spotify Dataset Explorer</h1>
        by Rafal Tytyk [<a href="mailto:rtytyk2@illinois.edu">rtytyk2</a>] <br />
        An Interactive Slideshow for CS-498 Data Visualisation<br />
        Summer 2020<br />
        <br />
        data source: <a href="https://www.kaggle.com/yamaerenay/spotify-dataset-19212020-160k-tracks">Spotify Dataset on Kaggle</a><br />
        license: <a href="https://cdla.io/sharing-1-0/">Community Data License Agreement - Sharing - Version 1.0</a><br />
        <br />
      </div>
      <button onClick={
        () => gotoSlide(0)}>Music over Time</button>
        | <button onClick={() => gotoSlide(1)}>Top Artists</button>
        | <button onClick={() => gotoSlide(2)}>Song Scatter</button>
      <br />
      <br />
      {slideNum > 0 ? <button onClick={prevSlide}>Prev</button> : null}
      {slideNum < slides.length - 1 ? <button onClick={nextSlide}>Next</button> : null}
      {slide}
    </div >
  )
}

export default App;
