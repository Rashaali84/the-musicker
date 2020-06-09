

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
            let table = CreateTableFromJson(records, true, true, true, false);
            // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
            var divContainer = document.getElementById("showData");
            divContainer.innerHTML = "";
            divContainer.appendChild(table);
        })
        .catch(err => console.error(err));
}
function deleteSongByPlayListId(songId, playListId) {

    //Good piece of code to use later :) 
    /*var params = {
        songId: songId,
        playListId: playListId
    };
    var esc = encodeURIComponent;
    var query = Object.keys(params)
        .map(k => esc(k) + '=' + esc(params[k]))
        .join('&');
    console.log(query);*/

    fetch(`/api/songs/${songId}/playlists/${playListId}`, {
        method: 'DELETE'
    })
        .then(res => {
            if (!res.ok) {
                throw res;
            }
            return res.json();
        })
        .then(records => {
            alert("Song is deleted Successfully !");
            location.reload();

        })
        .catch(err => console.error(err));
}
function listSongsByPlayListId(playlistId) {
    fetch('/api/songs/' + playlistId, {
        method: 'GET'
    })
        .then(res => {
            if (!res.ok) {
                throw res;
            }
            return res.json();
        })
        .then(records => {
            let table = CreateTableFromJson(records, false, true, false, true);
            // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
            var divContainer = document.getElementById("songList");
            divContainer.innerHTML = "";
            divContainer.appendChild(table);
            window.location.href = "#songList";

        })
        .catch(err => console.error(err));
}
function getPlayListDetails(playlistId) {

    fetch('/api/playlists/' + playlistId, {
        method: 'GET'
    })
        .then(res => {
            if (!res.ok) {
                throw res;
            }
            return res.json();
        })
        .then(records => {
            let table = CreateTableFromJson(records, false, false, false, false);
            // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
            var divContainer = document.getElementById("showDetails");
            divContainer.innerHTML = "";
            divContainer.appendChild(table);
            window.location.href = "#showDetails";
        })
        .catch(err => console.error(err));
}
function deletePlayList(playlistId) {
    fetch('/api/playlists/' + playlistId, {
        method: 'DELETE'
    })
        .then(res => {
            if (!res.ok) {
                throw res;
            }
            return res.json();
        })
        .then(records => {
            location.reload();
        })
        .catch(err => console.error(err));
}
function CreateTableFromJson(jsonRows, addButton, addDelete, listSongs, SongsFlag) {
    // EXTRACT VALUE FOR HTML HEADER. 
    var col = [];
    for (var i = 0; i < jsonRows.length; i++) {
        for (var key in jsonRows[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }
    // CREATE DYNAMIC TABLE.
    var table = document.createElement("table");
    // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.
    var tr = table.insertRow(-1);                   // TABLE ROW.

    for (var i = 0; i < col.length; i++) {
        var th = document.createElement("th");      // TABLE HEADER.
        th.innerHTML = col[i];
        tr.appendChild(th);
    }
    if (addButton) {
        var th = document.createElement("th");      // TABLE HEADER.
        th.innerHTML = 'Details';
        tr.appendChild(th);
    }
    if (addDelete) {
        var th = document.createElement("th");      // TABLE HEADER.
        th.innerHTML = 'Delete';
        tr.appendChild(th);
    }
    if (listSongs) {
        var th = document.createElement("th");      // TABLE HEADER.
        th.innerHTML = 'Songs';
        tr.appendChild(th);
    }
    // ADD JSON DATA TO THE TABLE AS ROWS.
    for (var i = 0; i < jsonRows.length; i++) {

        tr = table.insertRow(-1);

        for (var j = 0; j <= col.length; j++) {
            if (j === (col.length)) {
                if (addButton) {
                    var tabCell = tr.insertCell(-1);
                    tabCell.innerHTML = `<button type="button" id="Details" onclick="getPlayListDetails(${jsonRows[i][col[0]]})"> Details</button> `;
                }
                if (addDelete) {
                    if (SongsFlag) {
                        var tabCell = tr.insertCell(-1);
                        tabCell.innerHTML = `<button type="button" id="delete" onclick="deleteSongByPlayListId(${jsonRows[i][col[0]]},${jsonRows[i][col[col.length - 1]]})">Delete</button> `;
                    }
                    else {
                        var tabCell = tr.insertCell(-1);
                        tabCell.innerHTML = `<button type="button" id="delete" onclick="deletePlayList(${jsonRows[i][col[0]]})">Delete</button> `;
                    }
                }
                if (listSongs) {
                    var tabCell = tr.insertCell(-1);
                    tabCell.innerHTML = `<button type="button" id="songs" onclick="listSongsByPlayListId(${jsonRows[i][col[0]]})">Songs</button> `;
                }

            }
            else {
                var tabCell = tr.insertCell(-1);
                tabCell.innerHTML = jsonRows[i][col[j]];
            }
        }

    }
    return table;

}
