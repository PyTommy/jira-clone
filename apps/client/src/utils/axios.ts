import ax from 'axios'
import { environment } from '../configs/environments/environment.prod'

export const axios = ax.create({
  baseURL: environment.baseUrl,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    // 'Access-Control-Allow-Origin': 'http://localhost:5100',
  },
})
