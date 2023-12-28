const URL = require("../models/url");
const shortid = require("shortid");

async function handelGenerateNewShortURL(req, res, next) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "URL is required" });

  const shortId = shortid();

  await URL.create({
    shortId: shortId,
    redirectURL: body.url,
    visitHistory: [],
  });

  return res.status(201).render("home", { shortId: shortId });
}

async function handelGetUrlByShortId(req, res, next) {
  const { shortId } = req.params;

  try {
    const urlData = await URL.findOneAndUpdate(
      { shortId: shortId },
      {
        $push: {
          visitHistory: {
            timestamp: Date.now(),
          },
        },
      }
    );

    if (!urlData) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    return res.redirect(urlData.redirectURL);
  } catch (error) {
    console.error(`Error fetching or updating URL data: ${error}`);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function analyticsController(req, res, next) {
  const shortId = req.params.shortId;

  try {
    const result = await URL.findOne({ shortId });

    if (!result) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    return res.status(200).json({
      totalClicks: result.visitHistory.length,
      visitHistory: result.visitHistory,
    });
  } catch (error) {
    console.error(`Error fetching URL analytics data: ${error}`);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  handelGenerateNewShortURL,
  handelGetUrlByShortId,
  analyticsController,
};
