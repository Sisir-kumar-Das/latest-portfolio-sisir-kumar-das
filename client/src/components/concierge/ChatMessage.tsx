import type { ReactNode } from 'react'
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

function parseInlineFormatting(text: string): ReactNode[] {
  const tokenRegex = /(\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|`([^`]+)`)/g
  const parts: ReactNode[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = tokenRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index))
    }

    if (match[2] && match[3]) {
      // Link: [text](url)
      parts.push(
        <a
          key={match.index}
          href={match[3]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary-2 underline underline-offset-2 transition-colors hover:text-white"
        >
          {match[2]}
        </a>
      )
    } else if (match[4]) {
      // Bold: **text**
      parts.push(
        <strong key={match.index} className="font-semibold text-white">
          {match[4]}
        </strong>
      )
    } else if (match[5]) {
      // Code: `text`
      parts.push(
        <code
          key={match.index}
          className="rounded bg-black/35 px-1 py-0.5 font-mono text-xs text-primary-2"
        >
          {match[5]}
        </code>
      )
    }

    lastIndex = tokenRegex.lastIndex
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex))
  }

  return parts.length > 0 ? parts : [text]
}

function FormattedContent({ content }: { content: string }) {
  const lines = content.split('\n')

  return (
    <div className="space-y-1.5">
      {lines.map((line, idx) => {
        const trimmed = line.trim()
        if (!trimmed) {
          return <div key={idx} className="h-1" />
        }

        const isBullet =
          trimmed.startsWith('• ') || trimmed.startsWith('* ') || trimmed.startsWith('- ')
        const contentText = isBullet ? trimmed.slice(2) : trimmed
        const formatted = parseInlineFormatting(contentText)

        if (isBullet) {
          return (
            <div key={idx} className="flex items-start gap-2 pl-1">
              <span className="mt-1.5 select-none text-[8px] text-primary-2">●</span>
              <div className="flex-1">{formatted}</div>
            </div>
          )
        }

        return <div key={idx}>{formatted}</div>
      })}
    </div>
  )
}

function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[88%] rounded-3xl px-4 py-3 text-sm leading-6 shadow-[0_12px_34px_rgba(0,0,0,0.2)] ${
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
        <FormattedContent content={message.content} />
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
