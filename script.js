const messageBar = document.querySelector(".bar-wrapper input");
const sendBtn = document.querySelector(".bar-wrapper button");
const messageBox = document.querySelector(".message-box");

let API_URL = "https://api.openai.com/v1/chat/completions";
let API_KEY = "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";

// Função para enviar mensagem
function sendMessage() {
  if (messageBar.value.length > 0) {
    const UserTypedMessage = messageBar.value;
    messageBar.value = ""; // Limpa o campo de input após enviar

    // Adiciona a mensagem do usuário na interface de chat
    let message = `
      <div class="chat message">
        <img src="img/user.jpg">
        <span>${UserTypedMessage}</span>
      </div>`;

    // Adiciona o indicador de resposta do bot (três pontos)
    let response = `
      <div class="chat response">
        <img src="img/chatbot.jpg">
        <span class="new">...</span>
      </div>`;

    messageBox.insertAdjacentHTML("beforeend", message);
    messageBox.insertAdjacentHTML("beforeend", response);
    messageBox.scrollTop = messageBox.scrollHeight; // Scroll automático para o fim

    // Configuração do fetch para chamar a API do ChatGPT
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        "model": "gpt-3.5-turbo",
        "messages": [{"role": "user", "content": UserTypedMessage}]
      })
    };

    // Chama a API e atualiza a resposta do bot
    fetch(API_URL, requestOptions)
      .then(res => res.json())
      .then(data => {
        const ChatBotResponse = document.querySelector(".response .new");
        ChatBotResponse.innerHTML = data.choices[0].message.content;
        ChatBotResponse.classList.remove("new");
        messageBox.scrollTop = messageBox.scrollHeight; // Scroll automático após receber a resposta
      })
      .catch((error) => {
        const ChatBotResponse = document.querySelector(".response .new");
        ChatBotResponse.innerHTML = "Oops! An error occurred. Please try again.";
      });
  }
}

// Adiciona o evento de clique no botão
sendBtn.onclick = sendMessage;

// Adiciona o evento para pressionar "Enter" no campo de texto
messageBar.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    sendMessage();
  }
});
