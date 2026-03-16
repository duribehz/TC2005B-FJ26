function isAdmin(req, res, next) {
  if (!req.session.user) return res.redirect('/login');
  if (req.session.user.role !== 'admin') {
    return res.status(403).render('error', { message: 'Solo los administradores pueden hacer esto.' });
  }
  next();
}

module.exports = isAdmin;