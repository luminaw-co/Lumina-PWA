/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{astro,html,js,ts,jsx,tsx,vue,svelte}"],
	darkMode: "class",
	theme: {
		extend: {
			fontFamily: {
				display: [
					"Poppins",
					"ui-sans-serif",
					"system-ui",
					"sans-serif",
				],
				body: ["Raleway", "ui-sans-serif", "system-ui", "sans-serif"],
			},
			colors: {
				bg: {
					page: "var(--bg-page)",
					card: "var(--bg-card)",
				},
				text: {
					primary: "var(--text-primary)",
					button: "var(--text-button)",
				},
				accent: {
					primary: "var(--accent-primary)",
					link: "var(--accent-link)",
					hover: "var(--accent-hover)",
				},
				border: {
					base: "var(--border-base)",
				},
				brand: {
					light: "var(--brand-light)",
					dark: "var(--brand-dark)",
					blue: "var(--brand-blue)",
				},
				status: {
					success: "var(--status-success)",
					error: "var(--status-error)",
					warning: "var(--status-warning)",
					disabled: "var(--status-disabled)",
					info: "var(--status-info)",
				},
			},
			spacing: {
				4: "4px",
				8: "8px",
				12: "12px",
				16: "16px",
				24: "24px",
				32: "32px",
				40: "40px",
				64: "64px",
				120: "120px",
				"space-4": "var(--space-4)",
				"space-8": "var(--space-8)",
				"space-12": "var(--space-12)",
				"space-16": "var(--space-16)",
				"space-24": "var(--space-24)",
				"space-32": "var(--space-32)",
				"space-40": "var(--space-40)",
				"space-64": "var(--space-64)",
				"space-120": "var(--space-120)",
			},
			borderRadius: {
				sm: "var(--radius-sm)",
				md: "var(--radius-md)",
				lg: "var(--radius-lg)",
			},
			fontSize: {
				"heading-1": ["var(--heading-1)", { lineHeight: "120%" }],
				"heading-2": ["var(--heading-2)", { lineHeight: "120%" }],
				"heading-3": ["var(--heading-3)", { lineHeight: "130%" }],
				"heading-4": ["var(--heading-4)", { lineHeight: "130%" }],
				"heading-5": ["var(--heading-5)", { lineHeight: "140%" }],
				"body-xl": ["var(--body-xl)", { lineHeight: "150%" }],
				"body-lg": ["var(--body-lg)", { lineHeight: "150%" }],
				"body-md": ["var(--body-md)", { lineHeight: "150%" }],
				"body-sm": ["var(--body-sm)", { lineHeight: "150%" }],
				"button-lg": ["var(--button-lg)"],
				"button-sm": ["var(--button-sm)"],
			},
			boxShadow: {
				elevation: "0 1px 3px 0 var(--shadow-base)",
			},
		},
		screens: {
			md: "768px",
			lg: "1024px",
			xl: "1064px",
			"2xl": "1624px",
		},
	},
	plugins: [],
};
