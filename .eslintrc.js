/**
 * https://github.com/typescript-eslint/typescript-eslint/tree/main/packages/eslint-plugin
 * https://eslint.org/
 */

module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: 'tsconfig.json',
		// sourceType: 'module',
	},
	plugins: ['@typescript-eslint/eslint-plugin'],
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		// 'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/recommended-requiring-type-checking'
	],
	root: true,
	env: {
		node: true,
		// jest: true,
	},
	ignorePatterns: ['.eslintrc.js', 'dist/**/*', 'express/**/*'],
	rules: {
		'indent': 'off',
		'@typescript-eslint/indent': ['error', 'tab', {
			SwitchCase: 1,
			ignoredNodes: [
				'FunctionExpression > .params > :matches(Decorator, :not(:first-child))',
				'ClassBody.body > PropertyDefinition[decorators.length > 0] > .key'
			]
		}],

		'comma-dangle': 'off',
		'@typescript-eslint/comma-dangle': ['error'],

		'space-before-blocks': 'off',
		'@typescript-eslint/space-before-blocks': ['error'],

		'semi': 'off',
		'@typescript-eslint/semi': ['error'],

		'no-unused-vars': 'off',
		'@typescript-eslint/no-unused-vars': ['warn'],

		'comma-spacing': 'off',
  		'@typescript-eslint/comma-spacing': ['error'],

		'quotes': 'off',
		'@typescript-eslint/quotes': ['error', 'single'],

		'@typescript-eslint/no-explicit-any': 'error',
		'@typescript-eslint/no-floating-promises': 'off',

		'no-unused-vars': 'off',
  		'@typescript-eslint/no-unused-vars': ['error', { 'ignoreRestSiblings': true, 'varsIgnorePattern': '^_' }],

		'semi-spacing': ['error', { before: false, after: false }],
		'block-spacing': 'error',
		'no-whitespace-before-property': 'error',
		'keyword-spacing': ['error', { before: true }],
		'object-curly-spacing': ['error', 'always'],
		'array-bracket-spacing': ['error', 'never'],
		'key-spacing': ['error', { beforeColon: false, afterColon: true }],
		'no-trailing-spaces': 'error',
		'no-multi-spaces': 'error',
		'no-fallthrough': 'off'

	// 	'@typescript-eslint/interface-name-prefix': 'off',
	// 	'@typescript-eslint/explicit-function-return-type': 'off',
	// 	'@typescript-eslint/explicit-module-boundary-types': 'off',
	}
};
