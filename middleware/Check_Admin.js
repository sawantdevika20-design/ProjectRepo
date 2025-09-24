function isAdmin(req, res, next) {
  if (req.session && req.session.isAdmin) {
    return next();
  }
  res.redirect("/admin/login");
}

module.exports = isAdmin;
