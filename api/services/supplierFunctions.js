module.exports = {

  findBySiblingId: function(buyerId, callback) {
    Buyer.findOne({ id: buyerId }, function(err, buyer) {
      errorHandler.serverError(err, res);
      errorHandler.nullCollection(buyer, res);
      Company.findOne({ id: buyer.company }, function(err, company) {
        errorHandler.serverError(err, res);
        errorHandler.nullCollection(company, res);
        Supplier.findOne({ company: company.id }, function(err, supplier) {
          errorHandler.serverError(err, res);
          errorHandler.nullCollection(supplier, res);
          callback(supplier);
        });
      });
    });
  },

  findByCompanyId: function(companyId, callback) {

  },

  findByCompanyHandle: function(handle, callback) {

  },

  findByUserId: function(userId, callback) {

  },

  findByUserEmail: function(email, callback) {

  }
};