import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";

const imgsRoute = "/images/services/";

const defaultItems = [
	{ id: "ui", title: "Diseño UX/UI", src: `${imgsRoute}ui-design.webp` },
	{
		id: "web",
		title: "Desarrollo web",
		src: `${imgsRoute}web-development.webp`,
	},
	{
		id: "consult",
		title: "Consultorías",
		src: `${imgsRoute}consulting.webp`,
	},
];

export default function ServicesSlider({ items = defaultItems, speed = 30 }) {
	const duration = Math.max(8, Number(speed) || 30);
	const controls = useAnimation();
	const containerRef = useRef(null);
	const trackRef = useRef(null);
	const [renderItems, setRenderItems] = useState([...items, ...items]);

	useLayoutEffect(() => {
		const container = containerRef.current;
		const track = trackRef.current;
		if (!container || !track) return;
		if (track.children.length < items.length) return;

		const containerWidth = container.clientWidth;
		let oneSetWidth = 0;
		for (let i = 0; i < items.length; i++) {
			const el = track.children[i];
			if (!el) break;
			const rect = el.getBoundingClientRect();
			oneSetWidth += rect.width;
		}

		const minTotal = containerWidth * 2;
		let reps = Math.max(1, Math.ceil(minTotal / Math.max(1, oneSetWidth)));
		const arr = [];
		for (let r = 0; r < reps; r++) arr.push(...items);
		setRenderItems([...arr, ...arr]);
	}, [items]);

	useEffect(() => {
		const track = trackRef.current;
		if (!track) return;

		let raf = null;
		const startAnimation = () => {
			const shift = track.scrollWidth / 2;
			controls.stop();
			controls.start({
				x: [0, -shift],
				transition: {
					duration,
					ease: "linear",
					repeat: Infinity,
					repeatType: "loop",
				},
			});
		};

		raf = requestAnimationFrame(() => {
			startAnimation();
		});

		const onResize = () => {
			controls.stop();
			setTimeout(startAnimation, 50);
		};

		window.addEventListener("resize", onResize);
		return () => {
			if (raf) cancelAnimationFrame(raf);
			window.removeEventListener("resize", onResize);
		};
	}, [controls, duration, renderItems]);

	return (
		<div
			ref={containerRef}
			className="w-full max-w-[1424px] m-auto overflow-hidden"
		>
			<motion.div
				ref={trackRef}
				className="flex items-center gap-6"
				initial={false}
				animate={controls}
				style={{ willChange: "transform" }}
			>
				{renderItems.map((it, idx) => (
					<div
						key={`${it.id ?? idx}-${idx}`}
						className="relative flex-shrink-0 w-1/3 md:w-1/4 lg:w-1/4 aspect-[4/3] rounded-2xl overflow-hidden shadow-lg bg-[var(--bg-card)]"
					>
						<img
							src={it.src}
							alt={it.title}
							className="w-full h-full object-cover"
							loading="lazy"
						/>
						<div className="absolute left-0 bottom-0 w-full px-4 py-3 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-transparent text-white text-base">
							{it.title}
						</div>
					</div>
				))}
			</motion.div>
		</div>
	);
}
