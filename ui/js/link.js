
const getLinks = (id, callback) => {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState == xhr.DONE) {
            callback(JSON.parse(xhr.response));
        }
    };
    xhr.open("GET", `http://localhost:8000/server/links.php?id=${id}`);
    xhr.send();
}

const getCity = (id, callback) => {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState == xhr.DONE) {
            callback(JSON.parse(xhr.response));
        }
    };
    xhr.open("GET", `http://localhost:8000/server/city.php?id=${id}`);
    xhr.send();
}

const populateGoBack = () => {
    var menu = document.querySelector("#menu");
    var goBackBtn = document.createElement("a");

    var index = parseInt(localStorage.getItem("index"));
    if (index == 0 ) {
        goBackBtn.setAttribute("href", `main.html`);
    } else {
        var previousCity = parseInt(localStorage.getItem(`city${index - 1}`));

        goBackBtn.setAttribute("href", `link.html?id=${previousCity}`);
    }
    goBackBtn.classList.add("btn", "btn-primary", "btn-sm", "me-1");
    goBackBtn.innerText = "Go back";
    goBackBtn.addEventListener("click", handleGoBack);

    menu.append(goBackBtn);
}

const populateTable = (rows) => {
    var table = document.querySelector("#linksTable");
    table.innerHTML = '';

    rows.forEach((row) => {
        var tr = document.createElement("tr");

        var td1 = document.createElement("td");
        td1.innerText = row["id"].toString();
        tr.appendChild(td1);

        var td2 = document.createElement("td");
        getCity(row["cityId1"], (city) => {
            td2.innerText = city["name"];
        });
        tr.appendChild(td2);

        var td3 = document.createElement("td");
        getCity(row["cityId2"], (city) => {
            td3.innerText = city["name"];
        });
        tr.appendChild(td3);

        var td4 = document.createElement("td");
        td4.innerText = row["duration"].toString();
        tr.appendChild(td4);
        
        var td5 = document.createElement("td");
        td5.innerText = row["distance"].toString();
        tr.appendChild(td5);

        var nextBtn = document.createElement("a");
        nextBtn.setAttribute("href", `link.html?id=${row['cityId2']}`);
        nextBtn.classList.add("btn", "btn-primary", "btn-sm", "me-1");
        nextBtn.setAttribute("id", row["cityId2"]);
        nextBtn.innerText = "Next stop";
        nextBtn.addEventListener("click", handleNext);
        
        var lastBtn = document.createElement("a");
        lastBtn.setAttribute("href", `final.html`);
        lastBtn.classList.add("btn", "btn-primary", "btn-sm", "me-1");
        lastBtn.setAttribute("id", row["cityId2"]);
        lastBtn.innerText = "Last stop";
        lastBtn.addEventListener("click", handleNext);
        
        var buttonCell = document.createElement("td");
        buttonCell.appendChild(nextBtn);
        buttonCell.appendChild(lastBtn);

        tr.appendChild(buttonCell);

        table.appendChild(tr);
    });
}

const handleGoBack = () => {
    var index = parseInt(localStorage.getItem("index"));
    localStorage.removeItem(`city${index}`);
    index -= 1;
    localStorage.setItem("index", index);
}

const handleNext = (e) => {
    var index = parseInt(localStorage.getItem("index")) + 1;
    localStorage.setItem("index", index);
    localStorage.setItem(`city${index}`, e.target.id);
}

const populateComponents = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    getLinks(id, populateTable);
    populateGoBack();
}

document.addEventListener("DOMContentLoaded", populateComponents);