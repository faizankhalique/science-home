const express = require("express");
const _ = require("lodash");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const router = express.Router();
const { Client, validateClient } = require("../models/client");
router.get("/", async (req, res) => {
  const clients = await Client.find();
  res.render("client", { clients: clients, title: "Clients" });
});
router.get("/allclients", async (req, res) => {
  const clients = await Client.find();
  // console.log(clients);
  res.json({ clients: clients });
});
router.get("/:id", auth, async (req, res) => {
  const id = req.params.id;
  const client = await Client.findById(id);
  if (!client)
    return res
      .status(404)
      .send("This Client already Deleted please Refresh the page");
  res.json({ client: client });
});
router.post("/", auth, async (req, res) => {
  const body = req.body;
  // const { error } = validateClient(body);
  // if (error) return res.status(400).send(error.details[0].message);
  if (body.email) {
    const clientEmail = await Client.findOne({ email: body.email });
    if (clientEmail) return res.status(400).send("Email Already Exist");
  }
  // const clientUserName = await Client.findOne({ userName: body.userName });
  // if (clientUserName) return res.status(400).send("User Name Already Exist");
  let clinetIds = await Client.find()
    .select({ clientId: 1, _id: 0 })
    .sort({ clientId: -1 });
  if (clinetIds.length == 0) {
    const clientId = Math.floor(Math.random() * 3000);
    body.clientId = clientId;
  } else {
    body.clientId = parseInt(clinetIds[0].clientId) + 1;
  }
  const client = new Client(
    _.pick(body, [
      "firstName",
      "lastName",
      "userName",
      "email",
      "gender",
      "organization",
      "departmentName",
      "location",
      "address",
      "phoneNo",
      "clientId"
    ])
  );
  await client.save();
  res.json({ message: "client add succesfully" });
});
router.put("/:id", auth, async (req, res) => {
  const body = req.body;
  const id = req.params.id;
  const { error } = validateClient(body);
  // if (error) return res.status(400).send(error.details[0].message);
  const orignalClient = await Client.findById(id);
  if (!orignalClient)
    return res
      .status(404)
      .send("This Client already Deleted please Refresh the page");
  if (orignalClient.email !== body.email) {
    const nclient = await Client.findOne({ email: body.email });
    if (nclient) return res.status(400).send("Email Already Exist");
  }
  if (orignalClient.userName !== body.userName) {
    const nclient = await Client.findOne({ userName: body.userName });
    if (nclient) return res.status(400).send("user Already Exist");
  }
  const client = await Client.findByIdAndUpdate(id, {
    firstName: body.firstName,
    lastName: body.lastName,
    userName: body.userName,
    email: body.email,
    gender: body.gender,
    organization: body.organization,
    departmentName: body.departmentName,
    location: body.location,
    address: body.address,
    phoneNo: body.phoneNo
  });
  if (!client)
    return res
      .status(404)
      .send("This Client already Deleted please Refresh the page");
  res.json({ message: "client update succesfully" });
});
router.delete("/:id", auth, async (req, res) => {
  const id = req.params.id;
  const result = await Client.findByIdAndDelete({
    _id: id
  });
  if (!result)
    return res
      .status(404)
      .send("This Client already Deleted please Refresh the page");
  res.json({ m: "Client delete Successfully" });
});
module.exports = router;
