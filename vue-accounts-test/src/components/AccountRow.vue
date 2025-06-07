<template>
  <tr>
    <td>
      <el-input
          placeholder="Метки"
          v-model="metkiRaw"
          @blur="validateMetki"
          :maxlength="50"
      />
    </td>
    <td>
      <el-select v-model="local.type" @change="onTypeChange">
        <el-option label="Локальная" value="Локальная" />
        <el-option label="LDAP" value="LDAP" />
      </el-select>
    </td>
    <td :colspan="local.type === 'LDAP' ? 2 : 1">
      <el-input
          placeholder="Логин"
          v-model="local.login"
          @blur="validateLogin"
          :maxlength="100"
          :class="{ error: !valid.login }"
      />
    </td>
    <td v-if="local.type === 'Локальная'">
      <el-input
          v-if="local.type === 'Локальная'"
          placeholder="Пароль"
          :type="passwordInputType"
          v-model="local.password"
          @blur="validatePassword"
          :maxlength="100"
          :class="{ error: !valid.password }"
          :style="{ 'text-overflow': 'ellipsis', 'overflow': 'hidden', 'white-space': 'nowrap' }"
          :show-password="true"
      />
    </td>
    <td>
      <Trash2 class="cursor-pointer text-red-500 trash-icon" @click="remove" />
    </td>
  </tr>
</template>

<script setup lang="ts">
import { reactive, watch, toRefs, ref, computed } from 'vue'
import { useAccountStore } from '../store/account'
import type { Account } from '../types/accounts.ts'
import { Trash2 } from 'lucide-vue-next'

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

const passwordInputType = computed(() => {
  return local.type === 'Локальная' && local.password ? 'password' : 'text';
});

function remove() {
  store.removeAccount(props.index)
}
</script>

<style scoped>
.error input {
  border-color: red !important;
}
.trash-icon {
  width: 30px;
  height: 30px;
  cursor: pointer;
  align-self: center;
}
</style>
