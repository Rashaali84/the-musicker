

window.onload = () => {
    fetch('/api/playlists/', {
        method: 'GET'
    })
        .then(res => {
            if (!res.ok) {
                throw res;
            }
            return res.json();
        })
        .then(records => {
            let data = records;
            var ele = document.getElementById('playlistDDL');

            for (var i = 0; i < data.length; i++) {
                // POPULATE SELECT ELEMENT WITH JSON.
                ele.innerHTML = ele.innerHTML +
                    '<option value="' + data[i]['PlaylistId'] + '">' + data[i]['Name'] + '</option>';
            }
        })
        .catch(err => console.error(err));

    fetch('/api/songs/', {
        method: 'GET'
    })
        .then(res => {
            if (!res.ok) {
                throw res;
            }
            return res.json();
        })
        .then(records => {
            let data = records;
            var ele = document.getElementById('SongsDDL');

            for (var i = 0; i < data.length; i++) {
                // POPULATE SELECT ELEMENT WITH JSON.
                $("#SongsDDL").append('<option value="' + data[i]['TrackId'] + '">' + data[i]['Name'] + '</option>')

            }

        })
        .catch(err => console.error(err));

    document.getElementById('createPlayList').addEventListener('click', addSongPerPlaayList);

}



function addSongPerPlaayList() {
    var ePlayList = document.getElementById("playlistDDL");
    var valuePlayList = Number(ePlayList.options[ePlayList.selectedIndex].value);
    var textPlayList = ePlayList.options[ePlayList.selectedIndex].text;
    var eSong = document.getElementById("SongsDDL");
    var valueSong = Number(eSong.options[eSong.selectedIndex].value);
    var textSong = eSong.options[eSong.selectedIndex].text;

    fetch(`/api/songs/playlists/`, {
        method: 'POST',
        body: JSON.stringify({ playId: valuePlayList, songId: valueSong }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    })
        .then(res => {
            if (!res.ok) {
                throw res;
            }
            return res.json();
        })
        .then(records => {
            alert('Your select song has been added to the list !')
        })
        .catch((err) => {
            alert("Song is already added in this play list  !");
        });
}