// Path to your JSON specification file
var vg_1 = "week10homework.json";

// Function to update the visualization based on the selected year and airport
function updateVisualization(selectedYear, selectedAirport) {
  // Log the selected values for debugging
  console.log("Selected Year: ", selectedYear);
  console.log("Selected Airport: ", selectedAirport);

  // Fetch the JSON specification
  fetch(vg_1)
    .then(response => response.json())
    .then(spec => {
      // Update the year filter for the proportional symbol map (first visualization)
      spec.vconcat[0].layer[1].transform[0].filter = `datum.Year == ${selectedYear}`;

      // Log the updated filter for debugging
      console.log("Updated Year Filter: ", spec.vconcat[0].layer[1].transform[0].filter);

      // Update the airport filter for the heatmap (second visualization)
      spec.vconcat[1].transform[0].filter = `datum.AIRPORT == '${selectedAirport}'`;

      // Log the updated filter for debugging
      console.log("Updated Airport Filter: ", spec.vconcat[1].transform[0].filter);

      // Embed the updated specification
      vegaEmbed('#week10homework', spec).catch(console.error);
    });
}

// Initial rendering with default year (2023) and airport (MELBOURNE)
updateVisualization(2023, 'MELBOURNE');

// Event listeners for year and airport selection
document.getElementById('year-selector').addEventListener('change', function () {
  var selectedYear = this.value;
  var selectedAirport = document.getElementById('airport-selector').value;
  updateVisualization(selectedYear, selectedAirport);
});

document.getElementById('airport-selector').addEventListener('change', function () {
  var selectedYear = document.getElementById('year-selector').value;
  var selectedAirport = this.value;
  updateVisualization(selectedYear, selectedAirport);
});
