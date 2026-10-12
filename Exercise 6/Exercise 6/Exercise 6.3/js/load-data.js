d3.csv("data/Ex6_TVdata_withStar.csv", d => {
  return {
    brand: d.brand,
    model: d.model,
    screenSize: +d.screenSize,
    screenTech: d.screenTech,
    energyConsumption: +d.energyConsumption,
    star: +d.star
  };
}).then(data => {
  // Draw both charts
  drawHistogram(data);
  drawScatterplot(data);

  // Setup interactions
  populateFilters(data);
  createTooltip();
  handleMouseEvents();
}).catch(error => {
  console.error("Error loading CSV file:", error);
});