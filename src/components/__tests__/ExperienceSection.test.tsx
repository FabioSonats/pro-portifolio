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

        const section = screen.getByRole('region', { name: /professional experience/i })
        expect(section).toHaveAttribute('id', 'experience')
    })

    it('renders experience card with correct styling classes', () => {
        render(
            <TestWrapper>
                <ExperienceSection />
            </TestWrapper>
        )

        const experienceCard = screen.getByRole('article')
        expect(experienceCard).toHaveClass('bg-white', 'border-2', 'border-sky-100')
    })

    it('displays all 7 key responsibilities', () => {
        render(
            <TestWrapper>
                <ExperienceSection />
            </TestWrapper>
        )

        // Contar os itens da lista de responsabilidades
        const responsibilityItems = screen.getAllByRole('listitem')
        expect(responsibilityItems).toHaveLength(7)
    })
})
