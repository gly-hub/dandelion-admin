import { message } from 'antd';

// 业务错误码定义
export enum ErrorCode {
  SUCCESS = 20000,
  UNAUTHORIZED = 40001,
  FORBIDDEN = 40003,
  NOT_FOUND = 40004,
  VALIDATION_ERROR = 40005,
  BUSINESS_ERROR = 50001,
  SYSTEM_ERROR = 50002,
}

// 业务错误类
export class BusinessError extends Error {
  code: number;
  requestId?: string;

  constructor(message: string, code: number, requestId?: string) {
    super(message);
    this.name = 'BusinessError';
    this.code = code;
    this.requestId = requestId;
  }
}

// HTTP错误类
export class HttpError extends Error {
  status: number;
  url: string;

  constructor(message: string, status: number, url: string) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
    this.url = url;
  }
}

// 网络错误类
export class NetworkError extends Error {
  constructor(message = '网络连接失败') {
    super(message);
    this.name = 'NetworkError';
  }
}

// 错误处理器
export class ErrorHandler {
  // 处理业务错误
  static handleBusinessError(error: BusinessError) {
    const { code, message: msg, requestId } = error;
    
    // 特定错误码处理
    switch (code) {
      case ErrorCode.UNAUTHORIZED:
        // 清除用户信息并跳转到登录页
        localStorage.removeItem('token');
        window.location.href = '/login';
        break;
      case ErrorCode.FORBIDDEN:
        window.location.href = '/403';
        break;
      default:
        // 显示错误消息
        message.error({
          content: msg,
          key: requestId,
        });
    }

    // 开发环境打印详细错误信息
    if (import.meta.env.DEV) {
      console.error(`[Business Error] ${msg}`, {
        code,
        requestId,
        stack: error.stack,
      });
    }
  }

  // 处理HTTP错误
  static handleHttpError(error: HttpError) {
    const { status, message: msg, url } = error;

    switch (status) {
      case 401:
        localStorage.removeItem('token');
        window.location.href = '/login';
        break;
      case 403:
        window.location.href = '/403';
        break;
      case 404:
        window.location.href = '/404';
        break;
      case 500:
        message.error('服务器错误，请稍后重试');
        break;
      default:
        message.error(msg || '请求失败');
    }

    // 开发环境打印详细错误信息
    if (import.meta.env.DEV) {
      console.error(`[HTTP Error] ${status} ${msg}`, {
        url,
        stack: error.stack,
      });
    }
  }

  // 处理网络错误
  static handleNetworkError(error: NetworkError) {
    message.error(error.message);

    if (import.meta.env.DEV) {
      console.error('[Network Error]', error);
    }
  }

  // 处理未知错误
  static handleUnknownError(error: unknown) {
    message.error('发生未知错误，请稍后重试');

    if (import.meta.env.DEV) {
      console.error('[Unknown Error]', error);
    }
  }

  // 统一错误处理入口
  static handle(error: unknown) {
    if (error instanceof BusinessError) {
      this.handleBusinessError(error);
    } else if (error instanceof HttpError) {
      this.handleHttpError(error);
    } else if (error instanceof NetworkError) {
      this.handleNetworkError(error);
    } else {
      this.handleUnknownError(error);
    }
  }
} 