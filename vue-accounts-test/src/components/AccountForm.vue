<template>
  <div>
    <div class="header">
      <div class="title">Учетные записи</div>
      <el-button type="primary" @click="addAccount" size="large">+</el-button>
    </div>
    <div class="help" title="Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;">
      <HelpCircle class="help-icon" />
      <span class="help-text">Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;</span>
    </div>
    <table class="accounts-table">
      <thead>
      <tr>
        <th>Метки</th>
        <th>Тип записи</th>
        <th>Логин</th>
        <th>Пароль</th>
      </tr>
      </thead>
      <tbody>
      <AccountRow
          v-for="(acc, index) in store.accounts"
          :key="index"
          :account="acc"
          :index="index"
      />
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { useAccountStore } from '../store/account'
import AccountRow from './AccountRow.vue'
import { HelpCircle } from 'lucide-vue-next'

const store = useAccountStore()
const addAccount = () => store.addAccount()
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  gap: 20px;
}

.title {
  font-size: 2em;
}

.accounts-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 10px 10px;
  margin-top: 20px;
}

th,
td {
  border: none;
  padding: 10px;
  text-align: left;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

th {
  background-color: transparent;
  text-align: left;
  font-weight: 400;
  color: gray;
}

.help {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background-color: aliceblue;
  padding: 5px 10px;
  margin-top: 20px;
  border-radius: 5px;
  cursor: help;
}

.help-icon {
  width: 16px;
  height: 16px;
  margin-right: 5px;
  color: #888;
}

.help-text {
  font-size: 0.9em;
  color: #555;
}
</style>