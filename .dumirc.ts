import { defineConfig } from 'dumi';

export const useLogger = () => {
  let result = [];
  let offLogger = process.env.USE_LOG !== 'true';
  console.debug(`[${offLogger ? '禁用' : '启用'}]日志打印`);
  if (offLogger) {
    result.push([
      'transform-remove-console',
      { exclude: ['error', 'warn', 'info'] },
    ]);
  }
  return result;
};
export default defineConfig({
  outputPath: 'docs-dist',
  themeConfig: {
    name: 'editor',
  },
  extraBabelPlugins: [...useLogger()],
});
