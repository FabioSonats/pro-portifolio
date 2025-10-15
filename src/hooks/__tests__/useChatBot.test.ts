import { renderHook, act } from '@testing-library/react'
import { useChatBot } from '../useChatBot'
import { vi } from 'vitest'

// Mock do Supabase
const mockInvoke = vi.fn()
vi.mock('@/integrations/supabase/client', () => ({
    supabase: {
        functions: {
            invoke: mockInvoke,
        },
    },
}))

// Mock do PortfolioData
const mockPortfolioData = {
    personal: {
        name: 'Fábio Ferreira',
        title: 'Full Stack Developer',
        email: 'ferreirafabio51@gmail.com',
        phone: '+55 42 99164-3802',
        location: 'Remote',
        summary: 'Desenvolvedor Full Stack especializado em Python para IA e ReactJS',
    },
    experience: [],
    education: [],
    projects: [],
    technical: [],
    soft: [],
    languages: [],
}

describe('useChatBot Hook', () => {
    beforeEach(() => {
        mockInvoke.mockClear()
    })

    it('initializes with empty messages and input', () => {
        const { result } = renderHook(() => useChatBot({
            language: 'pt-BR',
            portfolioData: mockPortfolioData,
        }))

        expect(result.current.messages).toEqual([])
        expect(result.current.inputMessage).toBe('')
        expect(result.current.isLoading).toBe(false)
    })

    it('initializes welcome message correctly', () => {
        const { result } = renderHook(() => useChatBot({
            language: 'pt-BR',
            portfolioData: mockPortfolioData,
        }))

        act(() => {
            result.current.initializeWelcomeMessage()
        })

        expect(result.current.messages).toHaveLength(1)
        expect(result.current.messages[0].isUser).toBe(false)
        expect(result.current.messages[0].text).toContain('Olá! Sou o assistente virtual')
    })

    it('initializes welcome message in English', () => {
        const { result } = renderHook(() => useChatBot({
            language: 'en',
            portfolioData: mockPortfolioData,
        }))

        act(() => {
            result.current.initializeWelcomeMessage()
        })

        expect(result.current.messages).toHaveLength(1)
        expect(result.current.messages[0].text).toContain('Hello! I am the virtual assistant')
    })

    it('updates input message', () => {
        const { result } = renderHook(() => useChatBot({
            language: 'pt-BR',
            portfolioData: mockPortfolioData,
        }))

        act(() => {
            result.current.setInputMessage('Hello')
        })

        expect(result.current.inputMessage).toBe('Hello')
    })

    it('sends message successfully', async () => {
        mockInvoke.mockResolvedValueOnce({
            data: { response: 'Hello! How can I help you?' },
            error: null,
        })

        const { result } = renderHook(() => useChatBot({
            language: 'pt-BR',
            portfolioData: mockPortfolioData,
        }))

        act(() => {
            result.current.setInputMessage('Hello')
        })

        await act(async () => {
            result.current.sendMessage()
        })

        expect(mockInvoke).toHaveBeenCalledWith('chat', {
            body: {
                message: 'Hello',
                portfolioData: mockPortfolioData,
            },
        })

        expect(result.current.messages).toHaveLength(2) // User message + AI response
        expect(result.current.inputMessage).toBe('')
        expect(result.current.isLoading).toBe(false)
    })

    it('handles API errors', async () => {
        mockInvoke.mockRejectedValueOnce(new Error('API Error'))

        const { result } = renderHook(() => useChatBot({
            language: 'pt-BR',
            portfolioData: mockPortfolioData,
        }))

        act(() => {
            result.current.setInputMessage('Hello')
        })

        await act(async () => {
            result.current.sendMessage()
        })

        expect(result.current.messages).toHaveLength(2) // User message + Error message
        expect(result.current.messages[1].text).toContain('Desculpe, ocorreu um erro')
        expect(result.current.isLoading).toBe(false)
    })

    it('does not send empty messages', () => {
        const { result } = renderHook(() => useChatBot({
            language: 'pt-BR',
            portfolioData: mockPortfolioData,
        }))

        act(() => {
            result.current.setInputMessage('   ') // Only whitespace
            result.current.sendMessage()
        })

        expect(mockInvoke).not.toHaveBeenCalled()
    })

    it('handles Enter key press', async () => {
        mockInvoke.mockResolvedValueOnce({
            data: { response: 'Hello!' },
            error: null,
        })

        const { result } = renderHook(() => useChatBot({
            language: 'pt-BR',
            portfolioData: mockPortfolioData,
        }))

        act(() => {
            result.current.setInputMessage('Hello')
        })

        await act(async () => {
            result.current.handleKeyPress({ key: 'Enter' } as React.KeyboardEvent)
        })

        expect(mockInvoke).toHaveBeenCalled()
    })

    it('ignores non-Enter key presses', () => {
        const { result } = renderHook(() => useChatBot({
            language: 'pt-BR',
            portfolioData: mockPortfolioData,
        }))

        act(() => {
            result.current.setInputMessage('Hello')
            result.current.handleKeyPress({ key: 'Space' } as React.KeyboardEvent)
        })

        expect(mockInvoke).not.toHaveBeenCalled()
    })
})
