import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { LanguageProvider } from '@/contexts/LanguageContext'
import Index from '../Index'

// Mock dos componentes que não são essenciais para os testes
vi.mock('@/components/StarField', () => ({
    default: () => <div data-testid="star-field">StarField</div>
}))

vi.mock('@/components/ChatBot', () => ({
    default: () => <div data-testid="chatbot">ChatBot</div>
}))

vi.mock('@/components/CookieConsent', () => ({
    default: () => <div data-testid="cookie-consent">CookieConsent</div>
}))

vi.mock('@/hooks/useVisitTracker', () => ({
    useVisitTracker: () => ({})
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

describe('Index Page', () => {
    it('renders the main page structure', () => {
        render(
            <TestWrapper>
                <Index />
            </TestWrapper>
        )

        expect(screen.getByTestId('chatbot')).toBeInTheDocument()
        expect(screen.getByTestId('cookie-consent')).toBeInTheDocument()
    })

    it('renders hero section', () => {
        render(
            <TestWrapper>
                <Index />
            </TestWrapper>
        )

        expect(screen.getByText('Developer')).toBeInTheDocument()
    })

    it('renders experience section', () => {
        render(
            <TestWrapper>
                <Index />
            </TestWrapper>
        )

        expect(screen.getByText('Professional Experience')).toBeInTheDocument()
        expect(screen.getByText('Full Stack Developer')).toBeInTheDocument()
    })

    it('shows expand button initially', () => {
        render(
            <TestWrapper>
                <Index />
            </TestWrapper>
        )

        expect(screen.getByText('Ver Mais Informações')).toBeInTheDocument()
        expect(screen.getByText('Ver Projetos')).toBeInTheDocument()
    })

    it('expands sections when expand button is clicked', async () => {
        render(
            <TestWrapper>
                <Index />
            </TestWrapper>
        )

        const expandButton = screen.getByText('Ver Mais Informações')
        fireEvent.click(expandButton)

        await waitFor(() => {
            expect(screen.getByText('Technical Skills')).toBeInTheDocument()
            expect(screen.getByText('Education')).toBeInTheDocument()
            expect(screen.getByText('Projects')).toBeInTheDocument()
            expect(screen.getByText('Interpersonal Skills')).toBeInTheDocument()
            expect(screen.getByText('About Me')).toBeInTheDocument()
        })
    })

    it('collapses sections when collapse button is clicked', async () => {
        render(
            <TestWrapper>
                <Index />
            </TestWrapper>
        )

        // First expand
        const expandButton = screen.getByText('Ver Mais Informações')
        fireEvent.click(expandButton)

        await waitFor(() => {
            expect(screen.getByText('About Me')).toBeInTheDocument()
        })

        // Then collapse
        const collapseButton = screen.getByText('Ver Menos Informações')
        fireEvent.click(collapseButton)

        await waitFor(() => {
            expect(screen.queryByText('About Me')).not.toBeInTheDocument()
        })
    })

    it('scrolls to projects when Ver Projetos button is clicked', async () => {
        // Mock scrollIntoView
        const mockScrollIntoView = vi.fn()
        Element.prototype.scrollIntoView = mockScrollIntoView

        render(
            <TestWrapper>
                <Index />
            </TestWrapper>
        )

        const projectsButton = screen.getByText('Ver Projetos')
        fireEvent.click(projectsButton)

        await waitFor(() => {
            expect(screen.getByText('About Me')).toBeInTheDocument()
        })

        // Wait for scroll
        await waitFor(() => {
            expect(mockScrollIntoView).toHaveBeenCalled()
        })
    })

    it('renders footer', () => {
        render(
            <TestWrapper>
                <Index />
            </TestWrapper>
        )

        expect(screen.getByText(/© 2025 Fábio Ferreira Paula dos Santos/)).toBeInTheDocument()
        expect(screen.getByText(/Desenvolvido com React e Tailwind CSS/)).toBeInTheDocument()
    })

    it('has correct page structure with main and sections', () => {
        render(
            <TestWrapper>
                <Index />
            </TestWrapper>
        )

        const main = screen.getByRole('main')
        expect(main).toBeInTheDocument()

        // Check if experience section is visible by default
        expect(screen.getByText('Professional Experience')).toBeInTheDocument()
    })

    it('maintains expanded state when switching between buttons', async () => {
        render(
            <TestWrapper>
                <Index />
            </TestWrapper>
        )

        // Expand sections
        const expandButton = screen.getByText('Ver Mais Informações')
        fireEvent.click(expandButton)

        await waitFor(() => {
            expect(screen.getByText('About Me')).toBeInTheDocument()
        })

        // Click on Ver Projetos - should maintain expanded state
        const projectsButton = screen.getByText('Ver Projetos')
        fireEvent.click(projectsButton)

        await waitFor(() => {
            expect(screen.getByText('About Me')).toBeInTheDocument()
        })
    })
})
