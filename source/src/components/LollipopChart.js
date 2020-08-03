import React from 'react';
import * as d3 from 'd3'

const LollipopChart = ({ id, margin, width, height, data, xField, yField, xDomain = [0, 100] }) => {

  React.useEffect(() => {
    const svg = d3.select(`#${id}`)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const x = d3.scaleLinear()
      .domain(xDomain)
      .range([0, width]);
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    const y = d3.scaleBand()
      .range([0, height])
      .domain(data.map(d => d[yField]))
      .padding(.1);
    svg.append("g")
      .call(d3.axisLeft(y))

    const lines = svg.selectAll("lines")
      .data(data)
      .enter()
      .append("line")

      .attr("x1", x(0))
      .attr("x2", x(0))
      .attr("y1", d => y(d[yField]))
      .attr("y2", d => y(d[yField]))
      .attr("stroke", "grey")

    const circles = svg.selectAll("circles")
      .data(data)
      .enter()
      .append("circle")
      .attr("r", "5")
      .style("fill", "#69b3a2")
      .attr("stroke", "black")
      .attr("cx", x(0))
      .attr("cy", d => y(d[yField]))
      .attr("y1", d => y(d[yField]))
      .attr("y2", d => y(d[yField]))

    const mouseleave = function (d) {
      tooltip
        .transition()
        .duration(200)
        .style("opacity", 0)
    }

    const duration = 2000

    lines
      .transition()
      .duration(duration)
      .delay((_, i) => i * 3)
      .attr("x1", d => x(d[xField]))

    circles
      .transition()
      .duration(duration)
      .delay((_, i) => i * 3)
      .attr("cx", d => x(d[xField]))

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
      tooltip.html(`Popularity of ${d.artists}: ${d.popularity}`)
        .style("left", (d3.mouse(this)[0] + 200) + "px")
        .style("top", (y(d[yField]) + 400) + "px")
    }

    circles.on("mouseover", mouseover)
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave)
    lines.on("mouseover", mouseover)
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave)

    return () => d3.select(`#${id}`).select('svg').remove()
  }, [id, margin, width, height, data, xField, yField, xDomain])

  return (
    <div id={id}></div>
  )
}

export default LollipopChart