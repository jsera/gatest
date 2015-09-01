// Controller class
var Controller = function() {
    this.init();
    this.resultViews = [];
};

(function() {
    var templates = new Templates();
    var favorites = new Favorites();
    var search = new Search();
    // private members for controller
    var searchBox = document.getElementById("title_search");
    var searchButton = document.getElementById("search_submit");
    var results = document.getElementById("results");
    var resultsHeader = document.getElementById("results_header");
    var favoritesLink = document.getElementsByClassName("favorites_link")[0];
    
    Controller.prototype.init = function() {
        var scope = this;
        searchButton.onclick = addPreventDefault(function() {
            resultsHeader.classList.remove("hidden");
            templates.removeAllChildren(results);
            // Check some error conditions
            if (searchBox.value.length == 0) {
                var error = templates.getError("No query specified!");
                results.appendChild(error);
                return;
            }
            // Show a spinner
            var spinner = templates.getSpinner();
            results.appendChild(spinner);
            // Set it rolling!
            favorites.onLoadError = function() {
                templates.removeAllChildren(results);
                var error = templates.getError("Network problem!");
                results.appendChild(error);
            }
            favorites.onLoadSuccess = function() {
                scope.search();
            };
            favorites.load();
        });
        
        // deal with favorites link
        favoritesLink.onclick = addPreventDefault(function() {
            if (!favorites.hasLoaded) {
                // Show the spinner
                templates.removeAllChildren(results);
                var spinner = templates.getSpinner();
                results.appendChild(spinner);
                // Load us up some favorites!
                favorites.onLoadError = function() {
                    templates.removeAllChildren(results);
                    var error = templates.getError("Network problem!");
                    results.appendChild(error);
                };
                favorites.onLoadSuccess = function() {
                    scope.displayFavorites();
                };
                favorites.load();
            } else {
                scope.displayFavorites();
            }
        });
        
        // preload some images
        var images = [
            "img/spinner.gif"
        ];
        var img;
        for (var i=0;i<images.length;++i) {
            img = new Image();
            img.src = images[i];
        }
    }
    
    Controller.prototype.displayResults = function(response) {
        var resultsList = response.Search;
        if (resultsList) {
            this.resultsViews = [];
            var item;
            var itemView;
            for (var i=0;i<resultsList.length;++i) {
                item = resultsList[i];
                this.resultViews.push(itemElement = new ResultView(this, item));
                results.appendChild(itemElement.getElement());
            }
        } else {
            var error = templates.getError("OMDB gave us a weird response");
            results.appendChild(error);
        }
    };
    
    Controller.prototype.displayFavorites = function() {
        templates.removeAllChildren(results);
        if (favorites.size() > 0) {
            resultsHeader.classList.remove("hidden");
            this.resultsViews = [];
            var l = favorites.size();
            var item;
            var itemView;
            for (var i=0;i<l;++i) {
                item = favorites.getFaveByIndex(i);
                this.resultViews.push(itemElement = new ResultView(this, item));
                results.appendChild(itemElement.getElement());
            }
        } else {
            resultsHeader.classList.remove("hidden");
            var error = templates.getError("No favorites to display!");
            results.appendChild(error);
        }
    }
    
    Controller.prototype.getTemplates = function() {
        return templates;
    };
    
    Controller.prototype.getResultsDiv = function() {
         return results;
    };
    
    Controller.prototype.getFavorites = function() {
        return favorites;
    };
    
    Controller.prototype.getSearch = function() {
        return search;
    };
    
    Controller.prototype.search = function() {
        var scope = this;
        //
        search.onSearchSuccess = function() {
            templates.removeAllChildren(results);
            scope.displayResults(search.response);
        }
        search.onSearchError = function() {
            templates.removeAllChildren(results);
            var error = templates.getError("Network error or something...");
            results.appendChild(error);
        }
        search.search(searchBox.value);
    }
})();

var controller = new Controller();