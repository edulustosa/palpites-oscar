function sendUserPredictions(req, res) {
  const predictions = req.session.user.predictions;
  predictions ? res.json(predictions) : res.json(null);
}

module.exports = sendUserPredictions;
