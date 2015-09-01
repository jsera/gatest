/* 
 * Jquery does a lot of things that replicate features of other languages
 * extend it one of the more useful things, though more because you get default
 * and named arguments, with the added bonus that arguments don't need to be
 * in a specific order.
 * 
 * This doesn't do deep copies because I'm mostly using it for arguments.
 */
function extend(target, object) {
    for (var key in object) {
        if (object.hasOwnProperty(key)) {
            target[key] = object[key];
        }
    }
}

/* 
 * Sprintf, from this SO link:
 * http://stackoverflow.com/questions/610406/javascript-equivalent-to-printf-string-format
 */
if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };
}

/*
 * Just so I can automatically use preventDefault in a generic manner.
 * Optionally, you can use an arbitrary object as the callback's scope.
 */
function addPreventDefault(callback, scope) {
    return function() {
        event.preventDefault();
        callback.apply(scope ? scope : this, arguments);
    };
}