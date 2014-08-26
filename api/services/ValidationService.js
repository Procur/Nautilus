module.exports = {
  isValidPhoneObject: isValidPhoneObject
};

function isValidPhoneObject(phoneObj) {
  var valid = true;

  if (!isValidCountryCode(phoneObj.countryCode)) { valid = false; }
  if (!isValidPhoneNumber(phoneObj.number)) { valid = false; }
  if (!isValidExtension(phoneObj.extension)) { valid = false; }

  return valid;
}

function isValidCountryCode(code) {
  var regex = /^\+[1-9]{1}\d{0,2}$/gi;
  return regex.test(code);
}

function isValidPhoneNumber(number) {
  var regex = /^\d{1}[-\.\u0020\d]{6,16}$/i;
  return regex.test(number);
}

function isValidExtension(ext) {
  if (!ext) { return true; }
  var regex = /^[\w\d]{0,10}$/i;
  return regex.test(ext);
}
