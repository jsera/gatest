# gatest
Coding test for General Assembly

# Basic Structure

- Controller: controller.js
-- There's only one controller for the page
- Models: Using the JSON responses from OMDb
- Data Layer:
-- search.js
--- Handles communication with OMDb
-- favorites.js
--- Handles communication with the Node.js backend
- View Layer
-- templates.js
--- creates HTML elements, and has utility methods for dealing with DOM manipulation
-- resultsview.js
--- Displays a result
-- detailsview.js
--- Displays details about a result

misc.js contains miscellaneous utility functions.

