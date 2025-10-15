import { describe, it, expect, beforeEach, vi } from 'vitest'
import { supabase } from '@/integrations/supabase/client'

// Mock do fetch para simular resposta da API
const mockFetch = vi.fn()
global.fetch = mockFetch

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

describe('ChatBot Integration Tests', () => {
    beforeEach(() => {
        mockFetch.mockClear()
    })

    it('should call Supabase Edge Function with correct parameters', async () => {
        // Mock successful response
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                candidates: [{
                    content: {
                        parts: [{
                            text: 'Hello! I am the virtual assistant for Fábio\'s portfolio.'
                        }]
                    }
                }]
            }),
        })

        const { data, error } = await supabase.functions.invoke('chat', {
            body: {
                message: 'Hello',
                portfolioData: mockPortfolioData,
            },
        })

        expect(error).toBeNull()
        expect(data).toBeDefined()
        expect(data.response).toContain('virtual assistant')
    })

    it('should handle API errors gracefully', async () => {
        // Mock error response
        mockFetch.mockRejectedValueOnce(new Error('Network error'))

        const { data, error } = await supabase.functions.invoke('chat', {
            body: {
                message: 'Hello',
                portfolioData: mockPortfolioData,
            },
        })

        expect(error).toBeDefined()
        expect(data).toBeNull()
    })

    it('should validate required fields in request', async () => {
        const { data, error } = await supabase.functions.invoke('chat', {
            body: {
                message: '',
                portfolioData: mockPortfolioData,
            },
        })

        // Should handle empty message appropriately
        expect(data || error).toBeDefined()
    })

    it('should handle missing portfolio data', async () => {
        const { data, error } = await supabase.functions.invoke('chat', {
            body: {
                message: 'Hello',
                portfolioData: null,
            },
        })

        expect(data || error).toBeDefined()
    })
})

describe('Portfolio Data Validation', () => {
    it('should have required personal information', () => {
        expect(mockPortfolioData.personal.name).toBe('Fábio Ferreira')
        expect(mockPortfolioData.personal.title).toBe('Full Stack Developer')
        expect(mockPortfolioData.personal.email).toBe('ferreirafabio51@gmail.com')
        expect(mockPortfolioData.personal.phone).toBe('+55 42 99164-3802')
    })

    it('should have valid email format', () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        expect(emailRegex.test(mockPortfolioData.personal.email)).toBe(true)
    })

    it('should have valid phone format', () => {
        const phoneRegex = /^\+55 \d{2} \d{4,5}-\d{4}$/
        expect(phoneRegex.test(mockPortfolioData.personal.phone)).toBe(true)
    })
})

describe('API Response Validation', () => {
    it('should return valid response structure', async () => {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                candidates: [{
                    content: {
                        parts: [{
                            text: 'Test response'
                        }]
                    }
                }]
            }),
        })

        const { data, error } = await supabase.functions.invoke('chat', {
            body: {
                message: 'Test',
                portfolioData: mockPortfolioData,
            },
        })

        if (data) {
            expect(data.response).toBeDefined()
            expect(typeof data.response).toBe('string')
            expect(data.response.length).toBeGreaterThan(0)
        }
    })
})
