function isAdmin(req, res, next) {
  if (req.session.user.role !== 'admin') {
    const error = new Error('Acceso restringido');
    error.statusCode = 404;
    return next(error)
  }
  next();
}

module.exports = isAdmin;