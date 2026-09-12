# COS30045 – Data Visualisation

# COS30045 Data Visualisation — Exercise 3

## Data Story
* **Audience:** Retail electronics shoppers, everyday home appliance buyers, and store inventory managers.
* **Audience Characteristics:** Non-technical consumers seeking practical guidance on display dimensions and the ongoing electricity running costs associated with different TV panel types.
* **Audience Interests:** 
  * Identifying the most prevalent screen sizes in current production to avoid purchasing obsolete or low-demand dimensions.
  * Comparing how display technologies (LCD, LCD (LED), and OLED) impact annual kilowatt-hour (kWh) power draw across different screen sizes.
* **Communication Channel:** A web-based storyboard paired with in-store digital display badges (shelf tags) positioned beside each television model to enable immediate comparison of yearly operating costs during shopping.

---

## About the Data

### Data Source
The dataset used is the official Australian and New Zealand Equipment Energy Efficiency (E3) Television Energy Rating dataset (`tv_2026_02_15.csv`), which records manufacturer technical specifications, screen dimensions, panel technology, and certified annual energy consumption metrics under standardized testing protocols.

### Data Processing
Data preparation and analysis were completed using the KNIME Analytics Platform:
* **Column Filtering:** Removed extraneous administrative attributes (`Submit_ID`, `Family`, etc.) using the `Column Filter` node to isolate relevant screen metrics.
* **Unit Standardization:** Converted screen dimensions from centimeters into standard retail inches using an `Expression` node to reflect typical consumer purchasing terms.
* **Size Categorization:** Applied a `Rule Engine` node to segment television models into three practical size classes:
  * `small`: $\le 43$ inches ($\le 109$ cm)
  * `medium`: $> 43$ and $\le 65$ inches ($110$ cm – $165$ cm)
  * `large`: $> 65$ inches ($> 165$ cm)
* **Aggregation:** Executed the `Pivot` node to calculate the average annual power consumption (`Mean(energy_consumption)`) grouped by `Screen_Tech` and pivoted across the size categories.
* **Visualization:** Rendered distribution patterns with the `Histogram` node and comparative energy metrics with the `Bar Chart` node.

### Privacy
The dataset contains solely publicly disclosed manufacturer specifications, regulatory compliance figures, and appliance model ratings. It contains zero Personally Identifiable Information (PII), individual consumer data, or confidential commercial transaction records.

### Accuracy and Limitations
* **Accuracy:** Energy figures are certified under standardized laboratory testing protocols (such as fixed operating hours in default picture mode).
* **Limitations:** Laboratory benchmarks do not fully capture extreme variations in real-world consumer behavior, including high-brightness dynamic HDR viewing, ambient room lighting adjustments, high audio volume, or smart standby network usage. Additionally, the dataset is restricted to models certified for the Australia and New Zealand regulatory markets.

### Ethics
Transparent visualization of energy consumption prevents deceptive marketing practices, such as misleading eco-label claims. Providing clear, grouped average energy benchmarks allows consumers to assess long-term operational costs and environmental impact rather than relying solely on upfront retail prices.

---

## AI Declaration
* **Generative AI Tool Used:** Gemini (Google).
* **Tasks Assisted:**
  * Troubleshooting KNIME node pipeline configurations (CSV Reader relative file pathing, Rule Engine expressions, and Pivot settings).
  * Structuring the six-card storyboard narrative to align with pedagogical storytelling standards.
  * Writing semantic HTML/CSS for responsive sticky-note layouts and drafting academic Markdown documentation for the project README.
* **Human Verification:** All KNIME workflow executions, data transformations, chart exports, metric interpretations, and website integrations were independently executed, reviewed, and pushed by the student.



