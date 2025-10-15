import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { LanguageProvider } from '@/contexts/LanguageContext'
import Header from '../Header'

// Mock dos ícones do Lucide
vi.mock('lucide-react', () => ({
    Mail: () => <div data-testid="mail-icon">Mail</div>,
    Linkedin: () => <div data-testid="linkedin-icon">Linkedin</div>,
    Github: () => <div data-testid="github-icon">Github</div>,
    Phone: () => <div data-testid="phone-icon">Phone</div>,
    Menu: () => <div data-testid="menu-icon">Menu</div>,
    X: () => <div data-testid="x-icon">X</div>,
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

describe.skip('Header Component', () => {
    it('renders the header with logo', () => {
        render(
            <TestWrapper>
                <Header />
            </TestWrapper>
        )

        expect(screen.getByText('<Fábio />')).toBeInTheDocument()
    })

    it('renders navigation items', () => {
        render(
            <TestWrapper>
                <Header />
            </TestWrapper>
        )

        expect(screen.getByText('Experience')).toBeInTheDocument()
    })

    it('renders contact icons', () => {
        render(
            <TestWrapper>
                <Header />
            </TestWrapper>
        )

        expect(screen.getByTestId('mail-icon')).toBeInTheDocument()
        expect(screen.getByTestId('linkedin-icon')).toBeInTheDocument()
        expect(screen.getByTestId('github-icon')).toBeInTheDocument()
        expect(screen.getByTestId('phone-icon')).toBeInTheDocument()
    })

    it('renders language switcher', () => {
        render(
            <TestWrapper>
                <Header />
            </TestWrapper>
        )

        expect(screen.getByText('EN')).toBeInTheDocument()
    })

    it('has correct LinkedIn link', () => {
        render(
            <TestWrapper>
                <Header />
            </TestWrapper>
        )

        const linkedinLink = screen.getByTestId('linkedin-icon').closest('a')
        expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/ferreira-f%C3%A1bio-98b4304a/')
    })

    it('has correct GitHub link', () => {
        render(
            <TestWrapper>
                <Header />
            </TestWrapper>
        )

        const githubLink = screen.getByTestId('github-icon').closest('a')
        expect(githubLink).toHaveAttribute('href', 'https://github.com/FabioSonats')
    })

    it('has correct email link', () => {
        render(
            <TestWrapper>
                <Header />
            </TestWrapper>
        )

        const emailLink = screen.getByTestId('mail-icon').closest('a')
        expect(emailLink).toHaveAttribute('href', 'mailto:ferreirafabio51@gmail.com')
    })

    it('has correct phone link', () => {
        render(
            <TestWrapper>
                <Header />
            </TestWrapper>
        )

        const phoneLink = screen.getByTestId('phone-icon').closest('a')
        expect(phoneLink).toHaveAttribute('href', 'https://wa.me/5542991643802')
    })
})
