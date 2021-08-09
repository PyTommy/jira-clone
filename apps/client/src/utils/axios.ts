import { environment } from '@client/configs/environments/environment.prod'
import ax from 'axios'

export const axios = ax.create({
  baseURL: environment.baseUrl,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    // 'Access-Control-Allow-Origin': 'http://localhost:5100',
  },
})
