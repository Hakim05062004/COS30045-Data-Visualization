// Load the dataset from the local data folder
d3.csv("data/Data_exercise 5.1-1.csv", d => {
  return {
    Screen_Tech: d.Screen_Tech,
    Energy_Consumption: +d["Mean(Labelled energy consumption (kWh/year))"] || +d.Energy_Consumption
  };
}).then(data => {
  // Sort descending: LED -> OLED -> LCD
  data.sort((a, b) => b.Energy_Consumption - a.Energy_Consumption);

  // Render chart
  drawBarChart(data);
}).catch(error => {
  console.error("Error loading CSV file:", error);
});

const drawBarChart = data => {
  // Inner chart margins and dimensions
  const margin = { top: 40, right: 170, bottom: 25, left: 40 };
  const width = 1000;
  const height = 500;
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // Append SVG container
  const svg = d3.select("#bar-chart")
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`);

  // Create inner chart group with translated margins
  const innerChart = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // Scales
  const xScale = d3.scaleBand()
    .domain(data.map(d => d.Screen_Tech))
    .range([0, innerWidth])
    .padding(0.1);

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.Energy_Consumption)])
    .range([innerHeight, 0]);

  // Bottom Axis (x-axis)
  const bottomAxis = d3.axisBottom(xScale)
    .tickSize(0)
    .tickFormat(d => d.toUpperCase());

  innerChart
    .append("g")
    .attr("transform", `translate(0, ${innerHeight})`)
    .call(bottomAxis);

  // Left Axis (y-axis)
  const leftAxis = d3.axisLeft(yScale);
  innerChart
    .append("g")
    .call(leftAxis);

  // Axis Title / Label
  // Axis Title / Label
innerChart
  .append("text")
  .text("Energy Consumption (kWh)")
  .attr("x", -margin.left) // -40px pulls it fully over the Y-axis numbers
  .attr("y", -20)          // Change from -10 to -20 to push it well above the bar label
  .attr("text-anchor", "start");

  // Draw Bars
  innerChart
    .selectAll(".bar")
    .data(data)
    .join("rect")
    .attr("class", "bar")
    .attr("x", d => xScale(d.Screen_Tech))
    .attr("y", d => yScale(d.Energy_Consumption))
    .attr("width", xScale.bandwidth())
    .attr("height", d => innerHeight - yScale(d.Energy_Consumption))
    .attr("fill", "green");

  // Value Labels above each bar
  innerChart
    .selectAll(".label")
    .data(data)
    .join("text")
    .attr("class", "label")
    .attr("x", d => xScale(d.Screen_Tech) + xScale.bandwidth() / 2)
    .attr("y", d => yScale(d.Energy_Consumption) - 6)
    .attr("text-anchor", "middle")
    .style("font-size", "12px")
    .text(d => `${Math.round(d.Energy_Consumption)} kWh`);
};