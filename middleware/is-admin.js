function isAdmin(req, res, next) {
  if (req.session.user.role !== 'admin') {
    return res.status(404).render('error', { 
      pagina: 'Error 404 - Ruta no encontrada',
      error: true,
      message: 'Solo los administradores pueden hacer esto.' });
  }
  next();
}

module.exports = isAdmin;