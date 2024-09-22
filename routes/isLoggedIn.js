function isLoggedIn(req, res, next) {
    let token = req.cookies.token;
    if (!token) {
      req.flash('error', 'You must be logged in to view this page');
      return res.redirect("/login");
    }
    jwt.verify(token, "skcnke4xc3xcsd5", (err, decoded) => {
      if (err) {
        req.flash('error', 'Invalid or expired token, please log in again');
        return res.redirect("/login");
      }
      else {
        req.userlogin = decoded;
        next();
      }
    });
  }

  module.exports = isLoggedIn;