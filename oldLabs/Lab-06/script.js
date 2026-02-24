const verificar = document.getElementById("button-vrf");
const inputPassword = document.getElementById("password-cnt"); 
const listaErrores = document.getElementById("mensaje-error");

const requisitos = [
    { regex: /.{8,}/, msg: "Al menos 8 caracteres" },
    { regex: /[A-Z]/, msg: "Al menos una mayúscula" },
    { regex: /[a-z]/, msg: "Al menos una minúscula" },
    { regex: /[0-9]/, msg: "Al menos un número" },
    { regex: /[!@#$%^&*(),.?":{}|<>]/, msg: "Al menos un carácter especial" }
];

const verificarPassword = () => {
    const password = inputPassword.value;
    
    const faltantes = requisitos.filter(req => !req.regex.test(password));

    listaErrores.innerHTML = "";

    if (faltantes.length === 0 && password !== "") {
        listaErrores.innerHTML = `<p class="has-text-success"><i class="fas fa-check-circle"></i> ¡Contraseña segura!</p>`;
        inputPass.classList.add('is-success');
        inputPass.classList.remove('is-danger');
    } else {
        let htmlFinal = '<p class="has-text-danger">Te falta:</p><ul>';
        faltantes.forEach(item => {
            htmlFinal += `<li class="has-text-danger-light">• ${item.msg}</li>`;
        });

        htmlFinal += '</ul>';
        listaErrores.innerHTML = htmlFinal;
        
        inputPass.classList.add('is-danger');
        inputPass.classList.remove('is-success');
    }
};

verificar.onclick = verificarPassword;