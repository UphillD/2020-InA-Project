vCols = [0, 3, 9, 10]
vNames = ["UID", "Title", "Publish Date", "Authors"]
cCols = [3, 8];
cNames = ["Title", "Abstract", "Full Text"];

/* parseCSV function
 * Parses the metadata .csv file row-by-row, passing the results to addRow()
 * Inputs:	file -> the .csv file
 *			drug -> the search query
 * Outputs: Displays the final table in HTML
 */
function parseCSV(file, query) {
	// Create reference to contents of table
	let tableRef = document.getElementById("table").getElementsByTagName("tbody")[0];
	// Clean table of previous data
	// start from index 1 to skip header
	while(tableRef.rows[1]) tableRef.deleteRow(1);
	
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
		}
	});
}

/* addRow function
 * Processes each row
 * if the row contains the search query, 
 * add it to the final table
 */
function addRow(row, tableRef, drug) {
	let occs, ptr;
	let newRow, newCell, newText;
	let i, j;
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
			newText = document.createTextNode(String(row[ptr]).substr(0,50));
			newCell.appendChild(newText);
		}

		containers = "";
		numbers = "";
		for (i = 0; i < occs.length; i++) {
			if (occs[i] > 0) {
				containers += cNames[i] + "; ";
				numbers += String(occs[i]) + "; ";
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
	var drug = document.getElementById('inputForm').value;	
	event.preventDefault();
	array = parseCSV('../data/metadata.csv', drug);
}

// https://stackoverflow.com/questions/4009756/how-to-count-string-occurrence-in-string
function occurrences(string, subString, allowOverlapping) {

    string += "";
    subString += "";
    if (subString.length <= 0) return (string.length + 1);

    var n = 0,
        pos = 0,
        step = allowOverlapping ? 1 : subString.length;

    while (true) {
        pos = string.indexOf(subString, pos);
        if (pos >= 0) {
            ++n;
            pos += step;
        } else break;
    }
    return n;
}

document.getElementById("inputForm")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        mainFun();
    }
});
