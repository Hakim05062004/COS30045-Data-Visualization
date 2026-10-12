// Dimensions and margins matching the exercise specification
const margin = { top: 40, right: 30, bottom: 50, left: 70 };
const width = 800;
const height = 400;
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

// Chart colors
const barColor = "#606464";             // Slate grey for bars
const bodyBackgroundColor = "#ffffff";  // Match content card background for bar gaps

// Scales
const xScale = d3.scaleLinear();
const yScale = d3.scaleLinear();

// Bin generator targeting energyConsumption
const binGenerator = d3.bin()
  .value(d => d.energyConsumption);