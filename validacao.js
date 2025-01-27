
const nomeEl = document.getElementById("nome");
const nomeErro = document.getElementById("nomeErro");
const form = document.getElementById("form");

nomeEl.addEventListener("input", (ev) => {
    let value = ev.target.value;

    if (value.length < 2 || value.length > 100){
        nomeErro.innerText = "O nome informado está inválido";
    } else {
        nomeErro.innerText = "";
    }
});


form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = new FormData(form);
    for (const [name,value] of data) {
      console.log(name, ":", value)
    }
})