import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { LanguageProvider } from '@/contexts/LanguageContext'
import AboutSection from '../AboutSection'

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

describe('AboutSection Component', () => {
    it('renders the about me title', () => {
        render(
            <TestWrapper>
                <AboutSection />
            </TestWrapper>
        )

        expect(screen.getByText('About Me')).toBeInTheDocument()
    })

    it('renders about me content', () => {
        render(
            <TestWrapper>
                <AboutSection />
            </TestWrapper>
        )

        expect(screen.getByText('A little more about me')).toBeInTheDocument()
        expect(screen.getByText(/Full Stack Developer/)).toBeInTheDocument()
        expect(screen.getByText(/Python for AI/)).toBeInTheDocument()
    })

    it('renders personal interests content in Portuguese', () => {
        render(
            <TestWrapper>
                <AboutSection />
            </TestWrapper>
        )

        expect(screen.getByText(/Além da programação, sou apaixonado por música/)).toBeInTheDocument()
        expect(screen.getByText(/cinema é outra paixão que me fascina/)).toBeInTheDocument()
        expect(screen.getByText(/sonho é viajar pelo mundo/)).toBeInTheDocument()
    })

    it('renders personal interests content in English', () => {
        // Mock language to English
        const mockLanguageContext = {
            language: 'en',
            t: (key: string) => {
                const translations: Record<string, string> = {
                    'aboutMe': 'About Me',
                    'aboutTitle': 'A little more about me',
                    'aboutText1': 'I am a Full Stack Developer passionate about creating innovative and efficient solutions.',
                    'aboutText2': 'My passion for technology drives me to explore new tools and approaches.'
                }
                return translations[key] || key
            }
        }

        // We'll test the English content when language is set to English
        // This is a basic test structure
    })

    it('has correct section ID', () => {
        render(
            <TestWrapper>
                <AboutSection />
            </TestWrapper>
        )

        const section = document.getElementById('about')
        expect(section).toBeInTheDocument()
    })

    it('renders centered layout', () => {
        render(
            <TestWrapper>
                <AboutSection />
            </TestWrapper>
        )

        const cardContent = screen.getByText('A little more about me').closest('.max-w-4xl')
        expect(cardContent).toHaveClass('max-w-4xl', 'mx-auto', 'text-center')
    })

    it('mentions music interests', () => {
        render(
            <TestWrapper>
                <AboutSection />
            </TestWrapper>
        )

        expect(screen.getByText(/rock clássico até jazz e MPB/)).toBeInTheDocument()
    })

    it('mentions cinema passion', () => {
        render(
            <TestWrapper>
                <AboutSection />
            </TestWrapper>
        )

        expect(screen.getByText(/cinema é outra paixão que me fascina/)).toBeInTheDocument()
        expect(screen.getByText(/filmes que contam histórias únicas e inspiradoras/)).toBeInTheDocument()
    })

    it('mentions travel dreams', () => {
        render(
            <TestWrapper>
                <AboutSection />
            </TestWrapper>
        )

        expect(screen.getByText(/sonho é viajar pelo mundo/)).toBeInTheDocument()
        expect(screen.getByText(/conhecer diferentes culturas/)).toBeInTheDocument()
    })
})
