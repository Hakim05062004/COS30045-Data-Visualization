// Step 1: Create responsive SVG canvas
const svg = d3.select(".responsive-svg-container")
  .append("svg")
  .attr("viewBox", "0 0 1200 800")
  .style("border", "1px solid #cbd5e1")
  .style("background", "#ffffff");

// Step 2: Load CSV data
d3.csv("../data/tvBrandCount.csv", d => {
  return {
    brand: d.brand || d.Brand,
    count: +(d.count || d.Count)
  };
}).then(data => {
  // Sort descending
  data.sort((a, b) => b.count - a.count);

  // Step 3: Bind data to rect elements using raw unscaled pixel counts
  svg.selectAll("rect")
    .data(data)
    .join("rect")
    .attr("x", 0)
    .attr("y", (d, i) => i * 28 + 10)
    .attr("width", d => d.count)
    .attr("height", 20)
    .attr("fill", "#2563eb");

}).catch(err => {
  console.error("Error loading CSV in 4.5:", err);
});