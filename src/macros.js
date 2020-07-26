/*
 * This file includes several helper functions for easier viewing.
 */
 
// inserts a new cell with the wanted text to the current row of the table
function insertCell(j, newRow, text) { 
	let newCell = newRow.insertCell(j);
	let newText = document.createTextNode(text);
	newCell.appendChild(newText);
}

// loads a text file to a string
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

// formats a string containing the Authors of a paper
function formatAuthors(string, ptr) {
	let newString;
	string = string.split(',');
	newString = string[0];
	if (string.length > 2) newString += ", et al";
	return newString;
}

/* 
 * occurrences function
 * return the number of occurrences of a substring within a string
 * adapted from: https://stackoverflow.com/questions/4009756/how-to-count-string-occurrence-in-string
 */
function occurrences(string, subString) {

	// Typecast
    string += "";
    subString += "";

    var n = 0,
        pos = 0,
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
