import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { message } from 'antd';

interface RequestRecord {
  timestamp: number;
  failCount: number;
  isBlocked: boolean;
}

// 请求记录缓存
const requestCache = new Map<string, RequestRecord>();

// 请求限制配置
const REQUEST_LIMIT = {
  MAX_FAILS: 3,    // 最大失败次数
  BLOCK_TIME: 60 * 1000, // 被阻止后的等待时间（毫秒）
};

// 检查请求限制
const checkRequestLimit = (url: string): boolean => {
  const now = Date.now();
  const record = requestCache.get(url);

  if (!record) {
    requestCache.set(url, { timestamp: now, failCount: 0, isBlocked: false });
    return true;
  }

  // 如果被阻止，检查是否已经过了阻止时间
  if (record.isBlocked) {
    if (now - record.timestamp > REQUEST_LIMIT.BLOCK_TIME) {
      // 重置记录
      record.isBlocked = false;
      record.failCount = 0;
      record.timestamp = now;
      return true;
    }
    return false;
  }

  return true;
};

// 记录请求失败
const recordFailure = (url: string) => {
  const record = requestCache.get(url);
  if (record) {
    record.failCount += 1;
    if (record.failCount >= REQUEST_LIMIT.MAX_FAILS) {
      record.isBlocked = true;
      record.timestamp = Date.now();
      message.error(`请求失败次数过多，请等待 ${REQUEST_LIMIT.BLOCK_TIME / 1000} 秒后重试`);
    }
  }
};

// 创建 axios 实例
const instance: AxiosInstance = axios.create({
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    if (!config.url) return config;

    // 检查请求限制
    if (!checkRequestLimit(config.url)) {
      return Promise.reject(new Error('请求被限制，请稍后再试'));
    }

    // 添加 token
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // 打印请求信息
    console.log('Request:', {
      url: config.url,
      method: config.method,
      headers: config.headers,
      data: config.data
    });

    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    // 打印响应信息
    console.log('Response:', {
      url: response.config.url,
      status: response.status,
      data: response.data
    });

    const { data } = response;
    
    if (data.code !== 2000) {
      // 记录失败
      if (response.config.url) {
        recordFailure(response.config.url);
      }
      message.error(data.msg || '请求失败');
      return Promise.reject(new Error(data.msg || '请求失败'));
    }
    
    // 请求成功，重置失败计数
    if (response.config.url) {
      const record = requestCache.get(response.config.url);
      if (record) {
        record.failCount = 0;
      }
    }
    
    return data;
  },
  (error) => {
    // 打印错误信息
    console.error('Response Error:', {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });

    // 记录失败
    if (error.config?.url) {
      recordFailure(error.config.url);
    }
    message.error(error.message || '网络错误');
    return Promise.reject(error);
  }
);

// 封装请求方法
export const get = <T>(url: string, config?: AxiosRequestConfig) => 
  instance.get<T, T>(url, config);

export const post = <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
  instance.post<T, T>(url, data, config);

export const put = <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
  instance.put<T, T>(url, data, config);

export const del = <T>(url: string, data?: unknown) => {
  return instance.delete<T>(url, { data });
};

// 导出 request 对象
export const request = {
  get,
  post,
  put,
  delete: del,
};

export default request; 