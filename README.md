# DBE - Database editor
###### Platform for editing the data directly in the tables.You can edit tables, add new rows, delete rows, export to CSV, etc.

**Link to the demo:**
[**DBE App**](https://logivations.github.io/DBE/ "DBE App")

------------
![DBE](https://www.logivations.com/img_general/dbe-screenshots/dbe-01.png "DBE")

------------
##### The following actions can be performed in a table:
### Actions:
- **Select all rows** — selects all rows from current page.
- **Reload**— reloads current page.
- **Get link filtered by selected rows** — creates link with filter by selected rows.
- **Delete** — deletes the selected row.
- **Add / Clone** — adds a new row / clones the selected row. New window will appear in both cases in which you can change needed information and save changes by pressing on 'Save' button.
- **Switch view** — shows single record screen and navigation between records.
- **Filter** — filters the table. All created filters are saved and can be edited or applied many times.
- **Hide columns filter** — hides the specified columns. All created filters are saved and can be edited or applied many times.
- **Table sort** — table sorting.
- **Show child records** — shows referenced tables for all or selected rows.
- **Show parent records** — shows referenced tables which are represented by foreign keys in current table for all or selected rows.
- **Massive update** — updates all values in the specified column.
- **Export** — exports the table in .csv format.
- **Import** — imports the table in .csv format.
- **Page size** — shows the amount of rows per page. The max number of records per page can be 5000.
- **Calculate row quantity** — shows total amount of rows in a table.
- **Compare tables** — compares two tables of different layouts or within one layout.
- **Show case pack schema** — allows to open Show case pack schema page for selected orders or internal orders.
- **Table action** — executes specific action in table. Select table action from drop-down list and click on the button Execute. Some table actions may have dependent parameters and as a result of the performed table action can be a link to another table.
- **Select as master** — synchronizes scroll, navigation and DBE filter actions with open slave tabs of same table.
- **Select as parent table** — shows referenced rows of child tables in other opened tabs for the current table.
- **Foreign key field** — for editing this field click on the foreign key cell. New window with referenced table is opened. For editing data unfilter referenced table, select the row and click on save button. If there should not be any value, then open referenced table and do not select any row and click on save button.

------------


## DBE features showcase
### 1. Single Record Screen
It represents data from the table in different way. New window is shown and it shows only 1 record per page. New records can be added/cloned in single record screen, fields can be edited. All function are available in this mode, like filters, sorting, massive update etc.

![](https://raw.githubusercontent.com/logivations/DBE/main/readme.images/dbe-08.png)

------------
### 2. Compare Table
This function compares two tables considering considering selected parameters.

![](https://raw.githubusercontent.com/logivations/DBE/main/readme.images/dbe-02.png)

------------
### 3. Screen builder

![](https://raw.githubusercontent.com/logivations/DBE/main/readme.images/dbe-03.png)

------------
### 4. Show child/parent records
**Show child records**
This function opens a list of all tables and reports that are related to current table. It means that a column from current tables is a foreign key in related tables.

![](https://raw.githubusercontent.com/logivations/DBE/main/readme.images/dbe-06.png)

**Show parent records**
This function opens a list of all tables and reports that are related to current table.

![](https://raw.githubusercontent.com/logivations/DBE/main/readme.images/dbe-07.png)

------------
### 5. Export/import
**Export**
The functionality is used for saving DBE tables in csv files.

![](https://raw.githubusercontent.com/logivations/DBE/main/readme.images/dbe-04.png)

**Import**
The functionality is used for easily loading data into DBE tables from csv files.

![](https://raw.githubusercontent.com/logivations/DBE/main/readme.images/dbe-05.png)

------------

##### BONUS
## Dark mode
![](https://raw.githubusercontent.com/logivations/DBE/main/readme.images/dbe-10.png)

------------
## Contact us for more details

**Logivations GmbH**

Riesstrasse 16
80992 Munich, Germany

[+49 89 21909750](tel:+49 89 21909750)
[info@logivations.com](mailto:info@logivations.com)
------------