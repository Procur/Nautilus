var Sails = require('sails');
var app;

before(function(done) {
    // Lift Sails and store the app reference
    Sails.lift({

        // turn down the log level so we can view the test results
        log: {
            level: 'error'
        },

        // send test database connections down if needed
        

    }, function(err, sails) {
        // save reference for teardown function
        app = sails;
        done(err);
    });
});


// After Function
after(function(done) {
    app.lower(done);
});