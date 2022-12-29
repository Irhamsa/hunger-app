// Karma configuration
// Generated on Fri Jul 03 2020 20:15:52 GMT+0700 (Western Indonesia Time)
module.exports = function(config) {
  config.set({
    /* Kode lainnya disembunyikan */

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['ChromeHeadless'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,
  });
};
