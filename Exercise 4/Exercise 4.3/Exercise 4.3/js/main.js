const filePath = "../data/tvBrandCount.csv";

d3.csv(filePath).then(rawRows => {
  if (!rawRows || rawRows.length === 0) {
    throw new Error("CSV file is empty.");
  }

  // Detect column names automatically (handles 'Brand' vs 'brand', etc.)
  const sample = rawRows[0];
  const keys = Object.keys(sample);
  const brandKey = keys.find(k => /brand/i.test(k)) || keys[0];
  const countKey = keys.find(k => /count|qty|sales/i.test(k)) || keys[1];

  // Map to clean numbers
  const data = rawRows.map(d => ({
    brand: d[brandKey],
    count: +d[countKey] || 0
  }));

  // Sort descending
  data.sort((a, b) => b.count - a.count);

  const total = data.length;
  const max = d3.max(data, d => d.count);
  const min = d3.min(data, d => d.count);

  const container = document.querySelector("#data-summary") || document.querySelector(".content-box");
  container.innerHTML = `
    <div style="font-family: sans-serif; line-height: 1.6; color: #1e293b;">
      <p style="color: #16a34a; font-weight: bold; margin-bottom: 12px;">Data Loaded &amp; Processed Successfully</p>
      <p><strong>Total Brands:</strong> ${total}</p>
      <p><strong>Maximum TV Count:</strong> ${max} (${data[0].brand})</p>
      <p><strong>Minimum TV Count:</strong> ${min} (${data[data.length - 1].brand})</p>
      <hr style="margin: 15px 0; border: none; border-top: 1px solid #cbd5e1;">
      <p style="font-weight: bold; margin-bottom: 6px;">Top 5 Brands (Sorted Descending):</p>
      <ol style="margin-left: 20px;">
        ${data.slice(0, 5).map(item => `<li>${item.brand}: <strong>${item.count}</strong></li>`).join("")}
      </ol>
    </div>
  `;
}).catch(err => {
  const container = document.querySelector("#data-summary") || document.querySelector(".content-box");
  container.innerHTML = `
    <div style="color: #dc2626; font-family: monospace;">
      <p><strong>Failed to load CSV file:</strong></p>
      <p>Attempted path: <code>${filePath}</code></p>
      <p>Error details: ${err.message || err}</p>
    </div>
  `;
  console.error("CSV Load Error:", err);
});