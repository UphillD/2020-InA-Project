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
4. [Demonstration video](https://youtu.be/ZlfYjq8xDwo)

## Problem Formulation:

1. Receive search query (drug name) from user.

2. Use a *Java Servlet* to pass the query to javascript code.

3. Parse the .csv file row-by-row using *PapaParse*. Each row contains the metadata for a separate article.

4. Search through the row and the linked pmc/pdf files for mentions of the drug.

5. If no mentions were found, discard the row.

6. Repeat 3-4 for all rows.

7. Serve the final table.

8. (Optional) Serve a complimentary Articles per Year chart using *Highcharts*

## Implementation Specifics

The folder */data* contains the files of the cord-19 dataset. 
These files need to be downloaded and extracted so that they resemble the directory structure below.

The .java file must be compiled before running:

    cd WEB-INF/classes/searchServlet.java
    javac searchServlet.java

The implementation is based on JavaScript code, which has been split into 3 files for easier viewing:

1. **script.js**: 
contains the 3 functions that perform the main implementation of the project. 

2. **macros.js**:
contains several smaller functions that are utilized by the main program.

3. **chart.js**:
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
    │    ├ script.js
    │    └ style.css
	├ WEB-INF
	│    ├ classes
	│    │    ├ searchServlet.class
	│    │    └ searchServlet.java
	│    └ web.xml
    └ index.jsp

## Final Notes

Used [Papaparse](https://www.papaparse.com/) for the .csv parsing.

Used [Highcharts](https://www.highcharts.com/) for the charts.

*A Java servlet was used for calling the javascript functions.*

*Everything is written in pure JavaScript, no jQuery.*

*The project was run and tested on an Apache Tomcat server.*

[⇯ Back to Top](#covid-02-project)