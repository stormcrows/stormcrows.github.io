import React from 'react';
import * as d3 from 'd3'

import { mapDuration, mapExplicit, mapKey, mapMode, mapProb, stringifyArrayText } from '../mappers'

const ScatterplotChart = ({ id, data, xField, yField, shapeField, colorField, colorGroup, colors, margin, width, height }) => {

  React.useEffect(() => {
    const svg = d3.select(`#${id}`)
      .style("cursor", "hand")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    const xData = data.map(d => d[xField])
    const yData = data.map(d => d[yField])

    const x = d3.scaleLinear()
      .domain([d3.min(xData), d3.max(xData)])
      .range([0, width]);
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))

    svg.append("text")
      .attr("text-anchor", "end")
      .attr("x", width / 2)
      .attr("y", height + 50)
      .text(xField)

    const y = d3.scaleLinear()
      .domain([d3.min(yData), d3.max(yData)])
      .range([height, 0]);
    svg.append("g")
      .call(d3.axisLeft(y));

    svg.append("text")
      .attr("text-anchor", "end")
      .attr("x", x(0) - 50)
      .attr("y", height / 2)
      .text(yField)

    const legendX = 15

    svg.append("circle").attr("cx", legendX).attr("cy", 0).attr("r", 6).style("fill", colors[0])
    svg.append("circle").attr("cx", legendX).attr("cy", 20).attr("r", 6).style("fill", colors[1])
    svg.append("rect").attr("x", legendX - 5).attr("y", 40).attr("width", 10).attr("height", 10).style("fill", "black")
    svg.append("circle").attr("cx", legendX).attr("cy", 64).attr("r", 6).style("fill", "black")

    svg.append("text").attr("x", legendX + 10).attr("y", 4).text("Major mode").style("font-size", "15px").attr("alignment-baseline", "middle")
    svg.append("text").attr("x", legendX + 10).attr("y", 24).text("Minor mode").style("font-size", "15px").attr("alignment-baseline", "middle")
    svg.append("text").attr("x", legendX + 10).attr("y", 50).text("Explicit").style("font-size", "15px").attr("alignment-baseline", "middle")
    svg.append("text").attr("x", legendX + 10).attr("y", 70).text("Non Explicit").style("font-size", "15px").attr("alignment-baseline", "middle")

    const group1Data = data.filter(d => !d[shapeField])
    const circles = svg.append('g')
      .selectAll("circle")
      .data(group1Data)
      .enter().append("circle")
      .attr("opacity", 0)
      .attr("cx", width / 2)
      .attr("cy", height / 2)
      .attr("r", 3)

    const group2Data = data.filter(d => !!d[shapeField])
    const squares = svg.append('g')
      .selectAll("rect")
      .data(group2Data)
      .enter().append("rect")
      .attr("opacity", 0)
      .attr("x", width / 2)
      .attr("y", height / 2)
      .attr("width", 5)
      .attr("height", 5)

    if (colorField) {
      const color = d3.scaleOrdinal()
        .domain(colorGroup)
        .range(colors)

      circles.style("fill", d => color(d[colorField]))
      squares.style("fill", d => color(d[colorField]))
    }

    circles
      .transition()
      .duration(1000)
      .delay((_, i) => i)
      .attr("opacity", "1")
      .attr("cx", d => x(d[xField]))
      .attr("cy", d => y(d[yField]))
    squares
      .transition()
      .duration(1000)
      .delay((_, i) => i * 2)
      .attr("opacity", "1")
      .attr("x", d => x(d[xField]))
      .attr("y", d => y(d[yField]))

    const tooltip = d3.select(`#${id}`)
      .append("div")
      .style("opacity", 0)
      .style("display", "none")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("text-align", "left")
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "1px")
      .style("border-radius", "5px")
      .style("padding", "10px")
      .style("pointer-events", "none")

    const mouseover = function (d) {
      tooltip.style("opacity", 1).style("display", "block")
    }

    const mousemove = function (d) {
      tooltip.html(`${d.name}<br/>
        by ${stringifyArrayText(d.artists)}<br/>
        <br/>
        key: ${mapKey(d.key)}<br/>
        tempo: ${Math.floor(d.tempo)} bpm<br/>
        mode: ${mapMode(d.mode)}<br/>
        explicit: ${mapExplicit(d.explicit)}<br/>
        duration: ${mapDuration(d.duration)}<br/>
        <br/>
        popularity: ${mapProb(d.popularity)}<br/>
        acousticness: ${mapProb(d.acousticness)}<br/>
        danceability: ${mapProb(d.danceability)}<br/>
        energy: ${mapProb(d.energy)}<br/>
        instrumentalness: ${mapProb(d.instrumentalness)}<br/>
        liveness: ${mapProb(d.liveness)}<br/>
        loudness: ${d.loudness} dB<br/>
        speechiness: ${mapProb(d.speechiness)}<br/>
        valence: ${mapProb(d.valence)}`)
        .style("left", (d3.mouse(this)[0] + 225) + "px")
        .style("top", (y(d[yField]) + 80) + "px")
    }

    const mouseleave = function (d) {
      tooltip
        .transition()
        .duration(200)
        .style("opacity", 0)
    }

    circles.on("mouseover", mouseover)
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave)
    squares.on("mouseover", mouseover)
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave)

    return () => d3.select(`#${id}`).select('svg').remove()
  }, [id, data, xField, yField, shapeField, colorField, colorGroup, colors, margin, width, height])

  return (
    <div id={id}></div>
  )
}

export default ScatterplotChart