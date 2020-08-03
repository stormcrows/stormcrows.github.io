import React from 'react';
import * as d3 from 'd3'

function StreamGraphChart({
  id,
  data,
  keys = [],
  xField,
  yDomain = [],
  yDomainColors = [],
  margin,
  width,
  height
}) {
  React.useEffect(() => {
    const svg = d3.select(`#${id}`)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const x = d3.scaleLinear()
      .domain(d3.extent(data, d => d[xField]))
      .range([0, width]);
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).tickFormat(d3.format("d")).ticks(20));

    const y = d3.scaleLinear()
      .domain(yDomain)
      .range([height, 0]);
    svg.append("g")
      .call(d3.axisLeft(y));

    const color = d3.scaleOrdinal()
      .domain(keys)
      .range(yDomainColors)

    const stackedData = d3.stack()
      .offset(d3.stackOffsetSilhouette)
      .keys(keys)
      (data)

    const toolTip = svg
      .append("text")
      .attr("x", 0)
      .attr("y", 0)
      .style("opacity", 0)
      .style("font-size", 17)

    const mouseover = function () {
      toolTip.style("opacity", 1)
      d3.selectAll(".area").style("opacity", .2)
      d3.select(this)
        .style("stroke", "black")
        .style("opacity", 1)
    }

    const mousemove = function (_, i) {
      toolTip.text(keys[i])
    }

    const mouseleave = function () {
      toolTip.style("opacity", 0)
      d3.selectAll(".area").style("opacity", 1).style("stroke", "none")
    }

    const layers = svg
      .selectAll("layers")
      .data(stackedData)
      .enter()
      .append("path")
      .attr("class", "area")
      .style("fill", d => color(d.key))
      .attr("d", d3.area()
        .x(d => x(d.data[xField]))
        .y0(d => y(d[0]))
        .y1(d => y(d[1])))
      .on("mouseover", mouseover)
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave)

    const duration = 1000

    layers
      .attr("opacity", 0)
      .transition()
      .duration(duration)
      .delay((_, i) => i * 500)
      .attr("opacity", 1)

    return () => d3.select(`#${id}`).select('svg').remove()
  }, [id, data, margin, width, height, keys, xField, yDomain, yDomainColors])

  return (
    <div id={id}></div>
  )
}

export default StreamGraphChart