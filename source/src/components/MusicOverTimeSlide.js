import React from 'react';
import * as d3 from 'd3'

import * as conv from '../conversors'
import StreamGraphChart from './StreamGraphChart';

function MusicOverTimeSlide() {
  const margin = { top: 20, right: 30, bottom: 30, left: 150 }
  const width = 1280 - margin.left - margin.right
  const height = 640 - margin.top - margin.bottom

  const [dataByYear, setDataByYear] = React.useState([])

  React.useEffect(() => {
    d3.csv('data_by_year_trimmed.csv', conv.dataByYear).then(data => {
      data.sort((a, b) => b.year - a.year)

      const years = Object.keys(data.reduce((acc, d) => (acc[d.year] = 1, acc), {}))
      years.sort((a, b) => (+b) - (+a))

      setDataByYear(data)
    }).catch(console.error)
  }, [])

  return (
    <div className="chart-group">
      <h3>Music Over Time</h3>
      {dataByYear.length === 0 ? "Loading..." :
        <>
          <p>This colorful stream graph chart shows how popularity's rise has also brought decline in demand for acousticness,<br />
            instumentalness and demanding more energy in music.</p>
          <p><i>Try to guess which is 'acousticness', 'energy', 'instrumentalness', 'speechiness' and 'popularity',<br />
          then hover over the stream to uncover the name.</i></p>
          <StreamGraphChart
            id="StreamGraphChart"
            data={dataByYear}
            keys={['acousticness', 'energy', 'instrumentalness', 'speechiness', 'popularity']}
            xField="year"
            yDomain={[-1, 1]}
            yDomainColors={['#984ea3', '#ff7f00', '#ffff33', '#a65628', '#f781bf']}
            margin={margin}
            width={width}
            height={height} />
        </>}
    </div>
  )
}

export default MusicOverTimeSlide;
