<template>
  <div>
    <h1>Учетные записи</h1>
    <el-button type="primary" @click="addAccount">+</el-button>
    <p>Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;</p>
    <AccountRow
        v-for="(acc, index) in store.accounts"
        :key="index"
        :account="acc"
        :index="index"
    />
  </div>
</template>

<script setup lang="ts">
import { useAccountStore } from '../store/account'
import AccountRow from './AccountRow.vue'

const store = useAccountStore()
const addAccount = () => store.addAccount()
</script>
