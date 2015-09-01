// Search class
var Search = function() {
    this.onSearchSuccess = function(searchObj) {};
    this.onSearchError = function(searchObj) {};
    this.response = {};
    this.method = "GET";
};

(function() {
    // private members for Search
    var searchurl = "http://www.omdbapi.com/?s={0}";
    
    function loadHandler(request) {
        if (request.status == 200) {
            this.response = JSON.parse(request.response);
            this.onSearchSuccess(this);
        } else {
            this.onSearchError(this);
        }
    }
    
    // Gets called for network errors.
    function errorHandler(request) {
        this.onSearchError(this);
    }
    
    // public members for search
    Search.prototype.search = function(term) {
        var scope = this;
        var rq = new XMLHttpRequest();
        var url = searchurl.format(term);
        rq.addEventListener("load", function() {loadHandler.apply(scope, [rq])});
        rq.addEventListener("error", function() {errorHandler.apply(scope, [rq])});
        rq.open(this.method, searchurl.format(term), true);
        rq.send();
    }
})();
