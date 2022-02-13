import { createTheme } from '@shopify/restyle';

const palette = {
	black: '#000000',
	white: '#F0F2F3',

	primary: '#facc15',
	secondary: '#f59e0b',

	danger: '#c0564a',

	gray: '#888',
};

const theme = createTheme({
	colors: {
		black: palette.black,
		white: palette.white,
		primary: palette.primary,
		secondary: palette.secondary,
		danger: palette.danger,
		gray: palette.gray,
		transparent: 'transparent',
	},
	spacing: {
		s: 8,
		m: 16,
		l: 24,
		xl: 40,
	},
	breakpoints: {
		phone: 0,
		tablet: 768,
	},
	textVariants: {
		title1: {
			fontSize: 35,
			fontFamily: 'Poppins-800',
			fontWeight: '800',
		},
		title2: {
			fontSize: 20,
			fontFamily: 'Poppins-600',
			fontWeight: '600',
		},
		title3: {
			fontSize: 18,
			fontFamily: 'Poppins-600',
			fontWeight: '600',
		},
		body: {
			fontSize: 16,
			lineHeight: 24,
			fontFamily: 'Poppins-400',
		},
		button: {
			fontSize: 15,
			fontFamily: 'Poppins-600',
			fontWeight: '600',
			textAlign: 'center',
			letterSpacing: 0.35,
		},
		link: {
			fontFamily: 'Poppins-300',
			fontSize: 14,
		},
		label: {
			fontFamily: 'Poppins-600',
			fontSize: 14,
		},
		formError: {
			fontFamily: 'Poppins-500',
			fontSize: 13,
			color: 'danger',
		},
	},
});

export type Theme = typeof theme;
export default theme;
