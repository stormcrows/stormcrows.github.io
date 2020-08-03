import React from 'react';
import * as d3 from 'd3'

import * as conv from '../conversors'
import ScatterplotChart from './ScatterplotChart';

function SongsScatterSlide() {
  const margin = { top: 20, right: 30, bottom: 70, left: 200 }
  const width = 1280 - margin.left - margin.right
  const height = 640 - margin.top - margin.bottom

  const songFeatures = [
    'key',
    'acousticness',
    'danceability',
    'duration',
    'energy',
    'instrumentalness',
    'liveness',
    'loudness',
    'popularity',
    'speechiness',
    'tempo',
    'valence'
  ]

  const [dataBySong, setDataBySong] = React.useState([])

  const [years, setYears] = React.useState([])
  const [selectedYear, setSelectedYear] = React.useState(2020)

  const [selectedSongs, setSelectedSongs] = React.useState([])

  const [xAxisFeature, setXAxisFeature] = React.useState("tempo")
  const [yAxisFeature, setYAxisFeature] = React.useState("danceability")

  const onYearSelect = React.useCallback(e => {
    const year = +e.target.value
    setSelectedSongs(dataBySong.filter(d => d.year === year))
  }, [dataBySong])

  const onXAxisSelect = e => setXAxisFeature(e.target.value)
  const onYAxisSelect = e => setYAxisFeature(e.target.value)

  React.useEffect(() => {
    d3.csv('data_by_year_trimmed.csv', conv.dataByYear).then(data => {
      data.sort((a, b) => b.year - a.year)

      const years = Object.keys(data.reduce((acc, d) => (acc[d.year] = 1, acc), {}))
      years.sort((a, b) => (+b) - (+a))

      setYears(years)
      setSelectedYear(years[0])
    }).catch(console.error)
  }, [])

  React.useEffect(() => {
    d3.csv('data_by_song.csv', conv.dataBySong).then(data => {
      setDataBySong(data)
      setSelectedSongs(data.filter(d => d.year === selectedYear))
    }).catch(console.error)
  }, [])

  return (
    <div className="chart-group">
      <h3>Song Scatter</h3>
      <p>Each point represents a song and each has it's story!</p>
      {selectedSongs.length === 0 ? "Loading..." :
        <>
          <p><i>Hover over the points to explore {selectedSongs.length} songs of by:</i></p>
          <div>
            Year: <select onChange={onYearSelect}>{years.map(year => (<option key={year}>{year}</option>))}</select>&nbsp;
            X-Axis: <select onChange={onXAxisSelect} value={xAxisFeature}>{songFeatures.map(feature => (<option key={feature}>{feature}</option>))}</select>&nbsp;
            Y-Axis: <select onChange={onYAxisSelect} value={yAxisFeature}>{songFeatures.map(feature => (<option key={feature}>{feature}</option>))}</select>
          </div>
          <ScatterplotChart
            id="ScatterplotChart"
            data={selectedSongs}
            xField={xAxisFeature}
            yField={yAxisFeature}
            colorField={"mode"}
            shapeField={"explicit"}
            colorGroup={[1, 0]}
            colors={["#F8766D", "#00BA38"]}
            margin={margin}
            width={width}
            height={height}
          />
        </>}
    </div>
  )
}

export default SongsScatterSlide;
