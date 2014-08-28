module.exports = function(req, res, next) {

  if((req.method == 'POST') || (req.method == 'PUT')) {
    var p = req.params.all(),
        blacklist = [ 'id', '_id', 'createdAt', 'updatedAt', 'deletedAt' ];

    blacklist.forEach(function(item) {
      delete p[item];
    });
  }

  return next();
};
