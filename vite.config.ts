import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
// import postcsspxtoviewport from 'postcss-px-to-viewport'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // const env = loadEnv(mode, process.cwd());
  const __DEV__ = mode === "development";
  return {
    plugins: [vue()],
    base: __DEV__ ? "/" : "./",
    // css: {
    //   postcss: {
    //     plugins: [
    //       postcsspxtoviewport({
    //         unitToConvert: 'px', // 要转化的单位
    //         viewportWidth: 750, // UI设计稿的宽度
    //         unitPrecision: 6, // 转换后的精度，即小数点位数
    //         propList: ['*'], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
    //         viewportUnit: 'vw', // 指定需要转换成的视窗单位，默认vw
    //         fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位，默认vw
    //         selectorBlackList: ['ignore-'], // 指定不转换为视窗单位的类名，
    //         minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
    //         mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
    //         replace: true, // 是否转换后直接更换属性值
    //         exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配
    //         // exclude: [],
    //         landscape: false // 是否处理横屏情况
    //       })
    //     ]
    //   }
    // },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    server: {
      host: "localhost", // 启动后浏览器窗口输入地址就可以进行访问
      port: 4500, // 端口号
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      proxy: {
        "/api": {
          target: "http://127.0.0.1:3000/api",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  };
});
