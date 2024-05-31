const express = require("express");
const userController=require("../controllers/users");
const router = express.Router();

router.post("/sign", userController.sign);
router.post("/log", userController.log);
router.get("/logout", userController.logout);
router.post("/trans", userController.trans);
module.exports=router;

