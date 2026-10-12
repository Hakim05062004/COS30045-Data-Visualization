// Load the dataset
d3.csv("data/Data_exercise 5.3.csv", d => {
  return {
    Screensize_Category: d.Screensize_Category, //[cite: 36, 38]
    Count: +d.Count // Convert count string to number[cite: 36, 39]
  };
}).then(data => {
  console.log("Donut chart data successfully loaded:", data);
  drawDonutChart(data);
}).catch(error => {
  console.error("Failed to load CSV:", error);
});

const drawDonutChart = data => {
  // Dimensions and radius calculation[cite: 37]
  const width = 1000; //[cite: 37]
  const height = 500; //[cite: 37]
  const radius = Math.min(width, height) / 2 - 20; //[cite: 37]

  // Color Scale[cite: 38]
  const color = d3.scaleOrdinal() //[cite: 38]
    .domain(data.map(d => d.Screensize_Category)) //[cite: 38]
    .range(d3.schemeSet2); //[cite: 38]

  // Pie angles generator (maintaining original order)[cite: 39]
  const pie = d3.pie() //[cite: 39]
    .value(d => d.Count) //[cite: 39]
    .sort(null); //[cite: 39]

  // Arc Generator[cite: 40]
  const arcGenerator = d3.arc() //[cite: 40]
    .innerRadius(radius * 0.6) // 60% inner radius for the donut hole[cite: 40]
    .outerRadius(radius * 1); //[cite: 40]

  // Main SVG[cite: 41]
  const svg = d3.select("#donut-chart") //[cite: 41]
    .append("svg") //[cite: 41]
    .attr("viewBox", `0 0 ${width} ${height}`); //[cite: 41]

  // Centered inner group[cite: 41]
  const innerChart = svg //[cite: 41]
    .append("g") //[cite: 41]
    .attr("transform", `translate(${width / 2}, ${height / 2})`); //[cite: 41]

  // Append Donut Slices[cite: 42]
  innerChart
    .selectAll("path") //[cite: 42]
    .data(pie(data)) //[cite: 42]
    .join("path") //[cite: 42]
    .attr("d", arcGenerator) //[cite: 42]
    .attr("fill", d => color(d.data.Screensize_Category)) //[cite: 42]
    .attr("stroke", "white") //[cite: 42]
    .attr("stroke-width", 2); //[cite: 42]

  // Append Slice Labels[cite: 43]
  innerChart
    .selectAll(".slice-label")
    .data(pie(data))
    .join("text")
    .attr("class", "slice-label")
    .attr("transform", d => `translate(${arcGenerator.centroid(d)})`)
    .attr("text-anchor", "middle")
    .attr("dy", "0.35em")
    .style("font-size", "14px")
    .style("fill", "#111")
    .text(d => d.data.Screensize_Category); //[cite: 43]
};