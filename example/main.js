"use strict";

window.onload = function () {
        var appShellConfig = new window.AppShellModuleConfig({
            lang: 'en',
            debug: true,
            modules: [
                {
                    name: 'module-id',
                    constructor: window.ModuleIdComponent,
                    args: {
                        'consoleMessage': 'ModuleIdComponent Init ;)'
                    }
                },
                {
                    name: 'other-module-id',
                    constructor: window.OtherModuleComponent,
                    args: {
                        'consoleMessage': 'OtherModuleComponent Init ;)'
                    }
                },
            ],
        });
        window.app = new AppShellModule(appShellConfig);
        window.app.start();

        testExternalModuleIteration();
}

function testExternalModuleIteration()
{
    var button = document.createElement('button');
    button.innerHTML = "module custom action";
    button.addEventListener('click', function(event){
        event.preventDefault();
        var module = window.app.getModule('module-id');
        module.customAction();
    });
    var container = document.getElementById('module-id-actions');
    container.appendChild(button);
}
