module.exports = function(err, req, res, rext) {
  console.log(err.message);
  res.status(500).send("Server Internal error");
};
