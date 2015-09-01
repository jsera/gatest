var Favorites = function() {
    this.favesByIndex = [];
    this.favesByID = {};
    // load handlers
    this.onLoadSuccess = function() {};
    this.onLoadError = function() {};
    this.response = [];
    //
    this.hasLoaded = false;
};

(function() {
    var favoritesUrl = "favorites/";
    
    // These could probably be refactored into something else to keep things DRY.
    function loadHandler(request) {
        if (request.status == 200) {
            this.hasLoaded = true;
            this.response = JSON.parse(request.response);
            parseFavorites.apply(this);
            this.onLoadSuccess(this);
        } else {
            this.onLoadError(this);
        }
    }
    
    // Gets called for network errors.
    function errorHandler(request) {
        this.onLoadError(this);
    }
    
    function parseFavorites() {
        this.favesByIndex = this.response;
        var fave;
        for (var i=0;i<this.favesByIndex.length;++i) {
            fave = this.favesByIndex[i];
            this.favesByID[fave.imdbID] = fave;
        }
    }
    
    Favorites.prototype.load = function() {
        var scope = this;
        var rq = new XMLHttpRequest();
        rq.addEventListener("load", function() {loadHandler.apply(scope, [rq])});
        rq.addEventListener("error", function() {errorHandler.apply(scope, [rq])});
        rq.open("GET", favoritesUrl, true);
        rq.send();
    };
    
    Favorites.prototype.getFaveByIndex = function(index) {
        return this.favesByIndex[index];
    };
    
    Favorites.prototype.getFaveByID = function(ID) {
        return this.favesByID[ID];
    };
    
    Favorites.prototype.size = function() {
        return this.favesByIndex.length;
    }
    
    Favorites.prototype.favorite = function(resultModel) {
        if (!this.favesByID[resultModel.imdbID]) {
            var rq = new XMLHttpRequest();
            // I don't care as much about success or failure here, but if I really
            // wanted to make this robust, I'd build in some sort of retry policy
            // The effect of this is that someone could favorite something, go to another
            // page, then come back and find their movie hasn't been favorited.
            rq.open("POST", favoritesUrl, true);
            rq.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            rq.send(JSON.stringify(resultModel));
            // add the model to favorites
            this.favesByIndex.push(resultModel);
            this.favesByID[resultModel.imdbID] = resultModel;
        }
    }
})();