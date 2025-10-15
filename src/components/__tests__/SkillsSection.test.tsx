import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { LanguageProvider } from '@/contexts/LanguageContext'
import SkillsSection from '../SkillsSection'

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

describe('SkillsSection Component', () => {
    it('renders the technical skills title', () => {
        render(
            <TestWrapper>
                <SkillsSection />
            </TestWrapper>
        )

        expect(screen.getByText('Technical Skills')).toBeInTheDocument()
    })

    it('renders Python for AI skill', () => {
        render(
            <TestWrapper>
                <SkillsSection />
            </TestWrapper>
        )

        expect(screen.getByText('Python for AI')).toBeInTheDocument()
        expect(screen.getByText(/AI agents development, automation and machine learning/)).toBeInTheDocument()
    })

    it('renders ReactJS & Tailwind CSS skill', () => {
        render(
            <TestWrapper>
                <SkillsSection />
            </TestWrapper>
        )

        expect(screen.getByText('ReactJS & Tailwind CSS')).toBeInTheDocument()
        expect(screen.getByText(/Modern and responsive web applications development/)).toBeInTheDocument()
    })

    it('renders Git Avançado skill', () => {
        render(
            <TestWrapper>
                <SkillsSection />
            </TestWrapper>
        )

        expect(screen.getByText('Git Avançado')).toBeInTheDocument()
        expect(screen.getByText(/Advanced version control, branching strategies and CI\/CD/)).toBeInTheDocument()
    })

    it('renders SQL & Bancos de Dados skill', () => {
        render(
            <TestWrapper>
                <SkillsSection />
            </TestWrapper>
        )

        expect(screen.getByText('SQL & Bancos de Dados')).toBeInTheDocument()
        expect(screen.getByText(/Complex queries, optimization and database design/)).toBeInTheDocument()
    })

    it('renders Testes Automatizados skill', () => {
        render(
            <TestWrapper>
                <SkillsSection />
            </TestWrapper>
        )

        expect(screen.getByText('Testes Automatizados')).toBeInTheDocument()
        expect(screen.getByText(/Jest, Cypress, unit and integration testing/)).toBeInTheDocument()
    })

    it('renders Docker & Deploy skill', () => {
        render(
            <TestWrapper>
                <SkillsSection />
            </TestWrapper>
        )

        expect(screen.getByText('Docker & Deploy')).toBeInTheDocument()
        expect(screen.getByText(/Containerization and production deployment/)).toBeInTheDocument()
    })

    it('renders Scrum & Kanban skill', () => {
        render(
            <TestWrapper>
                <SkillsSection />
            </TestWrapper>
        )

        expect(screen.getByText('Scrum & Kanban')).toBeInTheDocument()
        expect(screen.getByText(/Agile methodologies and project management/)).toBeInTheDocument()
    })

    it('renders Flutter & Mobile skill', () => {
        render(
            <TestWrapper>
                <SkillsSection />
            </TestWrapper>
        )

        expect(screen.getByText('Flutter & Mobile')).toBeInTheDocument()
        expect(screen.getByText(/Cross-platform mobile development/)).toBeInTheDocument()
    })

    it('renders all 8 skills', () => {
        render(
            <TestWrapper>
                <SkillsSection />
            </TestWrapper>
        )

        // Count skill titles instead of articles
        const skillTitles = screen.getAllByRole('heading', { level: 3 })
        expect(skillTitles).toHaveLength(8)
    })

    it('has correct section ID', () => {
        render(
            <TestWrapper>
                <SkillsSection />
            </TestWrapper>
        )

        const section = document.getElementById('skills')
        expect(section).toBeInTheDocument()
    })
})
