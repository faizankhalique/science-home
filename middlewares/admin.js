const config = require("config");
module.exports = function(req, res, next) {
  if (!config.get("authorization")) return next();
  if (!req.user.isAdmin)
    return res.status(403).send("Acces denied.you are not admin");
  next();
};
