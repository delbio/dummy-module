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
            ],
        });
        window.app = new AppShellModule(appShellConfig);
        window.app.start();
}
