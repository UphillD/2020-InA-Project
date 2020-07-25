# COVID-02 Project - Internet & Applications

This is my personal project for the course "Internet & Applications" [3.5.63.8]

## Goal:

Find and return all articles in the [Cord-19 dataset](https://www.semanticscholar.org/cord19) that mention a specific drug.

## Formulation:

1. Receive search query (drug name) from user.
2. Parse the .csv file row-by-row using *PapaParse*.
3. Search the row for mentions of the drug.
4. Search the linked pmc/pdf full text files for mentions of the drug.
5. If no mentions were found, discard the row.
6. Repeat 2-5 for all rows.
7. Serve the final table.

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
    │    ├ papaparse.js
    │    ├ script.js
    │    └ style.css
    └ index.html

## Libraries/Modules used:

[Papaparse](https://www.papaparse.com/)
