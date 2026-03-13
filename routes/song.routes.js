const express = require('express');
const router = express.Router();

const songsController = require ('../controllers/songs.controller')

router.get('/list', songsController.get_list);
router.get('/new', songsController.get_new);
router.post('/new', songsController.post_new);
router.get('/detail/:id', songsController.get_detail);
router.get('/thanks', songsController.get_thanks);

module.exports = router;