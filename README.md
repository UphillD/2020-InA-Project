# COVID-02 Project - Internet & Applications

## Goal:
Find and return all articles in the Cord-19 dataset that mention a specific drug.

## Formulation:
1. Receive input (drug) from user
2. Parse through the .csv file using *PapaParse*
3. Look for the drug while parsing, discard all entries that do not contain it.
4. Return table with articles

## Libraries:

[Papaparse](https://www.papaparse.com/)

[jQuery](https://jquery.com/)

*Note:
So far I've avoided jQuery, but it will probably be required later*
