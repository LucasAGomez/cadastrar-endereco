const formulario = document.getElementById("formulario");
const btnCadastrar = document.getElementById("btn-cadastrar");
const btnNovo = document.getElementById("btn-novo");
const mensagem = document.getElementById("mensagem");
const campos = ["cep", "logradouro", "bairro", "cidade", "estado", "numero", "complemento"];

document.getElementById("cep").addEventListener("blur", (evento) => {
    const cep = evento.target.value
    if(cep.length !== 8) return;
    
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then(r => r.json())
    .then(resultado => {
        if(resultado.erro) {
            alert("CEP não encontrado")
            return;
        }
        document.getElementById("logradouro").value = resultado.logradouro
        document.getElementById("bairro").value = resultado.bairro
        document.getElementById("cidade").value = resultado.localidade
        document.getElementById("estado").value = resultado.estado
    })
})

formulario.addEventListener("input", () => {
    const dados = {};
    campos.forEach(id => dados[id] = document.getElementById(id).value);
    localStorage.setItem("endereco", JSON.stringify(dados));
});

document.addEventListener("DOMContentLoaded", () => {
    const salvo = localStorage.getItem("endereco");
    if (!salvo) return;
    const dados = JSON.parse(salvo);
    campos.forEach(id => {
        document.getElementById(id).value = dados[id] || "";
    });
});

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    
    mensagem.textContent = "Endereço Cadastrado";
    
    travarCampos(true);
    btnCadastrar.disabled = true;
    btnNovo.disabled = false;
});

btnNovo.addEventListener("click", () => {
    formulario.reset();
    mensagem.textContent = "";
    localStorage.removeItem("endereco");
    
    travarCampos(false);
    btnCadastrar.disabled = false;
    btnNovo.disabled = true;
});

function travarCampos(travar) {
    campos.forEach(id => {
        document.getElementById(id).disabled = travar;
    });
}