/*
 * This file includes any event listeners and the main function that calls everything else.
 */
 
// Event listener
// Calls the main function if "Enter" is pressed
document.getElementById("input")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        main();
    }
});

/* 
 * the starter function
 * gets the query from the input form and begins the parsing
 * Called by pressing the button or "Enter"
 * Calls parseCSV (script.js)
 */
function main() {
	var query = document.getElementById('input').value;	
	event.preventDefault();
	parseCSV('../data/metadata_min.csv', query);
}
