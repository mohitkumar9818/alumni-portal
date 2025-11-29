import { useState, useRef, useEffect } from 'react'
import { sendChatMessage } from '../../services/api'
import './AIWidget.css'

const AIWidget = ({ user, animationsEnabled }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [isMinimized, setIsMinimized] = useState(false)
    const [messages, setMessages] = useState([
        {
            id: 1,
            type: 'ai',
            text: `Hi ${user?.name || 'there'}! 👋 I'm your AI Career Assistant. How can I help you today?`,
            timestamp: new Date()
        }
    ])
    const [inputValue, setInputValue] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const messagesEndRef = useRef(null)
    const inputRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    useEffect(() => {
        if (isOpen && !isMinimized && inputRef.current) {
            inputRef.current.focus()
        }
    }, [isOpen, isMinimized])

    const handleSend = async () => {
        if (!inputValue.trim() || isLoading) return

        const userMessage = {
            id: Date.now(),
            type: 'user',
            text: inputValue,
            timestamp: new Date()
        }

        setMessages(prev => [...prev, userMessage])
        setInputValue('')
        setIsLoading(true)

        try {
            const response = await sendChatMessage(inputValue)

            const aiMessage = {
                id: Date.now() + 1,
                type: 'ai',
                text: response.data.message,
                timestamp: new Date(response.data.timestamp)
            }

            setMessages(prev => [...prev, aiMessage])
        } catch (error) {
            console.error('AI chat error:', error)

            const errorMessage = {
                id: Date.now() + 1,
                type: 'ai',
                text: 'Sorry, I encountered an error. Please try again.',
                timestamp: new Date()
            }

            setMessages(prev => [...prev, errorMessage])
        } finally {
            setIsLoading(false)
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    const quickActions = [
        'Help with resume',
        'Interview tips',
        'Networking advice',
        'Skill development'
    ]

    const handleQuickAction = (action) => {
        setInputValue(action)
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }

    return (
        <>
            {/* Widget Button */}
            <div
                className="ai-widget-button"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Open AI Assistant"
                role="button"
                tabIndex={0}
                onKeyPress={(e) => e.key === 'Enter' && setIsOpen(!isOpen)}
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                {messages.length > 1 && (
                    <span className="message-badge">{messages.length - 1}</span>
                )}
            </div>

            {/* Widget Panel */}
            {isOpen && (
                <div className={`ai-widget-panel ${isMinimized ? 'minimized' : ''}`}>
                    {/* Header */}
                    <div className="widget-header">
                        <div className="header-info">
                            <div className="ai-avatar">🤖</div>
                            <div>
                                <h3>AI Career Assistant</h3>
                                <span className="status-indicator">
                                    <span className="status-dot"></span>
                                    Online
                                </span>
                            </div>
                        </div>
                        <div className="header-actions">
                            <button
                                className="header-btn"
                                onClick={() => setIsMinimized(!isMinimized)}
                                aria-label={isMinimized ? 'Maximize' : 'Minimize'}
                            >
                                {isMinimized ? '⬆' : '⬇'}
                            </button>
                            <button
                                className="header-btn"
                                onClick={() => setIsOpen(false)}
                                aria-label="Close"
                            >
                                ✕
                            </button>
                        </div>
                    </div>

                    {/* Messages */}
                    {!isMinimized && (
                        <>
                            <div className="widget-messages" role="log" aria-live="polite" aria-atomic="false">
                                {messages.map((message) => (
                                    <div
                                        key={message.id}
                                        className={`message ${message.type}`}
                                    >
                                        {message.type === 'ai' && (
                                            <div className="message-avatar">🤖</div>
                                        )}
                                        <div className="message-content">
                                            <p>{message.text}</p>
                                            <span className="message-time">
                                                {message.timestamp.toLocaleTimeString([], {
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </span>
                                        </div>
                                        {message.type === 'user' && (
                                            <div className="message-avatar user-avatar">
                                                {user?.name?.charAt(0).toUpperCase() || 'U'}
                                            </div>
                                        )}
                                    </div>
                                ))}

                                {isLoading && (
                                    <div className="message ai">
                                        <div className="message-avatar">🤖</div>
                                        <div className="message-content loading">
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

                            {/* Quick Actions */}
                            {messages.length === 1 && (
                                <div className="quick-actions">
                                    <p className="quick-actions-label">Quick actions:</p>
                                    <div className="quick-actions-grid">
                                        {quickActions.map((action, index) => (
                                            <button
                                                key={index}
                                                className="quick-action-btn"
                                                onClick={() => handleQuickAction(action)}
                                            >
                                                {action}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Input */}
                            <div className="widget-input">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    placeholder="Ask me anything..."
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    disabled={isLoading}
                                    aria-label="Message input"
                                />
                                <button
                                    className="send-btn"
                                    onClick={handleSend}
                                    disabled={!inputValue.trim() || isLoading}
                                    aria-label="Send message"
                                >
                                    {isLoading ? '⏳' : '➤'}
                                </button>
                            </div>
                        </>
                    )}
                </div>
            )}
        </>
    )
}

export default AIWidget
