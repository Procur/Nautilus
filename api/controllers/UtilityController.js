/**
 * UtilityController
 *
 * @description :: Server-side logic for managing utilities
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  heartbeat : heartbeat,
  docs      : docs
};

function heartbeat (req, res) {
  var payload = { 
    application: 'Procur API v1',
    version: 'v1 (alpha)',
    documentation: 'http://api.procur.com/docs'
  };

  res.ok(payload);
}

function docs (req, res) {
  var url = 'https://www.procur.com/';
  if (req.wantsJSON) { return res.json({ docs: url }); }
  return res.redirect(url);
}
