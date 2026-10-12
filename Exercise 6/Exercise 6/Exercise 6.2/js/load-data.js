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
  drawHistogram(data);
  populateFilters(data); // Injects filter buttons and click events
}).catch(error => {
  console.error("Error loading CSV:", error);
});