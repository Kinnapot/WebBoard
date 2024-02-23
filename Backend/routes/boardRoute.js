const express = require("express");
const router = express.Router();

const passport = require("passport");
const authentication = passport.authenticate("jwt", { session: false });

const boardControllers = require("../controllers/boardControllers");

router.get("/", authentication, boardControllers.getBoardList);
router.get("/history", authentication, boardControllers.getHistoryList);
router.get("/profile", authentication, boardControllers.getProfile);
router.post("/", authentication, boardControllers.createBoardList);
router.put("/:id", authentication, boardControllers.updateBoardList);
router.delete("/:id", authentication, boardControllers.deleteBoardList);

module.exports = router;
