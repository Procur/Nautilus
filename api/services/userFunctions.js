module.exports = {

  findByApiToken: function(apitoken, callback) {
    ApiToken.findOne({ token: apitoken }, function(err, token) {
      if(err) { return res.send(500); }
      User.findOne({ id: token.user }, function(err, user) {
        if(err) { return res.send(500); }
        callback(user);
      });
    });
  },

  findByEmail: function(email, callback) {
    User.findOne({ email: email }, function(err, user) {
      //errorHandler.qc(err, res, user);

      callback(user);
    });
  },

  findbyemail2: function(email) {
    User.findOne({ email: email }, function(err, user) {
      errorHandler.qc(err, res, user);
      return(user);
    })
  }
};