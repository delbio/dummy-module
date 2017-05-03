(function (window, document) {
    'use strict';
    
    function RemoteTemplateLoader()
    {
        var self = this;

        self.loadTemplate = loadTemplate;
        
        /**
         * @param {String} template
         * @param {String} domElementSelector - use this selector to append template
         * @param {function} onLoadCompleteFn 
         */
        function loadTemplate(template, domElementSelector, onLoadCompleteFn)
        {
            var moduleEl = document.getElementById(domElementSelector);
            if (moduleEl === null){
                console.error('Module '+domElementSelector+' registered with template, but template not connected into root html. Skip init module');
                return;
            }
            $('#'+domElementSelector).load(template, onLoadCompleteFn);
        }
    }

    window.RemoteTemplateLoader = RemoteTemplateLoader;

})(window, document);