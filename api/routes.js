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
router.get('/songs/', controllers.getAllSongs);
router.get('/songs/:id', controllers.getAllSongsByPlayListId);
router.delete('/songs/:songId/playlists/:playId', controllers.deleteSongByPlayListId);
router.post('/songs/playlists/', controllers.AddSongPlayList)
router.get('/songs/search/:searchSong/', controllers.searchSong)
//PlayList get , get by id, update ,delete
router.get('/playlists', controllers.getPlayLists);
router.get('/playlists/:id', controllers.playListsById);
router.delete('/playlists/:id', controllers.deletePlayList);
router.post('/playlists/', controllers.AddPlaylist);

module.exports = router;

