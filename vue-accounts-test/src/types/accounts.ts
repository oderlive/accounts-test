export type AccountType = 'Локальная' | 'LDAP'

export interface Account {
    metki: { text: string }[]
    type: AccountType
    login: string
    password: string | null
    isValid?: boolean
}