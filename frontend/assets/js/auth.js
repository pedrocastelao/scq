document
  .getElementById("loginForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch("http://localhost:4000/login", {
        // Verifique a porta utilizada no seu backend
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login inválido");
      }

      const data = await response.json();
      // Supondo que o seu backend retorne um token ou algum indicador de sessão
      localStorage.setItem("authToken", data.token);
      showNotification("Login realizado com sucesso!", "success");
      // Após login bem-sucedido, redirecione para a página principal
      window.location.href = "teste.html";
    } catch (error) {
      console.error(error);
      showNotification("Email ou senha incorretos!", "error");
    }
  });

function showNotification(message, type) {
  const notification = document.getElementById("notification");
  notification.textContent = message;
  notification.className = "notification";
  notification.classList.add(type);
  notification.style.display = "block";

  // Esconde a notificação após 3 segundos
  setTimeout(() => {
    notification.style.display = "none";
  }, 3000);
}
