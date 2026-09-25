import Badge from '../ui/Badge'

export interface ChatMessageItem {
  id: string
  role: 'user' | 'assistant'
  content: string
  agent?: string
  toolsUsed?: string[]
  isError?: boolean
}

interface ChatMessageProps {
  message: ChatMessageItem
}

function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[85%] rounded-3xl px-4 py-3 text-sm leading-6 shadow-[0_12px_34px_rgba(0,0,0,0.2)] ${
          isUser
            ? 'rounded-br-md bg-gradient-to-r from-primary to-primary-2 text-white'
            : `rounded-bl-md border ${
                message.isError
                  ? 'border-warning/30 bg-warning/10 text-amber-100'
                  : 'border-white/10 bg-surface-2/90 text-slate-200'
              }`
        }`}
      >
        {!isUser && message.agent ? (
          <div className="mb-2">
            <Badge tone={message.isError ? 'warning' : 'accent'}>via {message.agent}</Badge>
          </div>
        ) : null}
        <p className="whitespace-pre-wrap">{message.content}</p>
        {!isUser && message.toolsUsed && message.toolsUsed.length > 0 ? (
          <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
            tools: {message.toolsUsed.join(', ')}
          </p>
        ) : null}
      </div>
    </div>
  )
}

export default ChatMessage
