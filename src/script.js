/*
 * This file includes the main implementation.
 */
 
/*
 * Global Variables
 */
// Columns to serve in the final table
var vCols = [0, 3, 9, 10]
var vNames = ["UID", "Title", "Publish Date", "Authors"]
// Columns to search through for the query
var cCols = [3, 8];
var cNames = ["Title", "Abstract", "Full Text"];

// Array to store occurrences per year
var years;
// Variables for measuring execution time
var tstart, tfin;
// Counters for articles parsed and articles where the query was found
var cntrparsed, cntrkept;

/* 
 * parseCSV function
 * Parses the metadata .csv file row-by-row, passing the results to addRow()
 *
 * Inputs:	file -> the .csv file
 *			query -> the search query
 *
 * Called by main (main.js)
 * Calls addRow in every step,
 *   &   createChart when it's finished
 */
function parseCSV(file, query) {
	
	// Start timer
	tstart = performance.now();
	
	// Initialize the counters
	cntrparsed = 0
	cntrkept = 0
	
	// Initialize years array
	years = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
	
	// Create reference to contents of table
	let tableRef = document.getElementById("finalTable").getElementsByTagName("tbody")[0];
	// Clean table of previous data
	// start from index 1 to skip header
	while(tableRef.rows[0]) tableRef.deleteRow(0);
	
	// Show progress
	document.getElementById("results").textContent = "Searching...";
	
	// Parse the .csv file with PapaParse
	Papa.parse(file, {
		download: true,
		step: function(row) {
			// Display progress in the footer
			document.getElementById("results").textContent = String(cntrparsed - 1) + " articles done. Searching..."
			// Increment the counter of articles
			cntrparsed++;
			// Pass each row to the addRow function
			addRow(row.data, tableRef, query);
		},
		complete: function(results) {
			// Stop timer
			tfin = performance.now();
			// Display the results in the footer
			document.getElementById("results").textContent = "Parsed " + String(cntrparsed - 1) + " articles and found " + String(cntrkept) + " results in " + (tfin - tstart)/1000 + " seconds";
			// Create the 'articles per year' chart (chart.js)
			createChart(query, years);
		}
	});
}

/* 
 * addRow function
 * Processes each row, checks if it includes the query, counts occurrences, displays row in table
 *
 * Inputs: row -> the row in question
 *         tableRef -> a reference to the current point of the displayed table
 *         query -> the query to look for
 * Outputs: the row on the table
 *
 * Called by parseCSV for each row,
 * Calls the findOccurrences function and some macros
 */
function addRow(row, tableRef, drug) {
	let i, j;
	let occs, ptr, text;
	let newRow;
	let mentioned, mentions;
	let year;

	// Skip header row
	if (row[0] == "cord_uid") {
		return;
	}
	
	// Check if row contains the search query
	occs = findOccurrences(row, drug);
	
	if (occs.length != 0) {
	
		// Create new row
		newRow = tableRef.insertRow();
		// Add the elements one by one
		for (j = 0; j < vCols.length; j++) {
			// Pointer to the wanted columns
			ptr = vCols[j];
			// Cases for year storing & author name formatting
			// If on "Publish Date" column, Store year for chart
			if (ptr == 9) {
				text = String(row[ptr]);
				year = String(row[ptr]).split('-')[0] - 2000;
				if (year >= 0) {
					years[year] += 1;
				}
			// If on "Authors" column, format the text accoringly
			} else if (ptr == 10) {
				text = formatAuthors(String(row[ptr]), ptr);
			// Otherwise, simply get the text
			} else {
				text = String(row[ptr]);
			}
			// Insert the new element to the row
			insertCell(j, newRow, text);
		}

		// Initialize the variables covering the number of occurences of our query
		// and the locations where it was found
		mentioned = "";
		mentions = "";
		// Go through the occurrences array, sum up and sort the occurences
		for (i = 0; i < occs.length; i++) {
			if (occs[i] > 0) {
				// extra check to add separator if required
				if (mentioned.length > 0) mentioned += "; ";
				// Add the section on the string
				mentioned += cNames[i];
				if (mentions.length > 0) mentions += "; ";
				// Add the # of occurrences on the string
				mentions += String(occs[i]);
			}
		}
		// Insert the occurence details on the row
		insertCell(j, newRow, mentioned);
		j++
		insertCell(j, newRow, mentions);
	}
}

/*
 * findOccurences function
 * Finds the occurences of the search query in the article (csv row, full text)
 *
 * Inputs: array -> the csv row
 *         string -> the search query
 * Outputs: an array of occurences
 *
 * Called by addRow
 * Calls several macros (macros.js)
 */
function findOccurrences(array, string) {
	// Array of occurrences
	let occsArray = [];
	// Flag for found query
	let flag = false;
	let ptr, count;
	let str;

	// Go through the designated columns
	for (let j = 0; j < cCols.length; j++) {
		ptr = cCols[j];
		// Count the number of occurences in current column
		count = occurrences(String(array[ptr]), string);
		// If the query was found at least once, set the flag to true
		if (count > 0) flag = true;
		// Store the count
		occsArray.push(count);
	}
	
	
	// Go through the full articles and look for the query
	let pmc_path = String(array[16]);
	let pdf_path = String(array[15]);
	let path = "";
	// Check if PMC file exists
	// The Cord-19 FAQ mentions that the PMCs are preferable to PDFs.
	if (pmc_path.length != 0) {
		path = "../data/" + pmc_path;
	// If no PMC was found, look for a PDF
	} else if (pdf_path.length != 0) {
		path = "../data/" + pmc_path;
	}

	// If any of the files was found, look through it
	if (path.length > 0) {
		// Load the full text as a string
		str = loadFile(path);
		// Look through the string for the query
		// in the same exact way as we did for the columns
		count = occurrences(str, string);
		// If the query was found at least once, set the flag to true
		if (count > 0) flag = true;
		occsArray.push(count);
	// Otherwise, store 0
	} else {
		occsArray.push(0);
	}
	
	
	// If flag is true, the query was found at least once in the article
	if (flag) {
		// Increment the counter for articles kept
		cntrkept++;
		// Return the occurrence array
		return occsArray;
	// Otherwise, return an empty array
	} else return [];
}
