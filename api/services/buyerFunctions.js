module.exports = {

  findBySiblingId: function(supplierId, callback) {
    Supplier.findOne({ id: supplierId }, function(err, supplier) {
      errorHandler.serverError(err, res);
      errorHandler.nullCollection(supplier, res);
      Company.findOne({ id: supplier.company }, function(err, company) {
        errorHandler.serverError(err, res);
        errorHandler.nullCollection(company, res);
        Buyer.findOne({ company: company.id }, function(err, buyer) {
          errorHandler.serverError(err, res);
          errorHandler.nullCollection(buyer, res);
          callback(buyer);
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