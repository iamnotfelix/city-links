
const getCities = (callback) => {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState == xhr.DONE) {
            callback(JSON.parse(xhr.response));
        }
    };
    xhr.open("GET", `http://localhost:8000/server/cities.php`);
    xhr.send();
}

const populateTable = (rows) => {
    var table = document.querySelector("#citiesTable");
    table.innerHTML = '';

    rows.forEach((row) => {
        var tr = document.createElement("tr");

        for (let key in row) {
            var td = document.createElement("td");
            td.innerText = row[key].toString();
            tr.appendChild(td);
        }

        var startBtn = document.createElement("a");
        startBtn.setAttribute("href", `link.html?id=${row['id']}`);
        startBtn.classList.add("btn", "btn-primary", "btn-sm", "me-1", "start");
        startBtn.setAttribute("id", row["id"]);
        startBtn.innerText = "Start here";
        startBtn.addEventListener("click", handleStart);
        
        var buttonCell = document.createElement("td");
        buttonCell.appendChild(startBtn);

        tr.appendChild(buttonCell);

        table.appendChild(tr);
    });
}

const handleStart = (e) => {
    localStorage.clear();
    localStorage.setItem("index", 0);
    localStorage.setItem(`city${0}`, e.target.id);
}


const populateComponents = () => {
    localStorage.clear();
    getCities(populateTable);
}

document.addEventListener("DOMContentLoaded", populateComponents);