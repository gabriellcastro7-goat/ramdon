
document.addEventListener("DOMContentLoaded", () => {
    const btnConfirma = document.getElementById("btnConfirma");
    const feedback = document.getElementById("Feedback");

    btnConfirma.addEventListener("click", () => {
        const emailInput = document.getElementById("usuario").value.trim();
        const senhaInput = document.getElementById("senha").value;

        // Limpa mensagens anteriores
        feedback.innerText = "";
        feedback.style.color = "";

        if (!emailInput || !senhaInput) {
            feedback.style.color = "red";
            feedback.innerText = "Por favor, preencha todos os campos.";
            return;
        }

        // Procura os utilizadores gravados no localStorage
        const utilizadores = JSON.parse(localStorage.getItem("utilizadoresControlivros")) || [];

        // Procura pelo utilizador registado com esse email
        const utilizadorEncontrado = utilizadores.find(user => user.email.toLowerCase() === emailInput.toLowerCase());

        if (!utilizadorEncontrado) {
            feedback.style.color = "red";
            feedback.innerText = "Utilizador não encontrado. Verifique o email ou faça o cadastro.";
            return;
        }

        if (utilizadorEncontrado.senha !== senhaInput) {
            feedback.style.color = "red";
            feedback.innerText = "Palavra-passe incorreta.";
            return;
        }

        // Sucesso no login
        feedback.style.color = "green";
        feedback.innerText = `Bem-vindo(a), ${utilizadorEncontrado.nome}! A redirecionar...`;

        // Guarda o utilizador atualmente ligado/autenticado
        localStorage.setItem("utilizadorLogado", JSON.stringify(utilizadorEncontrado));

        // Redireciona para a página principal do sistema após .5s (ajuste o caminho da página se necessário)
        setTimeout(() => {
            // window.location.href = "dashboard.html";
            alert("Login efetuado com sucesso!");
        }, 500);
    });
});