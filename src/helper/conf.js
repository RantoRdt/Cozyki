export const snName = 'Cozyki'
const snLower = snName.toLocaleLowerCase()
export const storageName = {
    auth: `${snLower}-auth-token`,
    lang: `${snLower}-lang`
}
export const url = 'http://localhost:8000'
export const apiUrl = `${url}/api`
export const socketUrl = 'http://localhost:8001'