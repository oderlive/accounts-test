import { defineStore } from 'pinia'
import type {Account} from "../types/accounts.ts";

interface AccountState {
    accounts: Account[]
}

export const useAccountStore = defineStore('account', {
    state: (): AccountState => ({
        accounts: [],
    }),
    actions: {
        addAccount() {
            this.accounts.push({
                metki: [],
                type: 'Локальная',
                login: '',
                password: '',
            })
        },
        removeAccount(index: number) {
            this.accounts.splice(index, 1)
        },
        updateAccount(index: number, data: Partial<Account>) {
            this.accounts[index] = { ...this.accounts[index], ...data }
        }
    },
    persist: true,
})
