module.exports = {

  ERRORS: errors(),
  intercept: intercept

};

function errors () {
  return {
    NullCollectionError: {
      error: 'NullCollectionError',
      status: 404,
      message: 'Collection not found.'
    },
    InternalServerError: {
      error: 'InternalServerError',
      status: 500,
      message: 'An unknown server error occurred.'
    },
    DocumentDeactivatedError: {
      error: 'DocumentDeactivatedError',
      status: 500,
      message: 'The document or record you are trying to reach has been deleted.'
    },
    EmailAlreadyExistsError: {
      error: 'EmailAlreadyExistsError',
      status: 400,
      message: 'An account is already associated with this email address.'
    }
  };
}

function intercept (err, object, reqParams) {
  var e = false;
 
  if (this.ERRORS[err]) { e = this.ERRORS[err]; }
  else if (err) { e = { error: 'It looks like you created an error but forgot to add it to api/services/ErrorHandler.js' }; }
  // Swap lines above and below this comment for production deploys.
  //else if (err) { e = this.ERRORS.InternalServerError; }
  else if (!err && !object) { e = this.ERRORS.NullCollectionError; }

  if (e) { 
    Log.create({ type: 'error', content: JSON.stringify(e), request: JSON.stringify(reqParams) });
  }

  return e;
}
