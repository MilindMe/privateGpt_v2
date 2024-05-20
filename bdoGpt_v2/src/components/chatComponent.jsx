import React, { useState, useEffect } from 'react';
import Chatbox from './chatbox';

const ChatComponent = ({ domainType }) => {
    const [messages, setMessages] = useState([]);
    const [prompt, setPrompt] = useState('');
    const [streamedMessage, setStreamedMessage] = useState('');
    const [isStreaming, setIsStreaming] = useState(false);

    useEffect(() => {
        console.log("Chat history:", messages);
    }, [messages]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newMessage = { role: 'user', content: prompt };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setStreamedMessage('');
        setIsStreaming(true);

        try {
            const queryParams = new URLSearchParams({
                query_text: prompt,
                domain_type: domainType
            }).toString();

            const eventSource = new EventSource(`http://127.0.0.1:5000/api/stream-query?${queryParams}`);

            let fullMessage = ''; // Variable to store the concatenated message

            eventSource.onmessage = (event) => {
                const data = event.data.trim();
                if (data !== "[DONE]") {
                    console.log("Received chunk:", data);
                    if (!fullMessage.endsWith(data + " ")) {
                        fullMessage += data + " ";
                    }
                    console.log("Updated fullMessage:", fullMessage); // Log fullMessage after each chunk
                    setStreamedMessage(fullMessage); // Update streamedMessage for real-time display
                } else {
                    console.log("Final message to be added:", fullMessage.trim());
                    setIsStreaming(false);
                    setMessages((prevMessages) => [
                        ...prevMessages,
                        { role: 'BeeDo', content: fullMessage.trim() }
                    ]);
                    setStreamedMessage('');
                    eventSource.close();
                }
            };

            eventSource.onerror = (error) => {
                console.error('Error querying the backend:', error);
                setIsStreaming(false);
                eventSource.close();
            };
        } catch (error) {
            console.error('Error initializing EventSource:', error);
            setIsStreaming(false);
        }

        setPrompt('');
    };

    return (
        <div>
            <div>
                {messages.map((message, index) => (
                    <div key={index} className={`message ${message.role}`}>
                        <strong>{message.role}:</strong> {message.content}
                    </div>
                ))}
                {isStreaming && (
                    <div className="message assistant streaming">
                        <strong>BeeDo (generating):</strong> {streamedMessage.trim()}
                    </div>
                )}
            </div>
            <Chatbox prompt={prompt} setPrompt={setPrompt} handleSubmit={handleSubmit} />
        </div>
    );
};

export default ChatComponent;
