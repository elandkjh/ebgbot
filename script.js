document.addEventListener("DOMContentLoaded", function() {
    // 매일 첫 방문 시 데일리 퀴즈 확인
    if (!localStorage.getItem('visited')) {
        askDailyQuiz();
        localStorage.setItem('visited', true);
    }
});

function checkEnter(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function sendMessage() {
    const userInput = document.getElementById('userInput').value;
    if (userInput.trim() !== "") {
        addMessage("You: " + userInput);
        fetchResponse(userInput);
        document.getElementById('userInput').value = "";
    }
}

function addMessage(message) {
    const messages = document.getElementById('messages');
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messages.appendChild(messageElement);
    messages.scrollTop = messages.scrollHeight;
}

function fetchResponse(query) {
    fetch('/api/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query: query })
    })
    .then(response => response.json())
    .then(data => {
        addMessage("Bot: " + data.response);
    });
}

function askDailyQuiz() {
    fetch('/api/quiz')
    .then(response => response.json())
    .then(data => {
        addMessage("Daily Quiz: " + data.quiz);
    });
}
