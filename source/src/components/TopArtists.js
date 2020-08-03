import React from 'react';
import * as d3 from 'd3'

import * as conv from '../conversors'
import LollipopChart from './LollipopChart';

function TopArtists() {
  const margin = { top: 20, right: 30, bottom: 30, left: 150 }
  const width = 1280 - margin.left - margin.right
  const height = 640 - margin.top - margin.bottom
  const topPopularLimit = 50

  const [dataWithGenres, setDataWithGenres] = React.useState([])

  const [genres, setGenres] = React.useState([])
  const [selectedGenre, setSelectedGenre] = React.useState("all")

  const [selectedArtists, setSelectedArtists] = React.useState([])

  const onGenreSelect = React.useCallback(e => {
    const genre = e.target.value
    setSelectedGenre(genre)
    const data = genre === "all"
      ? dataWithGenres
      : dataWithGenres.filter(d => d.genres.includes(genre))
    setSelectedArtists(data.slice(0, topPopularLimit))
  }, [dataWithGenres])

  React.useEffect(() => {
    d3.csv('data_w_genres_trimmed.csv', conv.dataWithGenres).then(data => {
      data.sort((a, b) => b.popularity - a.popularity)
      setDataWithGenres(data)
      setSelectedArtists(data.slice(0, topPopularLimit))
    }).catch(console.error)
  }, [])

  React.useEffect(() => {
    d3.csv('data_by_genres_trimmed.csv', conv.dataByGenres).then(data => setGenres(['all', ...data])).catch(console.error)
  }, [])

  return (
    <div className="chart-group">
      <h3>Top Artists</h3>
      {dataWithGenres.length === 0 || genres.length === 0 ? "Loading..." :
        <>
          <p>See {topPopularLimit} popular artists by {genres.length} genres.</p>
          <p><i>Choose your favourite genre or explore something new.</i>
            <br />
            genre: <select onChange={onGenreSelect} value={selectedGenre}>{genres.map(genre => (<option key={genre}>{genre}</option>))}</select>
          </p>
          <LollipopChart
            id="LollipopChart"
            data={selectedArtists}
            xDomain={[0, 100]}
            xField="popularity"
            yField="artists"
            margin={margin}
            width={width}
            height={height} />
        </>}
    </div >
  )
}

export default TopArtists;
