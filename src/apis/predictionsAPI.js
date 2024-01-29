function sendUserPredictions(req, res) {
  const predictions = req.session.user.predictions;
  res.json(predictions);
}

module.exports = sendUserPredictions;
