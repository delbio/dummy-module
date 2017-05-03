(function (window, document) {
    'use strict';
    
    function GlobalVariableTemplateLoader(store)
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
            var templateData = getTemplateData(template);
            if ( templateData === undefined ) { 
                console.error('Template '+template+' not found');
                return;
            }
            $('#'+domElementSelector).html( $.parseHTML( templateData ) );
            onLoadCompleteFn();
        }

        function getTemplateData(template)
        {
            if (!(template in store)) {
                return undefined;
            }
            return store[template];
        }


    }

    window.GlobalVariableTemplateLoader = GlobalVariableTemplateLoader;

})(window, document);