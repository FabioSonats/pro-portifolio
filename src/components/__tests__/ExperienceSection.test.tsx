import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { LanguageProvider } from '@/contexts/LanguageContext'
import ExperienceSection from '../ExperienceSection'

const renderSection = () =>
    render(
        <QueryClientProvider client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}>
            <BrowserRouter>
                <LanguageProvider>
                    <ExperienceSection />
                </LanguageProvider>
            </BrowserRouter>
        </QueryClientProvider>
    )

describe('ExperienceSection Component', () => {
    it('renders the professional experience title', () => {
        renderSection()
        expect(screen.getByText('Professional Experience')).toBeInTheDocument()
    })

    it('renders the three companies', () => {
        renderSection()
        expect(screen.getByText('Raizhe')).toBeInTheDocument()
        expect(screen.getByText('Debug')).toBeInTheDocument()
        expect(screen.getByText('Tecnofit')).toBeInTheDocument()
    })

    it('renders the role titles', () => {
        renderSection()
        expect(screen.getByText('Full Stack Developer')).toBeInTheDocument()
        expect(screen.getByText('Python Developer')).toBeInTheDocument()
        expect(screen.getByText('Flutter Developer')).toBeInTheDocument()
    })

    it('renders current and past periods', () => {
        renderSection()
        expect(screen.getAllByText('Current')).toHaveLength(2)
        expect(screen.getByText('Aug 2022 – May 2024')).toBeInTheDocument()
    })

    it('renders key responsibilities for each role', () => {
        renderSection()
        expect(screen.getByText(/End-to-end products/)).toBeInTheDocument()
        expect(screen.getByText(/Generative AI in real products/)).toBeInTheDocument()
        expect(screen.getByText(/Backend development in Python/)).toBeInTheDocument()
        expect(screen.getByText(/Cross-platform White Label applications/)).toBeInTheDocument()
    })

    it('renders external links for current roles', () => {
        renderSection()
        const links = screen.getAllByRole('link')
        const hrefs = links.map((l) => l.getAttribute('href'))
        expect(hrefs).toContain('https://www.linkedin.com/company/raizhe/posts/?feedView=all')
        expect(hrefs).toContain('https://d-bug.io')
    })

    it('has correct section ID', () => {
        renderSection()
        const section = document.getElementById('experience')
        expect(section).toBeInTheDocument()
    })
})
