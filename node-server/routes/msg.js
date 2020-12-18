const express = require("express");

const { isLoggedIn } = require("./middlewares");

const Message = require("../schemas/message");

const router = express.Router();

router.get("/:id", isLoggedIn, async (req, res, next) => {
  try {
    const messages = await Message.find({ receiver: req.user.id }).populate(
      "sender",
      "nickname"
    );

    console.log(`msg length = ${messages.length}`);

    res.render("message", {
      title: "Community Service",
      header: "main",
      messages: messages,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post("/", isLoggedIn, async (req, res, next) => {
  try {
    // console.log(`receiver = ${req.body.receiver}`);
    // console.log(`sender = ${req.user.id}`);
    // console.log(`content = ${req.body.content}`);
    // console.log(`Url = ${req.body.currentUrl}`);

    await Message.create({
      receiver: req.body.receiver,
      content: req.body.content,
      sender: req.user.id,
    });

    res.redirect(`/page${req.body.currentUrl}`);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
