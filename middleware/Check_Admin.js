// middleware/Check_Admin.js
function isAdmin(req, res, next) {
  if (
    req.session &&
    req.session.customer &&
    (req.session.customer.role === "admin" || req.session.customer.isAdmin)
  ) {
    return next();
  }
  res.redirect("/Admin/Admin_Login");
}

module.exports = isAdmin;
