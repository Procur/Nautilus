/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  login: login,
  logout: logout

};

function login(req, res) {
  var p = req.params.all();

  User.findOne({ email: p.email }, function(err, user) {
    if(user !== undefined) {
      authFunctions.verifyPassword(user.password, p.password, function(err, response) {
        if(response === true) {
          ApiToken.destroy({ user: user.id }, function(err) {
            tokenFunctions.generateToken(function(newToken) {
              ApiToken.findOne({ token: newToken }, function(err, token) {
                if(token === undefined) {
                  ApiToken.create({ token: newToken, user: user.id }, function(err, token) {
                    res.status(200);
                    user.token = token.token;
                    res.json(user);
                  });
                }
              })
            });
          });
        }
        else {
          return res.send(400, 'Password incorrect');
        }
      });
    }
    else {
      return res.send(400, 'Email incorrect');
    }
  });
}

function logout(req, res) {
  var p = req.params.all();
}

function sendResponse(req, res, successStatusCode) {
  return function (err, object) {
    successStatusCode = successStatusCode || 200;
    var e = ErrorHandler.intercept(err, object, req.params.all());

    if (e) {
      return res.status(e.status).json(e);
    }
    else {
      res.status(successStatusCode).json(object);
    }
  };
}

/*
async.waterfall([
  findUser,
  hashSubmittedPassword,
  checkHashAgainstDatabase,
  generateApiToken,
  removeOldToken,
  assignToken
], sendResponse(req, res));

function findUser(callback) {
  User.findOne({ email: p.email }).exec(function(err, user) {
    if(user !== undefined) {
      callback(err, user);
      console.log(user);
    }
    else {
      callback('NullCollectionError', user);
    }
  });
}

function hashSubmittedPassword(user, callback) {
  console.log(p.password);
  authFunctions.hashPassword(p.password, function(err, hash) {
    console.log('dis da hash ' + hash);
    callback(err, user, hash);
  });
}

function checkHashAgainstDatabase(user, hash, callback) {
  //var err = (user.password === hash) ? null : 'InvalidPasswordError';

  authFunctions.verifyPassword(hash, p.password, function(err, response) {
    console.log(response);
    if(response) {
      callback(err, user);
    }
  })

}

function generateApiToken(user, callback) {
  tokenFunctions.generateToken(function(token) {
    console.log(token);
    callback(null, user, token);
  });
}

function removeOldToken(user, token, callback) {
  ApiToken.destroy({ user: user.id }, function(err) {
    callback(err, user, token);
  });
}

function assignToken(user, token, callback) {
  ApiToken.create({ user: user.id, token: token }, function(err, token) {
    console.log(token);
    callback(err, token);
  });
} */