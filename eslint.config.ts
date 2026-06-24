import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import prettier from 'eslint-config-prettier'

export default tseslint.config(
	{
		ignores: ['dist/**', 'node_modules/**']
	},

	eslint.configs.recommended,
	...tseslint.configs.recommended,

	{
		rules: {
			'no-console': 'off',
			'no-debugger': 'warn',

			'@typescript-eslint/no-unused-vars': ['error', { args: 'none' }],
			'@typescript-eslint/no-explicit-any': 'warn'
		}
	},
	prettier
)
