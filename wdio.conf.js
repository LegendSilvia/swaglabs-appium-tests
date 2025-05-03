const capabilities = [{
    browserName: 'chrome',
    'goog:chromeOptions': {
        args: [
            '--disable-blink-features=AutomationControlled',
            '--disable-features=AutofillServerCommunication,PasswordManagerEnabled',
            '--no-default-browser-check',
            '--no-first-run',
            '--reduce-security-for-testing',
            '--disable-notifications',
            '--disable-popup-blocking',
            '--disable-save-password-bubble',
            '--user-data-dir=C:/tmp/test-profile'
        ],
        prefs: {
            'profile.password_manager_enabled': false,
            'credentials_enable_service': false
        }
    }
}];

console.log('🚀 Launching with capabilities:\n', JSON.stringify(capabilities, null, 2));

exports.config = {
    //
    // Runner Configuration
    runner: 'local',

    //
    // Specify Test Files
    specs: [
        './test/specs/**/*.js'
    ],

    //
    // Capabilities
    maxInstances: 1,
    capabilities: capabilities,

    //
    // Test Config
    logLevel: 'info',
    bail: 0,
    baseUrl: 'http://localhost',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,

    //
    // Services
    services: [],

    //
    // Framework
    framework: 'mocha',
    reporters: ['spec'],

    //
    // Hooks (optional)
    before: function () {
        console.log('🧪 Tests starting...');
    }
};
