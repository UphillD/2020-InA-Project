# COVID-02 Project
## Internet & Applications

![status: working](status-working-green.svg)

![module: papaparse](module-papaparse-9cf.svg)
![module: highcharts](module-highcharts-9cf.svg)

This is my personal project for the course "Internet & Applications" [3.5.63.8]

## Table of Contents

1. [Goal](#Goal)
2. [Submission](#Submission)
3. [Problem Formulation](#Problem-Formulation)
5. [Implementation Specifics](#Implementation-Specifics)
4. [Project Tree](#Project-Tree)
6. [Final Notes](#Final-Notes)

## Goal

Parse the [Cord-19 dataset](https://www.semanticscholar.org/cord19); 
find and display all articles that mention a specific drug, provided by the user.

## Submission

1. Implementation Code (This repo)
2. A Readme (This file)
3. [Presentation](Presentation.pptx)
4. [Demonstration video](https://youtu.be/a5997tzicfo)

## Problem Formulation:

1. Receive search query (drug name) from user.

2. Parse the .csv file row-by-row using *PapaParse*. Each row contains the metadata for a separate article.

3. Search through the row and the linked pmc/pdf files for mentions of the drug.

4. If no mentions were found, discard the row.

5. Repeat 3-4 for all rows.

6. Serve the final table.

7. (Optional) Serve a complimentary Articles per Year chart using *Highcharts*

## Implementation Specifics

The folder */data* contains the files of the cord-19 dataset. 
These files need to be downloaded and extracted so that they resemble the directory structure below.

The implementation is based on JavaScript code, which has been split into 4 files for easier viewing:

1. **script.js**: 
contains the 3 functions that perform the main implementation of the project. 

2. **main.js**: 
contains an event listener and the main function that is called by the page elements and, in turn, calls everything else.

3. **macros.js**:
contains several smaller functions that are utilized by the main program.

4. **chart.js**:
contains the code that creates the *Articles per Year* chart at the end of each search.

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

## Final Notes

Used [Papaparse](https://www.papaparse.com/) for the .csv parsing.

Used [Highcharts](https://www.highcharts.com/) for the charts.

*Everything is written in pure JavaScript, no jQuery.*

*The project was run and tested on an Apache server.*

[⇯ Back to Top](#covid-02-project)