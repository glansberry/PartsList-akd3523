# Austin-Healey 3000 Parts List

A browsable copy of the factory service parts lists for the Austin-Healey 3000, series BJ7 and BJ8.
Originally found at https://lbcdigital.com/bmc_publications/akd3523/  ,copied here and I resolved some problems for modern browsers, and local hosting.

- **AKD 3523** is the mechanical parts list. The catalog opens here.
- **AKD 3524** is the body details list. Choose **Body Details** at the bottom of the menu.

Each section has a parts table and, on most pages, a plate (the exploded drawing).

## Access it from github:
visit https://glansberry.github.io/PartsList-akd3523/

## Open it locally

You can download the files and browse locally on your computer, or a self-service web browser
Open `index.html` in Chrome, Firefox, Edge, or Safari. No install is required.

The window has three areas:

- **Left:** the section menu
- **Upper right:** the parts table
- **Lower right:** the plate

A thin bar along the bottom holds the controls.

## Find a part

1. Click a heading in the menu, such as **Engine**.
2. Click a sub-heading, such as **Connecting Rods**.
3. Read the part number in the table. The matching plate is in the lower pane.

The first page of a section is a table of contents. It lists page and plate numbers and does not include a drawing. Open one of the pages under it to see the plate.

**Body Details** at the bottom of the menu switches to AKD 3524. The same style of menu is used there.

## Plates

Click the drawing to zoom in on that spot. Other clicks:

- **Shift-click** zooms out
- **Ctrl-click** recentres on that spot without zooming
- **RESET ILLUSTRATION** on the bottom bar returns the plate to its starting size

Scroll the lower pane if the whole plate does not fit.

## Bottom bar

| Control | What it does |
| --- | --- |
| MENU | Hides or shows the menu. Red means the menu is hidden. |
| PARTS | Gives the parts table the full right-hand side. |
| ILLUS | Gives the plate the full right-hand side. |
| SEARCH | Searches part numbers and descriptions. Click **EXIT SEARCH** to return to the menu. |
| PRINT | Opens print options under the menu. |
| CONFIG | Sets menu width, plate size, and whether those choices are saved. |
| HELP | Opens the built-in help. |

Saved settings are stored in the browser. They apply the next time you open the catalog in that same browser.

## Search

Part numbers are stored without spaces. For `AEC 1337 03`, type `AEC133703`.

The search is not case sensitive. Wording is British, as in the original books (`tyre`, `carburetter`, and so on). A `+` before a word means that word must appear. A `-` before a word excludes it. `*` and `?` are not wildcards.

## If the bottom bar does nothing

Opening `index.html` directly is enough for the menu, the tables, and the plates. The buttons that resize the panes need the folder to be served as a small local website:

```bash
python3 -m http.server 8080
```

Then go to [http://localhost:8080/](http://localhost:8080/). Stop the server with Ctrl-C when you are finished.
