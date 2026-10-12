// Load the dataset
d3.csv("data/ARE_Spot_Prices.csv", d => {
  return {
    year: +d.Year, // Convert year to number[cite: 22]
    averagePrice: +d["Average Price (notTas-Snowy)"] // Convert average price to number[cite: 21, 22]
  };
}).then(data => {
  console.log("Spot price data:", data);
  drawLineChart(data);
}).catch(error => {
  console.error("Error loading CSV:", error);
});

const drawLineChart = data => {
  // Dimensions and margins matching 5.1[cite: 8]
  const margin = { top: 40, right: 170, bottom: 25, left: 40 };
  const width = 1000;
  const height = 500;
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // Append SVG[cite: 8]
  const svg = d3.select("#line-chart")
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`);

  // Inner group translated by margins[cite: 8]
  const innerChart = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // Scales
  const xScale = d3.scaleLinear()
    .domain(d3.extent(data, d => d.year))
    .range([0, innerWidth]);

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.averagePrice) * 1.05])
    .range([innerHeight, 0]);

  // X-Axis (format ticks as integer years)[cite: 23]
  const bottomAxis = d3.axisBottom(xScale)
    .tickFormat(d3.format("d"));

  innerChart
    .append("g")
    .attr("transform", `translate(0, ${innerHeight})`)
    .call(bottomAxis);

  // Y-Axis
  const leftAxis = d3.axisLeft(yScale);
  innerChart
    .append("g")
    .call(leftAxis);

  // Y-Axis Label
  innerChart
    .append("text")
    .text("Average Price ($ per mWh)")
    .attr("x", -margin.left)
    .attr("y", -15)
    .attr("text-anchor", "start");

  // 1. Shaded Area Generator & Path (Rendered first so it sits behind the line)
  const areaGenerator = d3.area()
    .x(d => xScale(d.year))
    .y0(innerHeight)
    .y1(d => yScale(d.averagePrice))
    .curve(d3.curveStepAfter);

  innerChart
    .append("path")
    .attr("d", areaGenerator(data))
    .attr("fill", "rgba(0, 128, 0, 0.15)"); // Light translucent green fill

  // 2. Line Generator with Stepped Curve[cite: 26, 28]
  const lineGenerator = d3.line()
    .x(d => xScale(d.year))
    .y(d => yScale(d.averagePrice))
    .curve(d3.curveStepAfter);

  // Draw the Line Path[cite: 27]
  innerChart
    .append("path")
    .attr("d", lineGenerator(data))
    .attr("fill", "none")
    .attr("stroke", "green")
    .attr("stroke-width", 2);

  // 3. Draw Scatter Plot Points (Green circles)
  innerChart
    .selectAll(".point")
    .data(data)
    .join("circle")
    .attr("class", "point")
    .attr("cx", d => xScale(d.year))
    .attr("cy", d => yScale(d.averagePrice))
    .attr("r", 4)
    .attr("fill", "green");

  // 4. End-Point Label next to the last data point[cite: 28]
  const lastDataPoint = data[data.length - 1];
  innerChart
    .append("text")
    .attr("x", xScale(lastDataPoint.year) + 10)
    .attr("y", yScale(lastDataPoint.averagePrice))
    .attr("alignment-baseline", "middle")
    .style("font-size", "12px")
    .style("fill", "green")
    .text("Average Price ($ per mWh)");
};