let translateButton = document.querySelector("#translateButton");

translateButton.addEventListener("click", async() => {

    let inputText = document.querySelector("#inputText");
    // Value to translate
    const text = inputText.value.trim();
    
    // Language selected
    const targetLang = document.querySelector("#targetLang").value;

    if(!text) return false;
    
    // User message Input to message box
    const userMessage = document.createElement("div");
    userMessage.className = "chat__message chat__message--user";
    userMessage.textContent = text;

    const messagesContainer = document.querySelector(".chat__messages");
    messagesContainer.appendChild(userMessage);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Back end Ajax request
    try {
       const response = await fetch("/api/translate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({text, targetLang})
        });

        const data = await response.json();

        alert(data.translateText);

        // Add the message from AI to Chat
        const botMessage = document.createElement("div");
        botMessage.className = "chat__message chat__message--bot";
        botMessage.textContent = data.translateText;

        messagesContainer.appendChild(botMessage);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

    } catch (error) {
        console.log("Error", error);
    
    }
    

    // Clean the input text type
    inputText.value = "";

});