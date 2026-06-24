export default {
	extends: [
		'stylelint-config-standard',
		'stylelint-config-standard-scss',
		'stylelint-prettier/recommended'
	],
	ignoreFiles: ['dist/**', 'node_modules/**', 'coverage/**'],
	overrides: [
		{
			files: ['*.html', '**/*.html'],
			customSyntax: 'postcss-html'
		},
		{
			files: ['*.scss', '**/*.scss'],
			customSyntax: 'postcss-scss'
		}
	],
	rules: {
		'no-invalid-position-at-import-rule': null,
		'no-duplicate-selectors': true
	}
}
