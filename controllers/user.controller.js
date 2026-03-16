const bcrypt = require('bcryptjs');
const User = require('../models/user.model');

exports.get_login = (req, res) => {
    res.render('login', {
        pagina: 'Login'
    });
}

exports.post_login = (req, res, next) => {
    const { username, password } = req.body;

    User.findByName(username)
        .then(([rows]) => {
            console.log('Rows encontrados:', rows);
            if (rows.length === 0) {
            }
            const user = rows[0];
            return bcrypt.compare(password, user.password)
                .then(doMatch => {
                    if (doMatch) {
                        req.session.isLoggedIn = true;
                        req.session.user = user;
                        return req.session.save(error => {
                            if (error) return next(error);
                            res.redirect('/song/list');
                        });
                    }
                    res.redirect('/login');
                });
        })
        .catch(error => {
            console.log(error);
            next(error);
        });
};

exports.get_signup = (req, res, next) => {
    res.render('signup', {
        pagina: 'Sign Up'
    })
}

exports.post_signup = (req, res, next) => {
    const {username, password} = req.body;
    if (!username){
        return res.redirect('/user/signup');
    } else if (!password) {
        return res.redirect('/user/signup');
    }
    User.create (username, password)
    .then(() => {
        res.redirect('/user/login');
    })
    .catch((error) => {
        console.log(error);
        next(error);
    })
}


exports.get_logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/user/login')
    })
}