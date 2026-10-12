// Step 1: Create responsive SVG canvas with width margin for labels
const svg = d3.select(".responsive-svg-container")
  .append("svg")
  .attr("viewBox", "0 0 750 650")
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

  const labelMargin = 110; // Left margin for brand text
  const chartWidth = 560;  // Width available for the bars

  // Step 3: Scales
  const xScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.count)])
    .range([0, chartWidth]);

  const yScale = d3.scaleBand()
    .domain(data.map(d => d.brand))
    .range([20, 630])
    .padding(0.2);

  // Step 4: Group (<g>) container for each bar and its labels
  const barGroups = svg.selectAll("g.bar-group")
    .data(data)
    .join("g")
    .attr("class", "bar-group")
    .attr("transform", d => `translate(0, ${yScale(d.brand)})`);

  // Rectangular bar
  barGroups.append("rect")
    .attr("x", labelMargin)
    .attr("y", 0)
    .attr("width", d => xScale(d.count))
    .attr("height", yScale.bandwidth())
    .attr("fill", "#2563eb")
    .attr("rx", 3);

  // Left label (Brand name)
  barGroups.append("text")
    .text(d => d.brand)
    .attr("x", labelMargin - 8)
    .attr("y", yScale.bandwidth() / 2)
    .attr("text-anchor", "end")
    .attr("dominant-baseline", "central")
    .style("font-size", "12px")
    .style("font-family", "sans-serif")
    .style("fill", "#334155");

  // Right label (Count value)
  barGroups.append("text")
    .text(d => d.count)
    .attr("x", d => labelMargin + xScale(d.count) + 6)
    .attr("y", yScale.bandwidth() / 2)
    .attr("dominant-baseline", "central")
    .style("font-size", "11px")
    .style("font-family", "sans-serif")
    .style("font-weight", "bold")
    .style("fill", "#0f172a");

}).catch(err => {
  console.error("Error loading CSV in 4.7:", err);
});