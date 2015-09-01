var DetailsView = function(controller, detailsModel) {
    this.controller = controller;
    this.model = detailsModel;
    this.element = document.createElement("div");
    
    this.init();
};

(function() {
    DetailsView.prototype.init = function() {
        // We're automatically populating a list, but omitting these attributes
        var omit = {
            "Poster": true, 
            "Response": true,
            "imdbID": true,
            "imdbVotes": true,
            "Type": true
        };
        var templates = this.controller.getTemplates();
        this.element = templates.getDetails();
        var ul = this.element.getElementsByTagName("ul")[0];
        var li;
        for (var key in this.model) {
            if (!omit[key] && this.model.hasOwnProperty(key)) {
                li = templates.getDetailsItem();
                li.innerHTML = key+": "+this.model[key];
                ul.appendChild(li);
            }
        }
    };
})();