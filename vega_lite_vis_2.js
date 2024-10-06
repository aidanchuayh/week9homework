// Path to your JSON specification file (could be in the same directory or elsewhere)
var vg_1 = "week10homework.json";

// Function to update the visualization based on the selected year and state (airport)
function updateVisualization(selectedYear, selectedAirport) {
  // Fetch the JSON specification
  fetch(vg_1)
    .then(response => response.json())
    .then(spec => {
      // Update the year for the proportional symbol map (first visualization)
      spec.vconcat[0].layer[1].transform[0].filter = `datum.Year == ${selectedYear}`;

      // Update the airport (state) for the heatmap (second visualization)
      spec.vconcat[1].transform[0].filter = `datum.AIRPORT == '${selectedAirport}'`;

      // Embed the updated visualization
      vegaEmbed('#week10homework', spec).catch(console.error);
    });
}

// Initial rendering with default year and state
updateVisualization(2023, 'MELBOURNE');

// Event listeners for the year and state (airport) selectors
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
