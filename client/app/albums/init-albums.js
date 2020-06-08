
window.onload = () => {

    fetch('/api/albums/', {
        method: 'GET'
    })
        .then(res => {
            if (!res.ok) {
                throw res;
            }
            return res.json();
        })
        .then(records => {
            let table = CreateTableFromJson(records, true);
            var divContainer = document.getElementById("showData");
            divContainer.innerHTML = "";
            divContainer.appendChild(table);
        })
        .catch(err => console.error(err));
}


function getArtistDetails(artistId) {

    fetch('/api/artists/' + artistId, {
        method: 'GET'
    })
        .then(res => {
            if (!res.ok) {
                throw res;
            }
            return res.json();
        })
        .then(records => {
            let table = CreateTableFromJson(records, false);
            // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
            var divContainer = document.getElementById("showDetails");
            divContainer.innerHTML = "";
            divContainer.appendChild(table);
        })
        .catch(err => console.error(err));
}


function CreateTableFromJson(jsonRows, addButton) {
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
        th.innerHTML = 'Show Details';
        tr.appendChild(th);
    }
    // ADD JSON DATA TO THE TABLE AS ROWS.
    for (var i = 0; i < jsonRows.length; i++) {

        tr = table.insertRow(-1);

        for (var j = 0; j <= col.length; j++) {
            if (j === (col.length)) {
                if (addButton) {
                    var tabCell = tr.insertCell(-1);
                    tabCell.innerHTML = `<button type="button" id="artistDetails" onclick="getArtistDetails(${jsonRows[i][col[col.length - 1]]})">Click Me!</button> `;
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
