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
  // 1. Render charts
  drawHistogram(data);
  drawScatterplot(data);

  // 2. Set up interactions
  populateFilters(data);
  createTooltip();
  handleMouseEvents();
}).catch(error => {
  console.error("Error loading CSV file:", error);
});