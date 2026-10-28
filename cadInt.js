document.addEventListener("DOMContentLoaded", () => {
    const btnSave = document.getElementById("btnSave");
    const messgCadastro = document.getElementById("messgCadastro");

    btnSave.addEventListener("click", (e) => {
        e.preventDefault(); // Evita que a página recarregue

        // Captura dos valores
        const email = document.getElementById("email").value.trim();
        const senhaCad = document.getElementById("senhaCad").value;
        const senhaConf = document.getElementById("senhaConf").value;
        const nome = document.getElementById("nome").value.trim();
        const dataNasci = document.getElementById("dataNasci").value;
        const cpf = document.getElementById("cpf").value.trim();
        const workplace = document.getElementById("workplace").value;

        // Limpa mensagens
        messgCadastro.innerText = "";
        messgCadastro.style.color = "";

        // 1. Validação de campos vazios
        if (!email || !senhaCad || !senhaConf || !nome || !dataNasci || !cpf || !workplace) {
            messgCadastro.style.color = "red";
            messgCadastro.innerText = "Por favor, preencha todos os campos obrigatórios.";
            return;
        }

        // 2. Validação de domínios permitidos
        const dominiosPermitidos = ["controlivros.com, livrariascuritiba.br, livrariadavila.br, livrariascatarinense.br, livrariasleitura.br, livrariassaraiva.br"]; // Adiciona os domínios desejados aqui

        if (!email.includes("@")) {
            messgCadastro.style.color = "red";
            messgCadastro.innerText = "O e-mail deve conter '@'.";
            return;
        }

        const dominioDigitado = email.split("@")[1].toLowerCase();

        if (!dominiosPermitidos.includes(dominioDigitado)) {
            messgCadastro.style.color = "red";
            messgCadastro.innerText = `Domínio inválido. Use um e-mail com: ${dominiosPermitidos.join(", ")}`;
            return;
        }

        // 3. Validação do tamanho da senha
        if (senhaCad.length < 8 || senhaCad.length > 32) {
            messgCadastro.style.color = "red";
            messgCadastro.innerText = "A senha deve ter entre 8 e 32 caracteres.";
            return;
        }

        // 4. Validação de espaços em branco na senha
        if (/\s/.test(senhaCad)) {
            messgCadastro.style.color = "red";
            messgCadastro.innerText = "A senha não pode conter espaços.";
            return;
        }

        // 5. Validação de confirmação de senha
        if (senhaCad !== senhaConf) {
            messgCadastro.style.color = "red";
            messgCadastro.innerText = "As senhas não coincidem.";
            return;
        }

        // 6. Salvar no localStorage
        const utilizadores = JSON.parse(localStorage.getItem("utilizadoresControlivros")) || [];

        // Verificar se e-mail já existe
        const emailExiste = utilizadores.some(user => user.email.toLowerCase() === email.toLowerCase());
        if (emailExiste) {
            messgCadastro.style.color = "red";
            messgCadastro.innerText = "Este e-mail já está cadastrado!";
            return;
        }

        // Adicionar novo utilizador
        const novoUsuario = { email, senha: senhaCad, nome, dataNasci, cpf, workplace };
        utilizadores.push(novoUsuario);
        localStorage.setItem("utilizadoresControlivros", JSON.stringify(utilizadores));

        // Sucesso
        messgCadastro.style.color = "green";
        messgCadastro.innerText = "Cadastro realizado com sucesso! Redirecionando para o login...";

        // Redireciona após 2 segundos
        setTimeout(() => {
            window.location.href = "sistemaInt.html";
        }, 1000);
    });
});


