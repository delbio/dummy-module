"use strict";

window.onload = function () {
        var appShellConfig = new window.AppShellModuleConfig({
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
}
