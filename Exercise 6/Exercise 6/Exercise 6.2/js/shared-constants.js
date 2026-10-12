// Dimensions and margins
const margin = { top: 40, right: 30, bottom: 50, left: 70 };
const width = 800;
const height = 400;
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

// Colors
const barColor = "#606464";
const bodyBackgroundColor = "#ffffff";

// Scales
const xScale = d3.scaleLinear();
const yScale = d3.scaleLinear();

// Shared Bin generator
const binGenerator = d3.bin()
  .value(d => d.energyConsumption);

// Screen Technology Filter Configurations
const filters_screen = [
  { id: "all", label: "All", isActive: true },
  { id: "LED", label: "LED", isActive: false },
  { id: "LCD", label: "LCD", isActive: false },
  { id: "OLED", label: "OLED", isActive: false }
];

// Screen Size Filter Configurations (Extension)
const filters_size = [
  { id: "all", label: "All Sizes", isActive: true },
  { id: 24, label: "24\"", isActive: false },
  { id: 32, label: "32\"", isActive: false },
  { id: 55, label: "55\"", isActive: false },
  { id: 65, label: "65\"", isActive: false },
  { id: 98, label: "98\"", isActive: false }
];