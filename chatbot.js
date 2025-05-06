// Chatbot for Mental Health Website
document.addEventListener('DOMContentLoaded', function() {
    // Create chatbot UI elements
    const chatbotContainer = document.createElement('div');
    chatbotContainer.className = 'chatbot-container';
    chatbotContainer.innerHTML = `
        <div class="chatbot-icon" id="chatbot-toggle">
            <span class="chatbot-icon-text">💬</span>
        </div>
        <div class="chatbot-box" id="chatbot-box">
            <div class="chatbot-header">
                <h3>Mental Health Assistant</h3>
                <button class="chatbot-close" id="chatbot-close">×</button>
            </div>
            <div class="chatbot-messages" id="chatbot-messages">
                <div class="message bot-message">
                    <div class="message-content">
                        Hi there! I'm your mental health assistant. How can I help you today?
                    </div>
                </div>
            </div>
            <div class="chatbot-input-container">
                <input type="text" id="chatbot-input" placeholder="Type your message..." class="chatbot-input">
                <button id="chatbot-send" class="chatbot-send">Send</button>
            </div>
        </div>
    `;

    document.body.appendChild(chatbotContainer);

    // Get DOM elements
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotBox = document.getElementById('chatbot-box');
    const chatbotClose = document.getElementById('chatbot-close');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotSend = document.getElementById('chatbot-send');
    const chatbotMessages = document.getElementById('chatbot-messages');

    // Toggle chatbot visibility
    chatbotToggle.addEventListener('click', function() {
        chatbotBox.classList.toggle('active');
        chatbotToggle.classList.toggle('hidden');
    });

    // Close chatbot
    chatbotClose.addEventListener('click', function() {
        chatbotBox.classList.remove('active');
        chatbotToggle.classList.remove('hidden');
    });

    // Send message function
    function sendMessage() {
        const message = chatbotInput.value.trim();
        if (message === '') return;

        // Add user message to chat
        addMessage(message, 'user');
        chatbotInput.value = '';

        // Process the message and get bot response
        setTimeout(() => {
            const response = getBotResponse(message);
            addMessage(response, 'bot');
        }, 600);
    }

    // Send button click
    chatbotSend.addEventListener('click', sendMessage);

    // Enter key press
    chatbotInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Add message to chat
    function addMessage(text, sender) {
        const messageElement = document.createElement('div');
        messageElement.className = `message ${sender}-message`;
        messageElement.innerHTML = `
            <div class="message-content">
                ${text}
            </div>
        `;
        chatbotMessages.appendChild(messageElement);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    // Get bot response based on user input
    function getBotResponse(message) {
        message = message.toLowerCase();

        // Simple response patterns
        if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
            return "Hello! How are you feeling today?";
        } else if (message.includes('how are you')) {
            return "I'm here to help you! How are you feeling?";
        } else if (message.includes('bye') || message.includes('goodbye')) {
            return "Take care! Remember, I'm here if you need to talk.";
        } else if (message.includes('thank')) {
            return "You're welcome! I'm happy to help.";
        } else if (message.includes('anxious') || message.includes('anxiety')) {
            return "I notice you mentioned feeling anxious. Try this: Take a deep breath for 4 counts, hold for 2, and exhale for 6. Would you like more anxiety management tips?";
        } else if (message.includes('depress') || message.includes('sad') || message.includes('down')) {
            return "I'm sorry you're feeling down. Remember that you're not alone, and these feelings are temporary. Have you tried any of our mindfulness exercises?";
        } else if (message.includes('stress')) {
            return "Stress is a common experience. Our 'Deep Breathing' exercise can help reduce stress in the moment. Would you like to try it?";
        } else if (message.includes('exercise') || message.includes('practice')) {
            return "Great! We offer several mental health exercises on our website. The 'Deep Breathing' exercise is perfect for beginners. Have you tried any of them yet?";
        } else if (message.includes('book') || message.includes('read')) {
            return "Reading can be very therapeutic! Check out our 'Relax and Read' section for book recommendations tailored to different mental health needs.";
        } else if (message.includes('sleep') || message.includes('insomnia')) {
            return "Sleep difficulties can significantly impact mental health. Try establishing a calming bedtime routine and practice our 'Body Scan' exercise before bed.";
        } else if (message.includes('meditat') || message.includes('mindful')) {
            return "Meditation and mindfulness are powerful practices for mental wellbeing. Our website offers several guided exercises to help you get started.";
        } else if (message.includes('help') || message.includes('need help')) {
            return "I'm here to help! For immediate support, please consider reaching out to a mental health professional or crisis hotline. Would you like some resources?";
        } else if (message.includes('crisis') || message.includes('emergency') || message.includes('suicid')) {
            return "If you're in crisis or having thoughts of harming yourself, please reach out to a crisis helpline immediately: National Suicide Prevention Lifeline: 988 or 1-800-273-8255. Your wellbeing matters.";
        } else {
            return "Thank you for sharing. How else can I assist you with your mental wellbeing today?";
        }
    }
}); 