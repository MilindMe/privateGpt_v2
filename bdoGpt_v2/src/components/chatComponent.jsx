import React, { useState, useEffect } from 'react';
import Chatbox from './chatbox';


// ChatComponent consumes DomainType for PDF-Mode
// ChatComponent is responsible for Response Generation and Displaying
// all responses and prompts 
//
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
        const newMessage = { role: 'user', content:prompt };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setStreamedMessage('');
        setIsStreaming(true);

        try {
            const queryParams = new URLSearchParams({
                query_text: prompt,
                domain_type: domainType
            }).toString();

            // local host to be changed *** 
            const eventSource = new EventSource(`http://127.0.0.1:5000/api/stream-query?${queryParams}`);

            let fullMessage = ''; // Variable to store the concatenated message
            let isFirstChunk = true;


            eventSource.onmessage = (event) => {
                const data = event.data.trim();
                if (data !== "[DONE]") {    
                    console.log("Received chunk:", data);

                    // This error correction feature is very bad but it works.
                    // The first two chunks received on API calls are extraneous text containing
                    // 'assistant' and '<|end_header_id|> which we do not want displayed
                    //
                    // ** Better Solution would be to deal with JSON formating directly from backend
                    if (isFirstChunk && data === "assistant") {
                        // Skip the first chunk if it's "assistant"
                        isFirstChunk = false;
                        return;
                    }
                    if (data.toLowerCase().endsWith("<|end_header_id|>")) {
                        // Skip chunks that are just "header id"
                        return;
                    }
                    fullMessage += data + " ";

                   // if (!fullMessage.endsWith(data + " ")) {
                   //     fullMessage += data + " ";
                   // }
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

    const renderIcon = (role) => {
        if (role === 'user') {
            return (
                <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                </svg>
            );
        } else {
            return (
                <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-14a6 6 0 110 12A6 6 0 0110 4z" clipRule="evenodd"></path>
                </svg>
            );
        }
    };

    return (
        //
        // ***** TO DO NOTE ********
        // add conditional class to <strong> message.role </strong> 
        // change beedo to icon -- conditional depending on role
        // user logo if role == user
        // *************************
        // 
        //
        // ****** TO DO NOTE *****
        // 
        // REARRANGE GENERATION PROMPTS POSITION SIZE AND COLOUR
        // ALIGN USER BOX MESSAGE TO THE RIGHT
        // ALIGN AI BOX MESSAGE TO THE LEFT
        //  

        <div>
            <div>
                {messages.map((message, index) => (
                   // USER PROMPT BOX APPEARS
                    <div key={index} className={`message ${message.role} 
                    ${message.role === 'user' ? 'bg-gray-700' : 'bg-gray-700'} 
                    text-white text-left
                    font-roboto
                    mx-auto w-3/5`}>
                        
                        <div className="userPrompt flex">
                        <div class="relative w-10 h-10 overflow-hidden
                         bg-gray-100 rounded-full dark:bg-gray-600">
                            {renderIcon(message.role)}
                        </div>
                        <div className="userPrompt-content flex-col pl-4 mt-2 mb-3">
                       {message.content}
                       </div>
                       </div>
                </div>
                ))}
                {isStreaming && (

                    <div className="message assistant bg-gray-700
                    text-white text-left mx-auto w-3/5 ">
                    {streamedMessage.trim()}
                    </div>

                )}
            </div>

                <div className="fixed  w-full bottom-4 ">
                <Chatbox prompt={prompt} setPrompt={setPrompt} handleSubmit={handleSubmit} />
                </div>
    
        </div>
    );
};

export default ChatComponent;