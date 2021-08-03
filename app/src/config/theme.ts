import { createTheme } from '@shopify/restyle';

const theme = createTheme({
	breakpoints: {},
	colors: {
		primary: '#7F26B7',
		danger: '#D5293C',
		dark: '#222',
		black: '#000',
		light: '#DEDCDB',
		light50: 'rgba(222, 220, 219, 0.5)',
	},
	spacing: {
		sm: 8,
		md: 16,
		lg: 24,
		xl: 40,
	},
	borderRadii: {
		sm: 8,
		md: 16,
		lg: 24,
		xl: 40,
	},

	zIndices: {},
});

export type Theme = typeof theme;
export default theme;
