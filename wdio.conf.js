const { execSync } = require('child_process');

exports.config = {
    runner: 'local',
    specs: ['./test/specs/**/*.js'],
    maxInstances: 1,

    capabilities: [{
        maxInstances: 1,
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: [
                '--user-data-dir=C:\\Users\\tanwa\\chrome-test-profile',
                '--profile-directory=Default',
                '--disable-notifications'
            ],
            prefs: {
                'credentials_enable_service': false,
                'profile.password_manager_enabled': false
            }
        }
    }],

    logLevel: 'info',
    bail: 0,
    baseUrl: 'https://www.saucedemo.com',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    // services: ['chromedriver'],

    framework: 'mocha',
    reporters: ['spec'],

    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },

    onPrepare: function () {
        try {
            execSync('taskkill /F /IM chrome.exe /T');
            console.log('✅ Closed all Chrome instances');
        } catch (e) {
            console.warn('⚠️ Could not close Chrome:', e.message);
        }
    }
}
