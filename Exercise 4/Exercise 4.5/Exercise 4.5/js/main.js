// Step 1: Create a 500x500 SVG canvas
const svg = d3.select(".responsive-svg-container")
  .append("svg")
  .attr("viewBox", "0 0 500 500")
  .style("border", "1px solid #cbd5e1")
  .style("background", "#ffffff");

// Step 2: Load and process the CSV
d3.csv("../data/tvBrandCount.csv", d => {
  return {
    brand: d.brand || d.Brand,
    count: +(d.count || d.Count)
  };
}).then(data => {
  // Sort descending
  data.sort((a, b) => b.count - a.count);

  // Step 3: Define Scales
  // Linear scale maps count range (0 to ~1100) to pixel width (0 to 500)
  const xScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.count)])
    .range([0, 500]);

  // Band scale maps brand categories evenly across vertical height (0 to 500)
  const yScale = d3.scaleBand()
    .domain(data.map(d => d.brand))
    .range([0, 500])
    .padding(0.15);

  // Step 4: Render rectangles with scales applied
  svg.selectAll("rect")
    .data(data)
    .join("rect")
    .attr("x", 0)
    .attr("y", d => yScale(d.brand))
    .attr("width", d => xScale(d.count))
    .attr("height", yScale.bandwidth())
    .attr("fill", "#2563eb");

}).catch(err => {
  console.error("Error loading CSV in 4.6:", err);
});