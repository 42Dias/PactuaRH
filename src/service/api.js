import axios from 'axios'

export const token = localStorage.getItem('token')?.replace(/"/g, '') || ''
export const tenantId =
  localStorage.getItem('tenantId')?.replace(/"/g, '') || ''
export const role = localStorage.getItem('roles')?.replace(/"/g, '') || ''
export const id = localStorage.getItem('id')?.replace(/"/g, '') || ''
export const fullName =
  localStorage.getItem('fullName')?.replace(/"/g, '') || ''
export const status = localStorage.getItem('status')?.replace(/"/g, '') || ''
export const Email = localStorage.getItem('email')?.replace(/"/g, '') || ''
export const semImagem =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Item_sem_imagem.svg/1024px-Item_sem_imagem.svg.png'
export const loadingGif = 'https://contribua.org/mb-static/images/loading.gif'

// export const ip = 'http://localhost' // teste local
export let ip = "https://projetos.42dias.com.br";//servidor/

export const porta = '8154' // teste local
// export let porta = '8154' // servidor

export const api = axios.create({
  baseURL: `${ip}:${porta}/api/tenant/${tenantId}/`,
  // baseURL: 'http://'+ip+':8157/api/tenant/'+tenantId || "fa22705e-cf27-41d0-bebf-9a6ab52948c4" +"/",
  timeout: 50000,
  headers: { Authorization: 'Bearer ' + token },
})

export const apiWithoutTenant = axios.create({
  baseURL: `${ip}:${porta}/api/`,
  timeout: 50000,
})

export const apiWithoutTenantAndWithToken = axios.create({
  baseURL: `${ip}:${porta}/api/`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token,
  },
  timeout: 50000,
})

export const apiWithTenantAndWithToken = axios.create({
  baseURL: `${ip}:${porta}/api/tenant/${tenantId}/`,
  timeout: 50000,
})
