<template>
  <div class="account-row">
    <el-input
        placeholder="Метки"
        v-model="metkiRaw"
        @blur="validateMetki"
        :maxlength="50"
    />
    <el-select v-model="local.type" @change="onTypeChange">
      <el-option label="Локальная" value="Локальная" />
      <el-option label="LDAP" value="LDAP" />
    </el-select>
    <el-input
        placeholder="Логин"
        v-model="local.login"
        @blur="validateLogin"
        :maxlength="100"
        :class="{ error: !valid.login }"
    />
    <el-input
        v-if="local.type === 'Локальная'"
        placeholder="Пароль"
        v-model="local.password"
        show-password
        @blur="validatePassword"
        :maxlength="100"
        :class="{ error: !valid.password }"
    />
    <el-button type="danger" @click="remove">Удалить</el-button>
  </div>
</template>

<script setup lang="ts">
import {reactive, watch, toRefs, ref} from 'vue'
import { useAccountStore } from '../store/account'
import type { Account } from '../types/accounts.ts'

const props = defineProps<{ account: Account, index: number }>()
const store = useAccountStore()

const local = reactive({ ...props.account })

const metkiRaw = ref(local.metki.map(m => m.text).join(';'))
const valid = reactive({ login: true, password: true })

watch(local, () => {
  store.updateAccount(props.index, local)
})

function validateLogin() {
  valid.login = !!local.login && local.login.length <= 100
}
function validatePassword() {
  valid.password = local.type === 'Локальная'
      ? !!local.password && local.password.length <= 100
      : true
}
function validateMetki() {
  local.metki = metkiRaw.value
      .split(';')
      .map(text => text.trim())
      .filter(Boolean)
      .map(text => ({ text }))
}

function onTypeChange() {
  if (local.type === 'LDAP') {
    local.password = null
  }
}
function remove() {
  store.removeAccount(props.index)
}
</script>

<style scoped>
.account-row {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}
.error input {
  border-color: red !important;
}
</style>
