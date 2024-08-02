import axios from 'axios';
import formData from './formData';
import { apiUrl, storageName } from '../helper/conf';

const axiosInstance = axios.create({
  baseURL: apiUrl,
  headers: { 'Content-Type': 'multipart/form-data' }
})

const get = axiosInstance.get
const post = axiosInstance.post
const getAuthHeaders = () => { return {headers: { 'Authorization' : `Bearer ${localStorage.getItem(storageName.auth)}` }}}

export const login = async data => { return await post('/login', formData(data)) }
export const register = async data => { return await post('/register', formData(data)) }
export const getMessages = async () => { return await get('/messages/getbyuser', getAuthHeaders()) }
export const getPostsByUser = async () => { return await get('/posts/getbyuser') }
export const getAllPosts = async () => { return await get('/posts/get') }
export const getUsers = async () => { return await get('/users/get', getAuthHeaders()) }
export const getProfileData = async id => { return await get(`/user/get/${id}`) }
export const updatePassword = async data => { return await post(`/user/password/update`, formData(data), getAuthHeaders()) }
export const updatePicture = async data => { return await post(`/user/image/update`, formData(data), getAuthHeaders()) }
export const sendMessage = async data => { return await post('/message/send', formData(data), getAuthHeaders()) }
export const sendFile = async data => { return await post('/file/send', formData(data), getAuthHeaders()) }
export const downloadFile = async data => { return await post('/file/download', formData(data), { responseType: 'blob' }) }