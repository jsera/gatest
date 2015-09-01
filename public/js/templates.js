var Templates = function() {};

(function() {
    var spinner = "<div class=\"full_width spinner\"><img src=\"img/spinner.gif\" /></div>";
    var errorMsg = "<div class=\"full_width error\">{0}</div>";
    var result = "<div class=\"full_width result\"><p><a href=\"http://www.imdb.com/title/{1}/\" class=\"movie_title\">{0}</a><a href=\"#\" class=\"like\">Like!</a></p></div>";
    var details = "<div class=\"full_width details\"><ul></ul></div>";
    var detailsItem = "<li></li>";
    
    // from this SO question: 
    // http://stackoverflow.com/questions/494143/creating-a-new-dom-element-from-an-html-string-using-built-in-dom-methods-or-pro
    function createElement(html) {
        if (html == null) {
            html = "";
        }
        var div = document.createElement("div");
        div.innerHTML = html;
        return div.childNodes;
    }
    
    Templates.prototype.getSpinner = function() {
        var elements = createElement(spinner);
        return elements.item(0);
    };
    
    Templates.prototype.getError = function(errorText) {
        var error = createElement(errorMsg.format(errorText));
        return error.item(0);
    };
    
    Templates.prototype.getResult = function(title, id) {
        var resultElement = createElement(result.format(title, id));
        return resultElement.item(0);
    };
    
    Templates.prototype.getDetails = function() {
        var detailsElement = createElement(details);
        return detailsElement.item(0);
    };
    
    Templates.prototype.getDetailsItem = function() {
        var detailsItemElement = createElement(detailsItem);
        return detailsItemElement.item(0);
    };
    
    Templates.prototype.removeAllChildren = function(node) {
        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
    };
})();