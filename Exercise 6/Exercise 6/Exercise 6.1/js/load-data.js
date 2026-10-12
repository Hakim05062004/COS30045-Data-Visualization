console.log("load-data.js has started running!");

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
  console.log("SUCCESS: CSV loaded rows:", data.length);
  drawHistogram(data);
  populateFilters(data);
}).catch(error => {
  console.error("FAIL: Could not load CSV! Check file path:", error);
});