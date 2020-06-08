'use strict'
const db = require('./db-connection');

const handlers = {
    getArtists: async (req, res) => {
        const sql = `SELECT * FROM ARTISTS`;

        db.all(sql, (err, rows) => {
            if (err) {
                res.status(400).json({ "error": err.message });
                return;
            }
            res.json(rows)
        });
    },
    getArtistById: async (req, res) => {
        const sql = `SELECT Artists.Name As ArtistName, Albums.Title As AlbumName, Tracks.Name As TrackName
                  FROM     Albums INNER JOIN
                  Artists ON Albums.ArtistId = Artists.ArtistId INNER JOIN
                  Tracks ON Albums.AlbumId = Tracks.AlbumId
				  Where Artists.ArtistId=${req.params.id}
				  order by ArtistName
			
			`;

        db.all(sql, (err, rows) => {
            if (err) {
                res.status(400).json({ "error": err.message });
                return;
            }
            res.json(rows)
        });
    },
    getAlbums: async (req, res) => {
        const sql = `SELECT * FROM Albums`;

        db.all(sql, (err, rows) => {
            if (err) {
                res.status(400).json({ "error": err.message });
                return;
            }
            res.json(rows)
        });

    },
    getAllSongs: async (req, res) => {
        const sql = `SELECT Tracks.TrackId as TrackId,Tracks.Name as TrackName, Playlists.Name as PlayListName ,Playlists.PlaylistId as PlayListId
                FROM     Playlists INNER JOIN
                  Playlist_Track ON Playlists.PlaylistId = Playlist_Track.PlaylistId INNER JOIN
                  Tracks ON Playlist_Track.TrackId = Tracks.TrackId
                  where Playlists.PlaylistId =${req.params.id}
			`;

        db.all(sql, (err, rows) => {
            if (err) {
                res.status(400).json({ "error": err.message });
                return;
            }
            res.json(rows)
        });
    },
    deleteSongByPlayListId: async (req, res) => {
        const sql = `Delete 
                  FROM    Playlist_Track
                  Where Playlist_Track.TrackId =${req.params.songId} 
                  and Playlist_Track.PlaylistId=${req.params.playId}
			`;

        db.all(sql, (err, rows) => {
            if (err) {
                res.status(400).json({ "error": err.message });
                return;
            }
            res.json(rows)
        });
    },
    getPlayLists: async (req, res) => {
        const sql = `SELECT * FROM PlayLists`;

        db.all(sql, (err, rows) => {
            if (err) {
                res.status(400).json({ "error": err.message });
                return;
            }
            res.json(rows)
        });
    },
    playListsById: async (req, res) => {
        const sql = `SELECT Playlists.Name as PlayList, Tracks.Name as Track, Albums.Title as Album, Artists.Name as Artist
                 FROM     Playlists INNER JOIN
                  Playlist_Track ON Playlists.PlaylistId = Playlist_Track.PlaylistId INNER JOIN
                  Tracks ON Playlist_Track.TrackId = Tracks.TrackId INNER JOIN
                  Albums ON Tracks.AlbumId = Albums.AlbumId INNER JOIN
                  Artists ON Albums.ArtistId = Artists.ArtistId
				  Where Playlists.PlaylistId =${req.params.id}
			
			`;

        db.all(sql, (err, rows) => {
            if (err) {
                res.status(400).json({ "error": err.message });
                return;
            }
            res.json(rows)
        });
    },
    deletePlayList: async (req, res) => {
        const sql = `Delete from PlayLists where Playlists.PlaylistId =${req.params.id}`;

        db.all(sql, (err, rows) => {
            if (err) {
                res.status(400).json({ "error": err.message });
                return;
            }
            res.json(rows)
        });
    }
};

module.exports = handlers;