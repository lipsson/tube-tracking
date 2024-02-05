import { ReactElement, ReactNode } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { AuthContextProvider } from '@/auth'
import { AlertContextProvider } from '@/common/alert'
import { queryClient } from '@/common/query-client'
import { i18n } from '@/i18n'

import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { HelmetProvider } from 'react-helmet-async'
import { I18nextProvider } from 'react-i18next'
import { BrowserRouter } from 'react-router-dom'
import ThemeProvider from '@/assets/theme/ThemeProvider'


const AllTheProviders = ({ children }: { children: ReactNode }) => {
    return (
        <HelmetProvider>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <AlertContextProvider>
                        <AuthContextProvider>
                            <I18nextProvider i18n={i18n}>

                                <ThemeProvider>
                                    {children}
                                </ThemeProvider>
                                <ReactQueryDevtools initialIsOpen={false} />

                            </I18nextProvider>
                        </AuthContextProvider>
                    </AlertContextProvider>
                </BrowserRouter>
            </QueryClientProvider>
        </HelmetProvider>
    )
}

const customRender = (
    ui: ReactElement,
    options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }