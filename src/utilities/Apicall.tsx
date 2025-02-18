import axios from 'axios';

const BASE_URL = 'http://10.0.102.223:3000';


const apiCall = async (
  method: string,
  url: string,
  data: any = null,
  params: any = null,
  headers: object = {}
) => {
  try {
    let fullUrl = `${BASE_URL}${url}`;

    if (params && method === 'GET') {
      const queryString = new URLSearchParams(params).toString();
      fullUrl += `?${queryString}`;
    }

    const config: any = {
      method,
      url: fullUrl,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    };

    if (method !== 'GET' && data) {
      config.data = data;
    }

    const response = await axios(config);
    return response.data;
  } catch (error: any) {
    console.error('API Call Error:', error?.response?.data || error.message);
    throw error?.response?.data || { message: 'Something went wrong' };
  }
};

export default apiCall;