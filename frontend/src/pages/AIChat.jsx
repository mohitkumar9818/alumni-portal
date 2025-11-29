import { useState, useRef, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { sendChatMessage } from '../services/api'

const AIChat = () => {
    const { user } = useAuth()
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: `Hello ${user?.name || 'there'}! 👋 I'm your AI Career Assistant. I can help you with:

• Career advice and guidance
• Resume and interview tips
• Job search strategies
• Networking recommendations
• Skill development suggestions
• Alumni connections

What would you like to know?`,
            timestamp: new Date()
        }
    ])
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!input.trim() || loading) return

        const userMessage = {
            role: 'user',
            content: input.trim(),
            timestamp: new Date()
        }

        setMessages(prev => [...prev, userMessage])
        setInput('')
        setLoading(true)

        try {
            const response = await sendChatMessage(input.trim())

            const aiMessage = {
                role: 'assistant',
                content: response.data.message,
                timestamp: new Date()
            }

            setMessages(prev => [...prev, aiMessage])
        } catch (error) {
            console.error('Chat error:', error)
            const errorMessage = {
                role: 'assistant',
                content: 'Sorry, I encountered an error. Please try again.',
                timestamp: new Date()
            }
            setMessages(prev => [...prev, errorMessage])
        } finally {
            setLoading(false)
        }
    }

    const formatTime = (date) => {
        return new Date(date).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    const suggestedQuestions = [
        "How can I improve my resume?",
        "What skills should I learn for career growth?",
        "How do I prepare for technical interviews?",
        "Tips for networking with alumni?"
    ]

    const handleSuggestedQuestion = (question) => {
        setInput(question)
    }

    return (
        <div className="ai-chat-page">
            <div className="container">
                <div className="ai-chat-header">
                    <div className="ai-chat-title">
                        <div className="ai-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                                <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
                            </svg>
                        </div>
                        <div>
                            <h1>AI Career Assistant</h1>
                            <p>Get personalized career advice and guidance</p>
                        </div>
                    </div>
                </div>

                <div className="ai-chat-container">
                    <div className="ai-chat-messages">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`message ${message.role === 'user' ? 'message-user' : 'message-assistant'}`}
                            >
                                <div className="message-avatar">
                                    {message.role === 'user' ? (
                                        <div className="user-avatar">
                                            {user?.name?.charAt(0).toUpperCase()}
                                        </div>
                                    ) : (
                                        <div className="ai-avatar">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                                                <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
                                            </svg>
                                        </div>
                                    )}
                                </div>
                                <div className="message-content">
                                    <div className="message-header">
                                        <span className="message-sender">
                                            {message.role === 'user' ? user?.name : 'AI Assistant'}
                                        </span>
                                        <span className="message-time">{formatTime(message.timestamp)}</span>
                                    </div>
                                    <div className="message-text">{message.content}</div>
                                </div>
                            </div>
                        ))}

                        {loading && (
                            <div className="message message-assistant">
                                <div className="message-avatar">
                                    <div className="ai-avatar">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M12 2L2 7l10 5 10-5-10-5z" />
                                            <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="message-content">
                                    <div className="typing-indicator">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {messages.length === 1 && (
                        <div className="suggested-questions">
                            <p className="suggested-title">Suggested questions:</p>
                            <div className="suggested-grid">
                                {suggestedQuestions.map((question, index) => (
                                    <button
                                        key={index}
                                        className="suggested-question"
                                        onClick={() => handleSuggestedQuestion(question)}
                                    >
                                        {question}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="ai-chat-input-form">
                        <div className="ai-chat-input-wrapper">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask me anything about your career..."
                                className="ai-chat-input"
                                disabled={loading}
                            />
                            <button
                                type="submit"
                                className="ai-chat-send-btn"
                                disabled={!input.trim() || loading}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="22" y1="2" x2="11" y2="13" />
                                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                                </svg>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AIChat
