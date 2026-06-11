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
        expect(screen.getByText(/AI agents, automation and model integration/)).toBeInTheDocument()
    })

    it('renders React & Next.js skill', () => {
        render(
            <TestWrapper>
                <SkillsSection />
            </TestWrapper>
        )

        expect(screen.getByText('React & Next.js')).toBeInTheDocument()
        expect(screen.getByText(/Modern web apps, App Router and SSR/)).toBeInTheDocument()
    })

    it('renders Supabase & Postgres skill', () => {
        render(
            <TestWrapper>
                <SkillsSection />
            </TestWrapper>
        )

        expect(screen.getByText('Supabase & Postgres')).toBeInTheDocument()
        expect(screen.getByText(/Auth, RLS, Edge Functions and Realtime/)).toBeInTheDocument()
    })

    it('renders AI Integration skill', () => {
        render(
            <TestWrapper>
                <SkillsSection />
            </TestWrapper>
        )

        expect(screen.getByText('AI Integration')).toBeInTheDocument()
        expect(screen.getByText(/Anthropic and Gemini SDK, streaming chat and RAG/)).toBeInTheDocument()
    })

    it('renders Automated Testing skill', () => {
        render(
            <TestWrapper>
                <SkillsSection />
            </TestWrapper>
        )

        expect(screen.getByText('Automated Testing')).toBeInTheDocument()
        expect(screen.getByText(/Vitest, Jest and Playwright/)).toBeInTheDocument()
    })

    it('renders Docker & Deploy skill', () => {
        render(
            <TestWrapper>
                <SkillsSection />
            </TestWrapper>
        )

        expect(screen.getByText('Docker & Deploy')).toBeInTheDocument()
        expect(screen.getByText(/Containerization, CI\/CD and production deployment/)).toBeInTheDocument()
    })

    it('renders Flutter & Mobile skill', () => {
        render(
            <TestWrapper>
                <SkillsSection />
            </TestWrapper>
        )

        expect(screen.getByText('Flutter & Mobile')).toBeInTheDocument()
        expect(screen.getByText(/Cross-platform iOS and Android apps/)).toBeInTheDocument()
    })

    it('renders all 9 skills', () => {
        render(
            <TestWrapper>
                <SkillsSection />
            </TestWrapper>
        )

        // Count skill titles instead of articles
        const skillTitles = screen.getAllByRole('heading', { level: 3 })
        expect(skillTitles).toHaveLength(9)
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
