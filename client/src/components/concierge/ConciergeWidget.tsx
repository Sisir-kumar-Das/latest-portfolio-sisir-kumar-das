import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { BotMessageSquare, Send, Sparkles, X } from 'lucide-react'
import { api } from '../../lib/api'
import Badge from '../ui/Badge'
import ChatMessage, { type ChatMessageItem } from './ChatMessage'

interface ConciergeWidgetProps {
  isOpen: boolean
  onToggle: () => void
  onOpen: () => void
}

interface ChatResponse {
  reply: string
  agent: string
  toolsUsed?: string[]
  sessionId: string
}

const sessionStorageKey = 'sisir-portfolio-session-id'
const welcomeMessage: ChatMessageItem = {
  id: 'welcome',
  role: 'assistant',
  content: "Hi — I'm Sisir's AI Concierge. Ask me about experience, skills, projects, or what he's building right now.",
  agent: 'Concierge',
}

function getOrCreateSessionId() {
  if (typeof window === 'undefined') {
    return 'server-render-session'
  }

  const existing = window.localStorage.getItem(sessionStorageKey)

  if (existing) {
    return existing
  }

  const generated = window.crypto?.randomUUID?.() ?? `session-${Date.now()}`
  window.localStorage.setItem(sessionStorageKey, generated)
  return generated
}

function ConciergeWidget({ isOpen, onToggle, onOpen }: ConciergeWidgetProps) {
  const [sessionId, setSessionId] = useState(getOrCreateSessionId)
  const [messages, setMessages] = useState<ChatMessageItem[]>([welcomeMessage])
  const [inputValue, setInputValue] = useState('')
  const [isSending, setIsSending] = useState(false)

  const assistantHint = useMemo(
    () => 'Ask me about Sisir’s experience, skills, or projects',
    [],
  )

  useEffect(() => {
    window.localStorage.setItem(sessionStorageKey, sessionId)
  }, [sessionId])

  const handleSubmit = async () => {
    const message = inputValue.trim()

    if (!message || isSending) {
      return
    }

    const userMessage: ChatMessageItem = {
      id: `${Date.now()}-user`,
      role: 'user',
      content: message,
    }

    setMessages((current) => [...current, userMessage])
    setInputValue('')
    setIsSending(true)

    try {
      const response = await api.post<ChatResponse>('/chat', { message, sessionId })
      const payload = response.data
      setSessionId(payload.sessionId || sessionId)
      setMessages((current) => [
        ...current,
        {
          id: `${Date.now()}-assistant`,
          role: 'assistant',
          content: payload.reply,
          agent: payload.agent,
          toolsUsed: payload.toolsUsed,
        },
      ])
    } catch {
      setMessages((current) => [
        ...current,
        {
          id: `${Date.now()}-error`,
          role: 'assistant',
          content:
            "Sorry, I couldn't reach the server — please make sure the backend is running.",
          agent: 'Offline fallback',
          isError: true,
        },
      ])
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.96 }}
            transition={{ duration: 0.22 }}
            className="glass-panel w-[min(92vw,24rem)] overflow-hidden rounded-3xl border border-white/10 shadow-[0_24px_90px_rgba(0,0,0,0.45)]"
          >
            <div className="flex items-start justify-between gap-4 border-b border-white/10 bg-gradient-to-r from-primary/15 to-primary-2/10 px-5 py-4">
              <div>
                <h3 className="text-lg font-semibold text-white">AI Concierge</h3>
                <p className="mt-1 text-sm text-muted">{assistantHint}</p>
              </div>
              <button
                type="button"
                onClick={onToggle}
                className="rounded-full border border-white/10 bg-white/5 p-2 text-muted hover:text-white"
                aria-label="Close AI concierge"
              >
                <X size={18} />
              </button>
            </div>

            <div className="max-h-[26rem] space-y-3 overflow-y-auto bg-surface/95 px-4 py-4">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              {isSending ? (
                <div className="flex justify-start">
                  <div className="rounded-3xl rounded-bl-md border border-white/10 bg-surface-2/90 px-4 py-3 text-sm text-muted">
                    Thinking...
                  </div>
                </div>
              ) : null}
            </div>

            <div className="border-t border-white/10 bg-surface-2/90 p-4">
              <div className="mb-3 flex items-center gap-2">
                <Badge tone="accent">session</Badge>
                <p className="truncate font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                  {sessionId}
                </p>
              </div>
              <div className="flex items-end gap-3">
                <textarea
                  rows={2}
                  value={inputValue}
                  onFocus={onOpen}
                  onChange={(event) => setInputValue(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' && !event.shiftKey) {
                      event.preventDefault()
                      void handleSubmit()
                    }
                  }}
                  placeholder="Ask about projects, skills, or experience..."
                  className="min-h-20 flex-1 resize-none rounded-2xl border border-white/10 bg-bg/70 px-4 py-3 text-sm text-white outline-none transition-colors duration-200 placeholder:text-muted/60 focus:border-primary/40"
                />
                <button
                  type="button"
                  onClick={() => void handleSubmit()}
                  disabled={isSending}
                  className="inline-flex size-12 items-center justify-center rounded-2xl bg-gradient-to-r from-primary to-primary-2 text-white shadow-[0_10px_30px_rgba(99,102,241,0.35)] transition-transform duration-200 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
                  aria-label="Send message"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <button
        type="button"
        onClick={onToggle}
        className="group inline-flex size-16 items-center justify-center rounded-full bg-gradient-to-r from-primary to-primary-2 text-white shadow-[0_18px_45px_rgba(99,102,241,0.45)] transition-transform duration-200 hover:-translate-y-1"
        aria-label="Toggle AI concierge"
      >
        {isOpen ? <X size={24} /> : <BotMessageSquare size={24} />}
        <span className="pointer-events-none absolute -top-10 right-0 hidden rounded-full border border-white/10 bg-surface px-3 py-1 font-mono text-[11px] uppercase tracking-[0.22em] text-primary-2 group-hover:block">
          <Sparkles size={12} className="mr-1 inline-block" />
          AI Concierge
        </span>
      </button>
    </div>
  )
}

export default ConciergeWidget
