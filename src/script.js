// Columns to show in the final table
vCols = [0, 3, 9, 10]
vNames = ["UID", "Title", "Publish Date", "Authors"]
// Columns to check for mentions of the search query
cCols = [3, 8];
cNames = ["Title", "Abstract", "Full Text"];

/* parseCSV function
 * Parses the metadata .csv file row-by-row, passing the results to addRow()
 * Inputs:	file -> the .csv file
 *			query -> the search query
 */
function parseCSV(file, query) {
	// Create reference to contents of table
	let tableRef = document.getElementById("finalTable").getElementsByTagName("tbody")[0];
	// Clean table of previous data
	// start from index 1 to skip header
	while(tableRef.rows[1]) tableRef.deleteRow(1);
	
	document.getElementById("footer").textContent = "Searching...";
	
	// Parse the .csv file
	Papa.parse(file, {
		download: true,
		step: function(row) {
			// Pass each row to the addRow function
			addRow(row.data, tableRef, query);
		},
		complete: function(results) {
			// Print a confirmation message to the console
			console.log("CSV parsing complete.");
			document.getElementById("footer").textContent = "Done.";
		}
	});
}

/* addRow function
 * Processes each row
 * if the row contains the search query, 
 * add it to the final table
 */
function addRow(row, tableRef, drug) {
	let i, j;
	let occs, ptr, text;
	let newRow, newCell, newText;
	let containers, numbers;

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
			ptr = vCols[j];
			newCell = newRow.insertCell(j);
			text = formatAuthors(String(row[ptr]), ptr);
			newText = document.createTextNode(text);
			newCell.appendChild(newText);
		}

		containers = "";
		numbers = "";
		for (i = 0; i < occs.length; i++) {
			if (occs[i] > 0) {
				if (containers.length > 0) containers += "; ";
				containers += cNames[i];
				if (numbers.length > 0) numbers += "; ";
				numbers += String(occs[i]);
			}
		}
		newCell = newRow.insertCell(j);
		newText = document.createTextNode(containers);
		newCell.appendChild(newText);
		j++
		newCell = newRow.insertCell(j);
		newText = document.createTextNode(numbers);
		newCell.appendChild(newText);
	}
}

function findOccurrences(array, string) {
	let occs = [];
	let flag = false;
	let ptr, count;
	let str;
	
	for (let j = 0; j < cCols.length; j++) {
		ptr = cCols[j];
		count = occurrences(String(array[ptr]), string, false);
		if (count > 0) flag = true;
		occs.push(count);
	}
	
	let pmc_path = String(array[16]);
	let pdf_path = String(array[15]);
	if (pmc_path.length != 0) {
		path = "../data/" + pmc_path;
		str = loadFile(path);
		count = occurrences(str, string, false);
		if (count > 0) flag = true;
		occs.push(count);
	} else if (pdf_path.length != 0) {
		path = "../data/" + pmc_path;
		str = loadFile(path);
		count = occurrences(str, string, false);
		if (count > 0) flag = true;
		occs.push(count);
	} else {
		occs.push(0);
	}

	if (flag) return occs;
	else return [];
}

function loadFile(file) {
	var result = null;
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open('GET', file, false);
	xmlhttp.send();
	if (xmlhttp.status == 200) {
		result = xmlhttp.responseText;
	}
	return result;
}

function mainFun() {
	var drug = document.getElementById('input').value;	
	event.preventDefault();
	array = parseCSV('../data/metadata.csv', drug);
}

function formatAuthors(string, ptr) {
	if (ptr == 10) {
		let authors, newString;
		authors = string.split(',');
		newString = authors[0];
		if (authors.length > 2) newString += ", et al";
		return newString;
	}
	return string;
}

vCols = [0, 3, 9, 10]
vNames = ["UID", "Title", "Publish Date", "Authors"]
/* occurrences function
 * return the number of occurrences of a substring within a string
 * taken from: https://stackoverflow.com/questions/4009756/how-to-count-string-occurrence-in-string
 */
function occurrences(string, subString, allowOverlapping) {

	// Typecast
    string += "";
    subString += "";
    // Make sure that the substring has a positive length
	// Not needed for our application
	//if (subString.length <= 0) return (string.length + 1);

    var n = 0,
        pos = 0,
		// Not needed for our application
        //step = allowOverlapping ? 1 : subString.length;
		step = subString.length;

    while (true) {
        pos = string.indexOf(subString, pos);
        if (pos >= 0) {
            ++n;
            pos += step;
        } else break;
    }
    return n;
}

// Event listener for sending the search query by pressing "Enter"
document.getElementById("input")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        mainFun();
    }
});
