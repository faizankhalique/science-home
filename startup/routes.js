module.exports = function(app) {
  const index = require("../routes/indexRoute");
  const profile = require("../routes/profileRoute");
  const blank = require("../routes/blankRoute");
  const login = require("../routes/loginRoute");
  const signup = require("../routes/signupRoute");
  const notfound = require("../routes/404Route");
  const client = require("../routes/clientRoute");
  const stock = require("../routes/stockRoute");
  const generatebill = require("../routes/generatebillRoute");
  const addcredit = require("../routes/addcreditRoute");
  const adddebet = require("../routes/adddebetRoute");
  const addexpenses = require("../routes/expensesRoute");
  const delivery_invoice = require("../routes/delivery_invoiceRoute");
  const productsLedger = require("../routes/productsLedgerRoute");
  const vendorsLedger = require("../routes/vendersLedgerRoute");
  const clientsLedger = require("../routes/clientsLedgerRoute");
  const forgotPassword = require("../routes/forgotPassword");
  const errors = require("../middlewares/asyncMiddleware");
  const vendor = require("../routes/vendorRoute");
  // const notfound = require("../middlewares/notfound");
  app.use("/", index);
  app.use("/profile", profile);
  app.use("/blank", blank);
  app.use("/login", login);
  app.use("/signup", signup);
  app.use("/client", client);
  app.use("/vendor", vendor);
  app.use("/stock", stock);
  app.use("/addcredit", addcredit);
  app.use("/adddebet", adddebet);
  app.use("/addexpenses", addexpenses);
  app.use("/generatebill", generatebill);
  app.use("/delivery_invoice", delivery_invoice);
  app.use("/productsledger", productsLedger);
  app.use("/clientsledger", clientsLedger);
  app.use("/vendorsledger", vendorsLedger);
  app.use("/forgotpassword", forgotPassword);
  app.use("*", notfound);
  app.use(errors);
};
