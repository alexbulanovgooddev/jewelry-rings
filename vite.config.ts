import { defineConfig } from 'vite'
import { resolve } from 'path'
import { globSync } from 'glob'
import { fileURLToPath, URL } from 'node:url'
import pluginChecker from 'vite-plugin-checker'
import pluginSvgSpriter from 'vite-plugin-svg-spriter'

export default defineConfig({
	server: {
		open: true
	},
	base: './',
	root: resolve(__dirname, './src'),
	publicDir: resolve(__dirname, './public'),
	build: {
		emptyOutDir: true,
		outDir: resolve(__dirname, './dist'),
		rollupOptions: {
			input: globSync(resolve(__dirname, 'src/**/*.html'), {
				ignore: [resolve(__dirname, 'src/common.blocks/**')]
			})
		}
	},
	resolve: {
		alias: {
			'~': fileURLToPath(new URL('./src', import.meta.url)),
			'@': fileURLToPath(new URL('./src', import.meta.url)),
			'@assets': fileURLToPath(new URL('./src/assets', import.meta.url))
		}
	},
	plugins: [
		pluginChecker({
			eslint: {
				useFlatConfig: true,
				lintCommand: `eslint "${resolve(__dirname, 'src')}/**/*.{js,ts}"`
			},
			stylelint: {
				lintCommand: `stylelint "${resolve(__dirname, 'src')}/**/*.{css,scss}"`
			}
		}),
		pluginSvgSpriter({
			svgFolder: resolve(__dirname, 'src/assets/icons')
		})
	]
})
