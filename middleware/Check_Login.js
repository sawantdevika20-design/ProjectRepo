function isLoggedIn(req, res, next) {
  // Check if a session exists (customer logged in)
  if (req.session && req.session.customer) {
    return next(); // ✅ Continue to the requested route
  } else {
    // ❌ If not logged in, redirect to login page
    return res.redirect("/auth/04_Login");
  }
}

module.exports = { isLoggedIn };
