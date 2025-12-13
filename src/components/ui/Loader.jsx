import React from "react";

export default function Loader({
	size = "md",
	colorClass = "bg-[var(--brand-blue)]",
	className = "",
	label = "Cargando...",
	fullScreen = false,
}) {
	const sizeMap = {
		sm: "w-3 h-3",
		md: "w-12 h-12",
		lg: "w-6 h-6",
	};

	const sizeClass =
		typeof size === "string" ? (sizeMap[size] ?? sizeMap.md) : "";

	const dotStyle =
		typeof size === "number"
			? { width: `${size}px`, height: `${size}px` }
			: undefined;

	return (
		<div
			className={`${fullScreen ? "fixed inset-0 z-50 flex items-center justify-center" : "inline-flex items-center justify-center"} ${className}`}
			role="status"
			aria-live="polite"
			aria-label={label}
		>
			<div
				className={`${fullScreen ? "w-full h-full flex items-center justify-center bg-[var(--bg-page)]" : "bg-[var(--bg-page)] p-3 rounded-md"} `}
			>
				<div className="flex items-center justify-center gap-4">
					<span
						className={`inline-block ${sizeClass} ${colorClass} rounded-sm loader-anim`}
						style={{ ...dotStyle, animationDelay: "0ms" }}
						aria-hidden="true"
					/>
					<span
						className={`inline-block ${sizeClass} ${colorClass} rounded-sm loader-anim`}
						style={{ ...dotStyle, animationDelay: "150ms" }}
						aria-hidden="true"
					/>
					<span
						className={`inline-block ${sizeClass} ${colorClass} rounded-sm loader-anim`}
						style={{ ...dotStyle, animationDelay: "300ms" }}
						aria-hidden="true"
					/>
				</div>
			</div>

			<span className="sr-only">{label}</span>

			<style>{`
        .loader-anim {
          transform-origin: center;
          animation: loader-pulse 900ms cubic-bezier(.2,.9,.3,1) infinite;
        }
        @keyframes loader-pulse {
          0% { transform: scale(.6); opacity: .7; }
          50% { transform: scale(1.05); opacity: 1; }
          100% { transform: scale(.6); opacity: .7; }
        }

        .sr-only {
          position: absolute !important;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0,0,0,0);
          white-space: nowrap;
          border: 0;
        }
      `}</style>
		</div>
	);
}
