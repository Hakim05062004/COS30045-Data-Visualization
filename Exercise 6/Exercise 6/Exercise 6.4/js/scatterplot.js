const drawScatterplot = data => {
  // 1. Configure Domains
  xScaleS
    .domain([0, d3.max(data, d => d.star) * 1.05])
    .range([0, innerWidth])
    .nice();

  yScaleS
    .domain([0, d3.max(data, d => d.energyConsumption) * 1.05])
    .range([innerHeight, 0])
    .nice();

  // Set categorical colors using schemeCategory10
  colorScale
    .domain(data.map(d => d.screenTech))
    .range(d3.schemeCategory10);

  // 2. Append Main SVG
  const svg = d3.select("#scatterplot")
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`);

  // 3. Assign innerChartS defined in shared-constants.js
  innerChartS = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // 4. Draw Scatter Points
  innerChartS
    .selectAll(".scatter-circle")
    .data(data)
    .join("circle")
    .attr("class", "scatter-circle")
    .attr("cx", d => xScaleS(d.star))
    .attr("cy", d => yScaleS(d.energyConsumption))
    .attr("r", 4.5)
    .attr("fill", d => colorScale(d.screenTech))
    .attr("opacity", 0.5);

  // 5. Bottom Axis (Star Rating)
  const bottomAxis = d3.axisBottom(xScaleS);
  innerChartS
    .append("g")
    .attr("transform", `translate(0, ${innerHeight})`)
    .call(bottomAxis);

  innerChartS
    .append("text")
    .attr("class", "axis-label")
    .attr("x", innerWidth)
    .attr("y", innerHeight + 40)
    .attr("text-anchor", "end")
    .text("Star Rating");

  // 6. Left Axis (Labeled Energy Consumption)
  const leftAxis = d3.axisLeft(yScaleS);
  innerChartS
    .append("g")
    .call(leftAxis);

  innerChartS
    .append("text")
    .attr("class", "axis-label")
    .attr("x", -margin.left + 10)
    .attr("y", -15)
    .attr("text-anchor", "start")
    .text("Labeled Energy Consumption (kWh/year)");

  // 7. Add Legend for the color scale
  const legend = svg
    .append("g")
    .attr("transform", `translate(${width - 100}, ${margin.top})`);

  colorScale.domain().forEach((screenTech, i) => {
    const legendRow = legend
      .append("g")
      .attr("transform", `translate(0, ${i * 20})`);

    // Color box
    legendRow.append("rect")
      .attr("width", 10)
      .attr("height", 10)
      .attr("fill", colorScale(screenTech));

    // Label text
    legendRow.append("text")
      .attr("x", 20)
      .attr("y", 10)
      .attr("text-anchor", "start")
      .style("alignment-baseline", "middle")
      .style("font-size", "14px")
      .text(screenTech);
  });
};