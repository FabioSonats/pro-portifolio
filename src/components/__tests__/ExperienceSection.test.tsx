import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { LanguageProvider } from '@/contexts/LanguageContext'
import ExperienceSection from '../ExperienceSection'

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

describe('ExperienceSection Component', () => {
    it('renders the professional experience title', () => {
        render(
            <TestWrapper>
                <ExperienceSection />
            </TestWrapper>
        )

        expect(screen.getByText('Professional Experience')).toBeInTheDocument()
    })

    it('renders Full Stack Developer title', () => {
        render(
            <TestWrapper>
                <ExperienceSection />
            </TestWrapper>
        )

        expect(screen.getByText('Full Stack Developer')).toBeInTheDocument()
    })

    it('renders Python for AI and ReactJS specialty', () => {
        render(
            <TestWrapper>
                <ExperienceSection />
            </TestWrapper>
        )

        expect(screen.getByText('Python for AI and ReactJS')).toBeInTheDocument()
    })

    it('renders correct time period', () => {
        render(
            <TestWrapper>
                <ExperienceSection />
            </TestWrapper>
        )

        expect(screen.getByText('2022 – Present')).toBeInTheDocument()
    })

    it('renders Remote location', () => {
        render(
            <TestWrapper>
                <ExperienceSection />
            </TestWrapper>
        )

        expect(screen.getByText('Remote')).toBeInTheDocument()
    })

    it('renders experience responsibilities', () => {
        render(
            <TestWrapper>
                <ExperienceSection />
            </TestWrapper>
        )

        expect(screen.getByText(/Development of AI agents and automation with Python/)).toBeInTheDocument()
        expect(screen.getByText(/Development of responsive websites/)).toBeInTheDocument()
        expect(screen.getByText(/Integration of REST APIs and third-party services/)).toBeInTheDocument()
        expect(screen.getByText(/Previous experience in Flutter for mobile development/)).toBeInTheDocument()
        expect(screen.getByText(/Creation of modern web applications with ReactJS and Tailwind CSS/)).toBeInTheDocument()
        expect(screen.getByText(/Implementation of AI systems for process automation/)).toBeInTheDocument()
        expect(screen.getByText(/Version control with Git and agile methodologies/)).toBeInTheDocument()
    })

    it('has correct section ID', () => {
        render(
            <TestWrapper>
                <ExperienceSection />
            </TestWrapper>
        )

        const section = document.getElementById('experience')
        expect(section).toBeInTheDocument()
    })

    it('renders experience card with correct styling classes', () => {
        render(
            <TestWrapper>
                <ExperienceSection />
            </TestWrapper>
        )

        // Find the card by its content instead of role
        const card = screen.getByText('Full Stack Developer').closest('div')
        expect(card).toHaveClass('bg-white')
    })

    it('displays all 7 key responsibilities', () => {
        render(
            <TestWrapper>
                <ExperienceSection />
            </TestWrapper>
        )

        // Count responsibility paragraphs instead of list items
        const responsibilityTexts = [
            /Development of AI agents and automation with Python/,
            /Creation of modern web applications with ReactJS and Tailwind CSS/,
            /Development of responsive websites/,
            /Implementation of AI systems for process automation/,
            /Integration of REST APIs and third-party services/,
            /Version control with Git and agile methodologies/,
            /Previous experience in Flutter for mobile development/
        ]

        responsibilityTexts.forEach(text => {
            expect(screen.getByText(text)).toBeInTheDocument()
        })
    })
})
