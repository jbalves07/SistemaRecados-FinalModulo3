let btnLogoff = document.getElementById("logoff");
btnLogoff?.addEventListener("click", logoff);

function logoff() {
    localStorage.removeItem("loginAtivo");
    window.location.assign("login.html");
}

let btnSalvar = document.getElementById("salvar");
btnSalvar?.addEventListener("click", addWork);
function addWork() {
    let inputDescription = document.getElementById("description").value;
    let inputDetails = document.getElementById("details").value;
    let loginAtivo = JSON.parse(localStorage.getItem("loginAtivo"));

    if (inputDescription != "" && inputDetails != "") {
        loginAtivo.meusRecados.push({
            description: inputDescription,
            details: inputDetails,
        });
        localStorage.setItem("loginAtivo", JSON.stringify(loginAtivo));
    }
    updateList();
    inputDescription = location.reload();
    inputDetails = location.reload();
}

function updateList() {
    let list = JSON.parse(localStorage.getItem("dados"));
    let loginAtivo = JSON.parse(localStorage.getItem("loginAtivo"));

    for (let i of list) {
        if (loginAtivo.usuario == i.usuario && loginAtivo.senha == i.senha) {
            i.meusRecados = loginAtivo.meusRecados;
        }
    }
    localStorage.setItem("dados", JSON.stringify(list));
    addTable();
}

function addTable() {
    let loginAtivo = JSON.parse(localStorage.getItem("loginAtivo"));
    let addList = document.getElementById("recados");
    addList.innerHTML = "";
    let x = 1;
    for (let y of loginAtivo.meusRecados) {
        addList.innerHTML +=
            `<tr id="rowTable">` +
            `<th> ${x} </th>` +
            `<td id="${x}_t1">${y.description}</td>` +
            `<td id="${x}_t2">${y.details}</td>` +
            `<td><button id="" type="button" class="edit btn btn-success" data-bs-toggle="modal" data-bs-target="#editJob" onclick="saveText(${x})">
        Editar
        </button> <button id="" type="button" class="edit btn btn-danger" data-bs-toggle="modal" data-bs-target="#eraseJob" onclick="saveText(${x})">
        Excluir
        </button> </td>` +
            "</tr>";
        x++;
    }
}

function saveText(id) {
    localStorage.setItem("idMsg", JSON.stringify(id));
    let g = document.getElementById(`${id}_t1`);
    let h = document.getElementById(`${id}_t2`);
    let editDescription = document.getElementById("editDescription");
    let editDetails = document.getElementById("editDetails");
    editDescription.value = g.textContent;
    editDetails.value = h.textContent;
}

let btnEraser = document.getElementById("eraser");
btnEraser?.addEventListener("click", deleteText);

function deleteText() {
    let off = localStorage.getItem("idMsg");
    let loginAtivo = JSON.parse(localStorage.getItem("loginAtivo"));

    loginAtivo.meusRecados.splice(parseInt(off) - 1, 1);
    localStorage.setItem("loginAtivo", JSON.stringify(loginAtivo));
    addTable();
}

let btnSaveEdit = document.getElementById("saveEdit");
btnSaveEdit?.addEventListener("click", renewList);

function renewList() {
    let id = localStorage.getItem("idMsg");
    let desc = document.getElementById(`${id}_t1`);
    let deta = document.getElementById(`${id}_t2`);
    let editDescription = document.getElementById("editDescription");
    let editDetails = document.getElementById("editDetails");
    let loginAtivo = JSON.parse(localStorage.getItem("loginAtivo"));
    let add = false;

    for (let p of loginAtivo.meusRecados) {
        if (desc.textContent == p.description && deta.textContent == p.details && !add) {
            p.description = editDescription.value;
            p.details = editDetails.value;
            add = true;
        }
    }
    localStorage.setItem("loginAtivo", JSON.stringify(loginAtivo));
    addTable();
}
addTable();
