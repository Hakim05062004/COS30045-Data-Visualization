const populateFilters = data => {
  // 1. Render Screen Technology Filter Buttons
  d3.select("#filters_screen")
    .selectAll(".filter")
    .data(filters_screen)
    .join("button")
    .attr("class", d => `filter ${d.isActive ? "active" : ""}`)
    .text(d => d.label)
    .on("click", (e, d) => {
      if (!d.isActive) {
        // Toggle isActive flags
        filters_screen.forEach(filter => {
          filter.isActive = d.id === filter.id;
        });

        // Update button visual state using D3 .classed()
        d3.selectAll("#filters_screen .filter")
          .classed("active", filter => filter.id === d.id);

        // Update the histogram bars
        updateHistogram(d.id, data, "screenTech");
      }
    });

  // 2. Render Screen Size Filter Buttons (Extension)
  d3.select("#filters_size")
    .selectAll(".filter")
    .data(filters_size)
    .join("button")
    .attr("class", d => `filter ${d.isActive ? "active" : ""}`)
    .text(d => d.label)
    .on("click", (e, d) => {
      if (!d.isActive) {
        filters_size.forEach(filter => {
          filter.isActive = d.id === filter.id;
        });

        d3.selectAll("#filters_size .filter")
          .classed("active", filter => filter.id === d.id);

        updateHistogram(d.id, data, "screenSize");
      }
    });
};

// 3. Update Histogram Function with Smooth Transitions
const updateHistogram = (filterId, data, filterType = "screenTech") => {
  // Step 1: Filter data
  let updatedData;
  if (filterId === "all") {
    updatedData = data;
  } else {
    updatedData = data.filter(tv => tv[filterType] === filterId);
  }

  // Step 2: Recalculate bins using the shared generator
  const updatedBins = binGenerator(updatedData);

  // Step 3: Transition existing rectangles to new frequencies
  d3.selectAll("#histogram rect")
    .data(updatedBins)
    .transition()
    .duration(500)
    .ease(d3.easeCubicInOut)
    .attr("y", d => yScale(d.length))
    .attr("height", d => innerHeight - yScale(d.length));
};