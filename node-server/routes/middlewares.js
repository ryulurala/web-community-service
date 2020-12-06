exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    // Forbidden
    res.status(403).send("Need to login");
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    // redirect
    const message = encodeURIComponent("Already login");
    res.redirect(`/?error=${message}`);
  }
};
