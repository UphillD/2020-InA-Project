# Internet & Applications
## COVID-02 Project

![status: working](status-working-green.svg)

![module: papaparse](module-papaparse-9cf.svg)
![module: highcharts](module-highcharts-9cf.svg)

This is my personal project for the course "Internet & Applications" [3.5.63.8]

## Goal

Parse the [Cord-19 dataset](https://www.semanticscholar.org/cord19); 
find and display all articles that mention a specific drug, provided by the user.

## Submission

1. Implementation Code (This repo)

2. A Readme (This file)

3. Presentation (WIP)

4. [Demonstration video](https://youtu.be/a5997tzicfo)

## Problem Formulation:

1. Receive search query (drug name) from user.

2. Parse the .csv file row-by-row using *PapaParse*. Each row contains the metadata for a separate article.

3. Search through the row and the linked pmc/pdf files for mentions of the drug.

4. If no mentions were found, discard the row.

5. Repeat 3-4 for all rows.

6. Serve the final table.

7. (Optional) Serve a complimentary Articles per Year chart using *Highcharts*

## Project Tree

    $root
    ├ data
    │    ├ metadata.csv
    │    └ document_parses 
    │         ├ pdf_json
    │         │    └ *.json
    │         └ pmc_json
    │              └ *.xml.json
    ├ src
	│    ├ chart.js
    │    ├ macros.js
    │    ├ main.js
    │    ├ script.js
    │    └ style.css
    └ index.html

## Implementation Specifics

The folder */data* contains the files of the cord-19 dataset. 
These files need to be downloaded and extracted so that they resemble the above directory structure.

The implementation is based on JavaScript code, which has been split into 4 files for easier viewing.

Some info on the files:

1. **script.js**: 
contains the 3 functions that perform the main implementation of the project. 

2. **main.js**: 
contains an event listener and the main function that is called by the page elements and, in turn, calls everything else.

3. **macros.js**:
contains several smaller functions that are utilized by the main program.

4. **chart.js**:
contains the code that creates the *Articles per Year* chart at the end of each search.

## Modules used

[Papaparse](https://www.papaparse.com/) for the .csv parsing

[Highcharts](https://www.highcharts.com/) for the charts

## Final Notes

*Everything is written in pure JavaScript, no jQuery.*

*The project was run and tested on an Apache server.*

