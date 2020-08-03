import React from 'react';
import * as d3 from 'd3'

const BarplotChart = ({ id, margin, width, height, data, xField, yField, xDomain = [0, 100] }) => {

  React.useEffect(() => {
    const svg = d3.select(`#${id}`)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scaleLinear()
      .domain(xDomain)
      .range([0, width]);
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    var y = d3.scaleBand()
      .range([0, height])
      .domain(data.map(d => d[yField]))
      .padding(.1);
    svg.append("g")
      .call(d3.axisLeft(y))

    svg.selectAll("lines")
      .data(data)
      .enter()
      .append("line")
      .attr("x1", d => x(d[xField]))
      .attr("x2", x(0))
      .attr("y1", d => y(d[yField]))
      .attr("y2", d => y(d[yField]))
      .attr("stroke", "grey")

    svg.selectAll("rectangles")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", x(0))
      .attr("y", d => y(d[yField]))
      .attr("width", d => x(d[xField]))
      .attr("height", y.bandwidth())
      .attr("fill", "#69b3a2")

    return () => d3.select(`#${id}`).select('svg').remove()
  }, [id, margin, width, height, data, xField, yField, xDomain])

  return (
    <div id={id}></div>
  )
}

export default BarplotChart