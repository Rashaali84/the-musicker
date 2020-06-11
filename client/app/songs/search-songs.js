
window.onload = () => {
    document.getElementById('searchSong').addEventListener('click', searchSong);

}
function searchSong() {
    let searchText = document.getElementById('songName').value;
    fetch('/api/songs/search/' + encodeURIComponent(searchText.trim()), {
        method: 'GET'
    })
        .then(res => {
            if (!res.ok) {
                throw res;
            }
            return res.json();
        })
        .then(records => {

            let table = CreateTableFromJson(records);
            var divContainer = document.getElementById("results");
            divContainer.innerHTML = "";
            divContainer.appendChild(table);

        })
        .catch(err => console.error(err));
}

function CreateTableFromJson(jsonRows) {
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

    // ADD JSON DATA TO THE TABLE AS ROWS.
    for (var i = 0; i < jsonRows.length; i++) {

        tr = table.insertRow(-1);

        for (var j = 0; j < col.length; j++) {

            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = jsonRows[i][col[j]];

        }

    }
    return table;

}