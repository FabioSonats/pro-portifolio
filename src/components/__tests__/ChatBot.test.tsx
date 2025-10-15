import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { LanguageProvider } from '@/contexts/LanguageContext'
import ChatBot from '../ChatBot'
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

// Mock dos ícones
vi.mock('lucide-react', () => ({
    MessageCircle: () => <div data-testid="message-circle-icon">MessageCircle</div>,
    X: () => <div data-testid="x-icon">X</div>,
    Send: () => <div data-testid="send-icon">Send</div>,
    Bot: () => <div data-testid="bot-icon">Bot</div>,
}))

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
    })

    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <LanguageProvider>
                    {children}
                </LanguageProvider>
            </BrowserRouter>
        </QueryClientProvider>
    )
}

describe('ChatBot Component', () => {
    beforeEach(() => {
        mockInvoke.mockClear()
    })

    it('renders chatbot button initially', () => {
        render(
            <TestWrapper>
                <ChatBot />
            </TestWrapper>
        )

        expect(screen.getByTestId('message-circle-icon')).toBeInTheDocument()
    })

    it('opens chatbot when button is clicked', async () => {
        render(
            <TestWrapper>
                <ChatBot />
            </TestWrapper>
        )

        const chatButton = screen.getByRole('button')
        fireEvent.click(chatButton)

        await waitFor(() => {
            expect(screen.getByText('Portfolio Assistant')).toBeInTheDocument()
        })
    })

    it('shows welcome message when opened', async () => {
        render(
            <TestWrapper>
                <ChatBot />
            </TestWrapper>
        )

        const chatButton = screen.getByRole('button')
        fireEvent.click(chatButton)

        await waitFor(() => {
            expect(screen.getByText(/Hello! I am the virtual assistant/)).toBeInTheDocument()
        })
    })

    it('allows typing in input field', async () => {
        render(
            <TestWrapper>
                <ChatBot />
            </TestWrapper>
        )

        const chatButton = screen.getByRole('button')
        fireEvent.click(chatButton)

        await waitFor(() => {
            const input = screen.getByPlaceholderText('Type your question...')
            fireEvent.change(input, { target: { value: 'Hello' } })
            expect(input).toHaveValue('Hello')
        })
    })

    it('sends message when form is submitted', async () => {
        mockInvoke.mockResolvedValueOnce({
            data: { response: 'Hello! How can I help you?' },
            error: null,
        })

        render(
            <TestWrapper>
                <ChatBot />
            </TestWrapper>
        )

        const chatButton = screen.getByRole('button')
        fireEvent.click(chatButton)

        await waitFor(() => {
            const input = screen.getByPlaceholderText('Type your question...')
            const sendButton = screen.getByTestId('send-icon').closest('button')

            fireEvent.change(input, { target: { value: 'Hello' } })
            fireEvent.click(sendButton!)

            expect(mockInvoke).toHaveBeenCalledWith('chat', {
                body: {
                    message: 'Hello',
                    portfolioData: expect.any(Object),
                },
            })
        })
    })

    it('handles API errors gracefully', async () => {
        mockInvoke.mockRejectedValueOnce(new Error('API Error'))

        render(
            <TestWrapper>
                <ChatBot />
            </TestWrapper>
        )

        const chatButton = screen.getByRole('button')
        fireEvent.click(chatButton)

        await waitFor(() => {
            const input = screen.getByPlaceholderText('Type your question...')
            const sendButton = screen.getByTestId('send-icon').closest('button')

            fireEvent.change(input, { target: { value: 'Hello' } })
            fireEvent.click(sendButton!)

            waitFor(() => {
                expect(screen.getByText(/Sorry, an error occurred/)).toBeInTheDocument()
            })
        })
    })

    it('closes chatbot when close button is clicked', async () => {
        render(
            <TestWrapper>
                <ChatBot />
            </TestWrapper>
        )

        const chatButton = screen.getByRole('button')
        fireEvent.click(chatButton)

        await waitFor(() => {
            const closeButton = screen.getByTestId('x-icon').closest('button')
            fireEvent.click(closeButton!)
        })

        await waitFor(() => {
            expect(screen.queryByText('Portfolio Assistant')).not.toBeInTheDocument()
        })
    })
})
