const express = require('express');
const controllers = require('./controllers.js');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'hello from API' });
});
//Artists , get 
router.get('/artists', controllers.getArtists);
router.get('/artists/:id', controllers.getArtistById);
//Albums , get
router.get('/albums', controllers.getAlbums);
//songs , get
router.get('/songs/:id', controllers.getAllSongs);
router.delete('/songs/:songId/playlists/:playId', controllers.deleteSongByPlayListId)
//PlayList get , get by id, update ,delete
router.get('/playlists', controllers.getPlayLists);
router.get('/playlists/:id', controllers.playListsById);
router.delete('/playlists/:id', controllers.deletePlayList);

module.exports = router;

