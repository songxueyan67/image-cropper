import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path';
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src') // 设置 `@` 指向 `src` 目录
    }
  },
  plugins: [
    vue(),
    Components({
      extensions: ['vue', 'js'],
      deep: true,
      resolvers: [AntDesignVueResolver(), IconsResolver()],
    }),
    Icons({
      compiler: 'vue3',
      autoInstall: true,
    }),
  ],
})
