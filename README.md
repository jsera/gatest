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

# Class definitions

Class definitions are of the form:

var ClassName = function() {
    // constructor
}

(function() {
    // define private members and public methods here.
})();

JavaScript's closures provide a fun way of simulating the public/private visibility keywords of other languages.
This gives you a way of insulating parts of your classes from people who might misuse them.

The drawback is that your private variables are more like private static variables. In other words, there's only
one instance of that variable that all instances of your class share.

# Things to improve

- You can only favorite things, not unfavorite. That backend wasn't written with unfavoriting in mind.
- You can't hide details once you show them. Optimally, you should only be viewing one details panel at a time.
- The code surrounding generating XMLHttpRequests can be DRYer.
- favoriting things is fragile, and could use better error handling.
- Strings are hardcoded in various places around the app. A real app would have some sort of localization dictionary.
