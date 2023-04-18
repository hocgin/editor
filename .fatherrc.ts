import {defineConfig} from 'father';

export const useLogger = () => {
  let result: any = [];
  let offLogger = process.env.USE_LOG !== 'true';
  console.debug(`[${offLogger ? '禁用' : '启用'}]日志打印`);
  if (offLogger) {
    result.push([
      'transform-remove-console',
      {exclude: ['error', 'warn', 'info']},
    ]);
  }
  return result;
};
export default defineConfig({
  // more father config: https://github.com/umijs/father/blob/master/docs/config.md
  platform: 'browser',
  esm: {},
  cjs: {},
  extraBabelPlugins: [
    ...useLogger(),
  ],
});
