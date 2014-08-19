module.exports = {

  findByApiToken: function(apitoken, callback) {
    ApiToken.findOne({ token: apitoken }, function(err, token) {
      errorHandler.serverError(err, res);
      errorHandler.nullCollection(token, res);
      User.findOne({ id: token.user }, function(err, user) {
        errorHandler.serverError(err, res);
        errorHandler.nullCollection(user, res);
        callback(user);
      });
    });
  },

  findByEmail: function(email, callback) {
    User.findOne({ email: email }, function(err, user) {
      errorHandler.qc(err, res, user);
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