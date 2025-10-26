# Changelog

## v2.20.0

-   **Features**:
    -   Added a settings menu with options for language selection and help.
    -   Implemented internationalization with support for English and Italian.
    -   Added `Ctrl+A` keyboard shortcut to select all points on the chart.
    -   The settings menu includes a "Select All" option.
-   **Changes**:
    -   The behavior of the left and right arrow keys has been updated. They now align the temperature of all selected points to the value of the leftmost or rightmost selected point, respectively.
-   **Upgrades**:
    -   Upgraded the component from LitElement to Lit 3 for improved performance and modern features.
-   **Bug Fixes**:
    -   Resolved issues where changing the language did not update all parts of the UI correctly (including chart axis labels and the card title).
    -   Fixed the visibility of the hamburger menu icon.
    -   Ensured keyboard shortcuts are active immediately after the card loads by setting the initial focus.
-   **Documentation**:
    -   Updated the `README.md` to reflect all new features, keyboard shortcuts, and behavior changes.
