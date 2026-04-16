const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/is-auth');
const isAdmin  = require('../middleware/is-admin');
const songsController = require ('../controllers/songs.controller')

router.get('/list', isAuth, songsController.get_list);
router.get('/new', isAuth, songsController.get_new);
router.post('/new', isAuth, songsController.post_new);
router.get('/detail/:id', isAuth, songsController.get_detail);
router.get('/thanks', isAuth, songsController.get_thanks);
router.get('/update/:id', isAuth, isAdmin,songsController.get_update);
router.post('/update/:id', isAuth, isAdmin,songsController.post_update);
router.get('/delete/:id', isAuth, isAdmin, songsController.get_delete);
router.delete('/delete/:id', isAuth, isAdmin, songsController.delete_song);

module.exports = router;