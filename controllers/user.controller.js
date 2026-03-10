exports.get_login = (req, res) => {
    res.render('login', {
        pagina: 'Login'
    });
}

exports.post_login = (req, res) => {
    req.session.username = req.body.username;
    res.redirect('/song/list')
}

exports.get_logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/user/login')
    })
}