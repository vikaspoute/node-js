const express = require("express");
const {
  handleGetAllUsers,
  handleCreateUser,
  handleUserUpdate,
  handleDeleteUser,
  handleGetUser,
} = require("../controllers/user");

const router = express.Router();

router.route("/").post(handleCreateUser).get(handleGetAllUsers);
router
  .route("/:userId")
  .put(handleUserUpdate)
  .get(handleGetUser)
  .delete(handleDeleteUser);

module.exports = router;
