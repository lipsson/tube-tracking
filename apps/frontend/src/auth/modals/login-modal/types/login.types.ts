import { LoginCredentials } from "@/auth/types/auth.types"

export type LoginType = {
    onSubmitLogin: (data: LoginCredentials) => void
}