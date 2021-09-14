module.exports = function(handler) {
  return async (req, res, next) => {
    try {
      //templete for any route handler
      console.log("try catch");
      await handler(req, res);
    } catch (error) {
      next(error);
    }
  };
};
