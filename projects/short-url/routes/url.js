const express = require("express");
const {
  handelGenerateNewShortURL,
  analyticsController,
  handelGetUrlByShortId,
} = require("../controllers/url");
const router = express.Router();

router.post("/", handelGenerateNewShortURL);
router.get("/analytics/:shortId", analyticsController);
router.get("/:shortId/", handelGetUrlByShortId);
module.exports = router;
