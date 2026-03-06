const express = require('express');
const router = express.Router();

const songsController = require ('../controllers/songs.controller')

router.get('/lista', songsController.get_lista);
router.get('/new', songsController.get_new);
router.post('/new', songsController.post_new);
router.get('/detalle/:index', songsController.get_detalle);
router.get('/gracias', songsController.get_gracias);

module.exports = router;