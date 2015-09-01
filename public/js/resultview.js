var ResultView = function(controller, resultModel) {
    this.controller = controller;
    this.model = resultModel;
    this.element = document.createElement("div");
    this.favorited = false;
    
    this.init();
};

(function() {
    ResultView.prototype.init = function() {
        var scope = this;
        var favorites = this.controller.getFavorites();
        var templates = this.controller.getTemplates();
        this.element = templates.getResult(this.model.Title, this.model.imdbID);
        
        var title = this.element.getElementsByClassName("movie_title")[0];
        title.onclick = addPreventDefault(function() {
            console.log(this.model);
        }, scope);
        
        var like = this.element.getElementsByClassName("like")[0];
        this.favorited = favorites.getFaveByID(this.model.imdbID);
        if (this.favorited) {
            // In a production app, you'd never hardcode things like this, instead,
            // you'd get it from a localization dictionary or something similar.
            like.innerHTML = "Liked!";
        }
        like.onclick = addPreventDefault(function() {
            if (!scope.favorited) {
                like.innerHTML = "Liked!";
                scope.favorited = true;
                favorites.favorite(this.model);
            }
        }, scope);
    };
    
    ResultView.prototype.getElement = function() {
        return this.element;
    }
})();