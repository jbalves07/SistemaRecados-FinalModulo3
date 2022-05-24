let btnRegister = document.querySelector("#registerUser");
btnRegister?.addEventListener("click", createUser);
function createUser() {
    let inputUser = document.querySelector("#name").value;
    let inputPass = document.querySelector("#pass").value;
    let repeatPass = document.querySelector("#bispass").value;
    let dados = [];

    if (inputUser.length === 0) {
        alert("Informar usuário!");
    } else if (inputPass.length === 0) {
        alert("Informe a senha");
    } else if (inputPass !== repeatPass) {
        alert("Favor informar senhas iguais!");
    } else {
        dados = JSON.parse(localStorage.getItem("dados") || "[]");
        dados.push({
            usuario: inputUser,
            senha: inputPass,
            meusRecados: [],
        });
        localStorage.setItem("dados", JSON.stringify(dados));
        window.location.assign("./login.html");
    }
}
