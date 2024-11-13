document.addEventListener("DOMContentLoaded", () => {
    // Elementos das páginas e formulários
    const loginPage = document.getElementById("login");
    const registerPage = document.getElementById("register");
    const mainPage = document.getElementById("mainPage");
    const gerenciamentoPage = document.getElementById("gerenciamentoPage"); // Página de gerenciamento de atendimento

    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");
    const welcomeUser = document.getElementById("welcomeUser");

    const registerLink = document.getElementById("registerLink");
    const loginLink = document.getElementById("loginLink");
    const logoutLink = document.getElementById("logoutLink");
    const forgotPasswordLink = document.getElementById("forgotPasswordLink");

    // Elementos de gerenciamento de atendimento
    const atendimentoList = document.getElementById("atendimentoList");
    const addAtendimentoBtn = document.getElementById("addAtendimentoBtn");

    // Carrega o usuário logado do armazenamento local
    let loggedInUser = localStorage.getItem("loggedInUser");
    const adminUser = "Gabriel"; // Nome do administrador
    const adminEmail = "moralesbalsamo@gmail.com"; // Email do administrador
    const adminPassword = "winchester123"; // Senha do administrador

    // Função para alternar entre páginas
    function showPage(page) {
        loginPage.style.display = "none";
        registerPage.style.display = "none";
        mainPage.style.display = "none";
        gerenciamentoPage.style.display = "none"; // Ocultar página de gerenciamento
        page.style.display = "block";
    }

    // Função para atualizar a interface de boas-vindas
    function updateWelcomeMessage() {
        if (loggedInUser) {
            welcomeUser.textContent = `Bem-vindo, ${loggedInUser}!`;
            showPage(mainPage);
            if (loggedInUser === adminUser) {
                showPage(gerenciamentoPage); // Mostra o gerenciamento de atendimento apenas para o admin
            }
        } else {
            showPage(loginPage);
        }
    }

    // Função de login
    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const username = loginForm.username.value.trim();
        const password = loginForm.password.value.trim();

        // Verifica o armazenamento local para simular autenticação
        const storedPassword = localStorage.getItem(username);

        if (storedPassword === password) {
            loggedInUser = username;
            localStorage.setItem("loggedInUser", username); // Salva o usuário logado
            updateWelcomeMessage();
            loginForm.reset();
        } else {
            alert("Usuário ou senha incorretos.");
        }
    });

    // Função de registro
    registerForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const username = registerForm.username.value.trim();
        const email = registerForm.email.value.trim();
        const password = registerForm.password.value.trim();

        // Valida os campos e verifica se o usuário já existe
        if (!username || !email || !password) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        if (localStorage.getItem(username)) {
            alert("Esse usuário já está registrado. Por favor, faça o login.");
            return;
        }

        // Simulação de cadastro (salva os dados no armazenamento local)
        localStorage.setItem(username, password);
        localStorage.setItem(`${username}_email`, email);
        alert("Cadastro realizado com sucesso! Por favor, faça o login.");
        showPage(loginPage);
        registerForm.reset();
    });

    // Função de logout
    logoutLink.addEventListener("click", (event) => {
        event.preventDefault();
        loggedInUser = null;
        localStorage.removeItem("loggedInUser"); // Remove o usuário logado
        showPage(loginPage);
    });

    // Link para recuperação de senha
    forgotPasswordLink.addEventListener("click", (event) => {
        event.preventDefault();
        const email = prompt("Digite seu email para redefinir a senha:");
        
        if (email) {
            alert(`Se o email ${email} estiver registrado, enviaremos um link de redefinição de senha.`);
        }
    });

    // Navegação entre Login e Registro
    registerLink.addEventListener("click", (event) => {
        event.preventDefault();
        showPage(registerPage);
    });

    loginLink.addEventListener("click", (event) => {
        event.preventDefault();
        showPage(loginPage);
    });

    // Função para adicionar uma nota de atendimento
    addAtendimentoBtn.addEventListener("click", () => {
        const nota = prompt("Digite a nota do atendimento:");
        if (nota) {
            const atendimentoItem = document.createElement("li");
            atendimentoItem.textContent = nota;
            const editBtn = document.createElement("button");
            editBtn.textContent = "Editar";
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Excluir";
            atendimentoItem.appendChild(editBtn);
            atendimentoItem.appendChild(deleteBtn);

            // Função de editar a nota
            editBtn.addEventListener("click", () => {
                const newNota = prompt("Edite a nota:", nota);
                if (newNota) {
                    atendimentoItem.firstChild.textContent = newNota;
                }
            });

            // Função de excluir a nota
            deleteBtn.addEventListener("click", () => {
                atendimentoItem.remove();
            });

            atendimentoList.appendChild(atendimentoItem);
        }
    });

    // Inicialização: mostra a página correta com base no usuário logado
    updateWelcomeMessage();
});
