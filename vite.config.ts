import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from "vite-plugin-singlefile" // 1. 이거 추가

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteSingleFile()], // 2. 여기 플러그인 추가
  base: './', // 3. 상대 경로 설정 (중요!)
})