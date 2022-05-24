let btnLogin = document.getElementById("enter");
btnLogin?.addEventListener("click", login);
function login() {
    let inputUser = document.getElementById("name").value;
    let inputPass = document.getElementById("pass").value;
    let loginAtivo = {
        usuario: "",
        senha: "",
        meusRecados: [],
    };
    let dados = JSON.parse(localStorage.getItem("dados") || "[]");

    if (!inputUser || !inputPass) {
        alert("Favor preencher os campos!");
        return;
    }

    for (let i of dados) {
        if (inputUser == i.usuario && inputPass == i.senha) {
            loginAtivo = {
                usuario: i.usuario,
                senha: i.senha,
                meusRecados: i.meusRecados,
            };
            alert("Entrando no sistema =)");
            localStorage.setItem("loginAtivo", JSON.stringify(loginAtivo));
            window.location.assign("./home.html");
            return;
        }
    }

    alert("Usuário não existe ou a senha está incorreta!");
}
