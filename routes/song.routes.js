const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/is-auth');
const isAdmin  = require('../middleware/rbac');
const songsController = require ('../controllers/songs.controller')

router.get('/list', isAuth, songsController.get_list);
router.get('/new', isAuth, isAdmin, songsController.get_new);
router.post('/new', isAdmin, isAuth, songsController.post_new);
router.get('/detail/:id', isAuth, songsController.get_detail);
router.get('/thanks', isAuth, songsController.get_thanks);
router.get('/update/:id', isAuth, isAdmin,songsController.get_update);
router.post('/update/:id', isAuth, isAdmin,songsController.post_update);

module.exports = router;