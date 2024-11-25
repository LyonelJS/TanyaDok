let botMessage; // The bot's response
let dotInterval; // The time between each dot in the bot response
let currentChatIndex = -1; // The current active chat
let chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || []; // Load chat history from local storage

// ID elements from HTML
const chatMessages = document.getElementById("chat-messages"); // The chat messages div
const historyContainer = document.getElementById("history"); // The history sidebar div
const userInput = document.getElementById("user-input"); // The input bar
const sendButton = document.getElementById("send-button"); // The send button
const newChatButton = document.getElementById("new-chat"); // The new chat button
const clearHistoryButton = document.getElementById("clear-history"); // The clear history button

// Create new chat and saving the previous one to history
function startNewChat() {
    // Clear the current chat messages
    chatMessages.innerHTML = `<div class="chatbot-message bot-message"> Hello! How can I assist you today? What would you like to ask?" </div>`;

    // Create a new chat
    const newChat = {
        id: Date.now(),
        messages: [
            { sender: "bot", message: "Hello! How can I assist you today? What would you like to ask?" }
        ]
    };

    // Add the new chat to chat history
    chatHistory.push(newChat);

    // Save the updated chat history to local storage
    localStorage.setItem('chatHistory', JSON.stringify(chatHistory));

    // Create a new chat tab in the history sidebar
    const historyItem = document.createElement("a");
    historyItem.href = "#";
    historyItem.innerText = `Chat ${chatHistory.length}`;
    historyItem.classList.add("history-item");
    historyItem.addEventListener("click", () => loadChat(chatHistory.length - 1, historyItem));
    historyContainer.appendChild(historyItem);

    // Set the current chat index to the newly created chat
    currentChatIndex = chatHistory.length - 1;

    // Change color for the active chat in the history tab
    updateActiveHistoryItem();
    // Store the current chat index
    localStorage.setItem('currentChatIndex', currentChatIndex); // Save index

    location.reload();  

    loadChat(currentChatIndex)
    
}

// Display the selected chat from history
function loadChat(index) {
    currentChatIndex = index;
    chatMessages.innerHTML = ""; // Clear current chat

    const selectedChat = chatHistory[currentChatIndex];
    // Display all of the messages for the selected chat
    selectedChat.messages.forEach(msg => {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add(`${msg.sender}-message`);
        messageDiv.innerText = msg.message;
        chatMessages.appendChild(messageDiv);
    });

    // Change color for the active chat in the sidebar (highlight the current chat)
    updateActiveHistoryItem();

    // Scroll to the bottom of the chat container
    chatMessages.scrollTop = chatMessages.scrollHeight;
    localStorage.setItem('currentChatIndex', currentChatIndex); // Save index

}

// Change color for the active chat
function updateActiveHistoryItem() {
    const allHistoryItems = document.querySelectorAll(".history-item");
    
    // Remove active class from all items first
    allHistoryItems.forEach(item => {
        item.classList.remove("active-chat");
    });

    // Get the history item corresponding to the current chat index
    const activeItem = allHistoryItems[currentChatIndex];
    
    // Add the active-chat class to the active chat
    if (activeItem) {
        activeItem.classList.add("active-chat");
    }
}

// User input handling
function sendMessage() {
    const userInputText = userInput.value.trim();

    // If there is no chat, ask the user to start new chat
    if (currentChatIndex === -1) {
        alert("Please start a new chat first!");
        return;
    }

    if (userInputText) {
        // Add the user message to the current chat history
        const userMessage = { sender: "user", message: userInputText };
        chatHistory[currentChatIndex].messages.push(userMessage);

        // Save the updated chat history to local storage
        localStorage.setItem('chatHistory', JSON.stringify(chatHistory));


        // Display the user message
        const userMessageDiv = document.createElement("div");
        userMessageDiv.classList.add("user-message");
        userMessageDiv.textContent = userInputText;
        chatMessages.appendChild(userMessageDiv);

        // Scroll to the bottom of the chat container
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Clear the input box
        userInput.value = "";

        // Make the bot respond to the input
        setTimeout(function () {
            generateBotResponse(userInputText);
        }, 10); // 1 second delay for bot response
    }
}

