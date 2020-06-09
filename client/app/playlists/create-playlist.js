window.onload = () => {

    document.getElementById('createPlayList').addEventListener("click", creatPlayList);
}
function creatPlayList() {

    let playListName = document.getElementById('playListName').value;
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