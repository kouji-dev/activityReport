* special activity: absence/intercontract
* NF: new feature

# Roadmap

-   Display (always by month) :
    -[y]   activities by project
    -   activities by user
    -   pdf (print mode)
-   Selection:
    -[y]   by range
    -[y]   by cell
    -   toggling cell status
-   Modes:
    -   edit:
        -[y]   declare/undeclare all
        -   toggle already selected one
    -   validate:
        -[y]   can select only pending/valid/rejected cells
        -   selection does toggle cell status like (pending => valid, valid => rejected, rejected => valid)
    -   print:
        -   read only
        -   export to pdf/svg
-   Total:
        -[y]   row
        -[y]   col
        -[y]   all
-   Validation:
    -   activities by project: total of each col/day is 1
    -   activities by user: total is calculated based on each cell
-   Submission:
    -   submit only when the report is valid
-   Lock (NF):
    -   ensure no changes if the report is locked
-   Toolbox (NF):
    -   context menu:
        -   select/unselect all
        -   declare/undeclare all
        -   reject/custom all absence
        -   custom actions
    -   global event listener:
        -   bind all menu actions with shortcuts like (ctrl+A => select All)
    -   row:
        -   edit:
            -   declare/undeclare all cells
        -   validate:
            -   approve/reject all cells
