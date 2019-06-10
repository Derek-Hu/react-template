// 环境配置见src/config.js
export const Config = process.env.config;

// 获取当前git commit, 以方便确认部署代码是否成功
export const GIT_COMMIT = process.env.GIT_COMMIT;