// Generate a response from the bot (placeholder response for now)
function generateBotResponse(userInput) {
    const chatMessages = document.getElementById("chat-messages");

    // Disable inputs when bot is generating response
    historyContainer.classList.add('disabled');  // Disable clicks on the history sidebar
    sendButton.classList.add('disabled');        // Disable the send button
    newChatButton.classList.add('disabled');     // Disable the new chat button
    clearHistoryButton.classList.add('disabled'); // Disable the clear history button

    if (botMessage) {
        clearInterval(dotInterval);
    }

    // Create a new bot message bubble after every input
    botMessage = document.createElement("div");
    botMessage.className = "chatbot-message bot-message";
    botMessage.textContent = 'Generating response for "' + userInput + '"';

    // Append the bot message to the chat container
    chatMessages.appendChild(botMessage);

    // Scroll to the bottom of the chat container
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Start the dot animation
    let dotCount = 1;
    dotInterval = setInterval(function () {
        botMessage.innerHTML = 'Generating response for "' + userInput + '" ' + '.'.repeat(dotCount); 
        botMessage.innerHTML = `<i>${botMessage.innerHTML}</i>`; // Wrap the text in <i> tags to make it italic
        dotCount++;

        // When it reaches 4 dots, reset to 0 dots
        if (dotCount > 4) {
            dotCount = 1;
        }
    }, 600);

    // Generate the bot finalizing the response after 5 seconds
    setTimeout(function () {
        clearInterval(dotInterval); // Stop the dot animation
        botMessage.textContent = 'Here is the response for "' + userInput + '" : '; // Final response
        chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to the bottom again

        // Add the bot response to the current chat history
        const botMessageObj = { sender: "bot", message: `Here is the response for "${userInput}" : ` };
        chatHistory[currentChatIndex].messages.push(botMessageObj);

        // Save the updated chat history to local storage
        localStorage.setItem('chatHistory', JSON.stringify(chatHistory));

        // Re enable input after response is generated
        historyContainer.classList.remove('disabled');  // Enable clicks on history sidebar
        sendButton.classList.remove('disabled');       // Enable the send button
        newChatButton.classList.remove('disabled');    // Enable the new chat button
        clearHistoryButton.classList.remove('disabled'); // Enable the clear history button

        location.reload();
    }, 5000);

}

// Clear the chat history (using the clear history button)
function clearChatHistory() {
    // Clear chat messages from the chat message div
    chatMessages.innerHTML = `<div class="chatbot-message bot-message">No history available. Start a new chat!</div>`;

    // Clear history from the local storage
    chatHistory = [];
    localStorage.removeItem('chatHistory');
    localStorage.removeItem('currentChatIndex');


    // Remove all chat history tab from the sidebar
    historyContainer.innerHTML = '';

    // Update the current chat index (-1 is none)
    currentChatIndex = -1;
}

// Add event listener for the send button
sendButton.addEventListener("click", sendMessage);

// Add event listener for pressing the ENTER key
userInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        sendMessage();
    }
});

// Add event listener for new chat button
newChatButton.addEventListener("click", startNewChat);

// Add event listener for the clear history button
clearHistoryButton.addEventListener("click", clearChatHistory);

// Load chat history from local storage when the page is loaded
function loadHistory() {
    // Check if chat history exists in local storage
    if (!Array.isArray(chatHistory)) {
        localStorage.removeItem('chatHistory');
        chatHistory = [];
    }
    // Automatically start a new chat if there is no chat when loading the chatbot
    if (!Array.isArray(chatHistory) || chatHistory.length === 0) {
        startNewChat();
    } else{

    // Display the existing chat history tabs in the history sidebar with Chat number: first question
    chatHistory.forEach((chat, index) => {
        const historyItem = document.createElement("a");
        historyItem.href = "#";
        // Get the first user message if there is one
        const firstUserMessage = chat.messages.find(msg => msg.sender === "user")?.message || '';
                
        // Cut the message to the first 50 characters and add '...' if the first user message is too long
        const cutMessage = firstUserMessage.length > 50 ? firstUserMessage.substring(0, 50) + '...' : firstUserMessage;

        historyItem.innerHTML = `<strong>Chat ${index + 1}</strong>${cutMessage ? ': ' + cutMessage : ''}`; // Set the name of the chat history tab
        historyItem.classList.add("history-item"); // Add the class to each tab
        historyItem.addEventListener("click", () => loadChat(index, historyItem)); // Add an event listener so that each tab is clickable
        historyContainer.appendChild(historyItem); // Add each history tab to the history container
    });
    const savedChatIndex = localStorage.getItem('currentChatIndex');

    if (savedChatIndex !== null) {
        currentChatIndex = parseInt(savedChatIndex, 10);
        loadChat(currentChatIndex); // Automatically load the saved chat
    }
}
}
// Load history when the page is loaded
loadHistory();

