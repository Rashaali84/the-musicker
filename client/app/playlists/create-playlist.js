window.onload = () => {

    document.getElementById('createPlayList').addEventListener("click", creatPlayList);
}
function creatPlayList() {

    let playListName = document.getElementById('playListName').value;

    if (isEmpty(playListName) || isBlank(playListName)) {
        alert('Please Write a play list name .. ');
    }
    else {
        fetch('/api/playlists/', {
            method: 'POST',
            body: JSON.stringify({ name: playListName }),
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
                alert(`PlayList ${playListName} is added successfully ! `)
            })
            .catch(err => console.error(err));
    }
}

function isEmpty(str) {
    return (!str || 0 === str.length);
}
function isBlank(str) {
    return (!str || /^\s*$/.test(str));
}