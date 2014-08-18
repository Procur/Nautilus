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

function intercept (err, object) {
  var e = false;
 
  if (this.ERRORS[err]) { e = this.ERRORS[err]; }
  else if (err) { e = this.ERRORS.InternalServerError; }
  else if (!err && !object) { e = this.ERRORS.NullCollectionError; }

  if (e) { 
    Log.create({ type: 'error', content: JSON.stringify(e) });
  }

  return e;
}
