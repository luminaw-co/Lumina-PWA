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
		src: `${imgsRoute}automation.webp`,
	},
];

function getTranslateX(el) {
	if (!el) return 0;
	const st = getComputedStyle(el).transform;
	if (!st || st === "none") return 0;
	const match = st.match(/matrix\((.+)\)/);
	if (match) {
		const vals = match[1].split(",").map(Number);
		return vals[4] || 0;
	}
	const match3d = st.match(/matrix3d\((.+)\)/);
	if (match3d) {
		const vals = match3d[1].split(",").map(Number);
		return vals[12] || 0;
	}
	return 0;
}

export default function ServicesSlider({ items = defaultItems, speed = 30 }) {
	const duration = Math.max(8, Number(speed) || 30);
	const controls = useAnimation();
	const containerRef = useRef(null);
	const trackRef = useRef(null);
	const startAnimationRef = useRef(null);
	const [renderItems, setRenderItems] = useState([...items, ...items]);
	const [hoverIndex, setHoverIndex] = useState(null);

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

		const startAnimation = () => {
			const shift = track.scrollWidth / 2;
			controls.stop();
			controls.set({ x: 0 });
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

		startAnimationRef.current = startAnimation;

		const raf = requestAnimationFrame(() => {
			startAnimation();
		});

		const onResize = () => {
			controls.stop();
			setTimeout(
				() => startAnimationRef.current && startAnimationRef.current(),
				50,
			);
		};

		window.addEventListener("resize", onResize);
		return () => {
			cancelAnimationFrame(raf);
			window.removeEventListener("resize", onResize);
		};
	}, [controls, duration, renderItems]);

	const handleMouseEnter = (visibleIdx) => {
		setHoverIndex(visibleIdx);
		controls.stop();
	};

	const handleMouseLeave = () => {
		setHoverIndex(null);
		const track = trackRef.current;
		if (!track || !startAnimationRef.current) return;
		const shift = track.scrollWidth / 2;
		const currentX = getTranslateX(track);
		controls.stop();
		controls.start({
			x: [currentX, currentX - shift],
			transition: {
				duration,
				ease: "linear",
				repeat: Infinity,
				repeatType: "loop",
			},
		});
	};

	return (
		<div
			ref={containerRef}
			className="w-full max-w-[1424px] m-auto overflow-hidden h-max-content py-5 relative"
		>
			<motion.div
				ref={trackRef}
				className="flex items-center gap-6 z-0"
				initial={false}
				animate={controls}
				style={{ willChange: "transform" }}
			>
				{renderItems.map((it, idx) => {
					const visibleIdx = idx % items.length;
					const isHovered = hoverIndex === visibleIdx;
					return (
						<div
							key={`${it.id ?? idx}-${idx}`}
							onMouseEnter={() => handleMouseEnter(visibleIdx)}
							onMouseLeave={handleMouseLeave}
							className="relative flex-shrink-0 w-1/3 md:w-1/4 lg:w-1/4 aspect-[4/3] rounded-xl overflow-hidden shadow-md shadow-[var(--shadow-base)] bg-[var(--bg-card)]"
						>
							<img
								src={it.src}
								alt={it.title}
								className="w-full h-full object-cover"
								loading="lazy"
							/>
							<div className="absolute left-0 bottom-0 w-full h-3/4 px-4 bg-gradient-to-t from-[var(--brand-dark)] to-transparent text-[var(--brand-blue)] text-2xl font-semibold flex items-end justify-center pb-5">
								{it.title}
							</div>

							{isHovered && (
								<div className="absolute inset-0 bg-black/65 flex flex-col items-center justify-center gap-4 px-4 text-center text-white">
									<h3 className="text-[18px] md:text-[20px] font-semibold">
										{it.title}
									</h3>
									<p className="text-sm md:text-base max-w-[220px]">
										{it.desc}
									</p>
									<div className="text-lg md:text-xl font-semibold">
										USD {it.priceUsd}
									</div>
									<a
										href={`https://wa.me/?text=${encodeURIComponent(
											`Hola, quiero cotizar: ${it.title} - USD ${it.priceUsd}`,
										)}`}
										target="_blank"
										rel="noreferrer"
										className="inline-block bg-[var(--brand-blue)] text-white px-4 py-2 rounded-md text-sm md:text-base"
									>
										cotizar en whatsapp
									</a>
								</div>
							)}
						</div>
					);
				})}
			</motion.div>
			<div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-20 bg-gradient-to-r from-[var(--bg-page)] via-[rgba(255,255,255,0)] to-transparent opacity-95"></div>
			<div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-20 bg-gradient-to-l from-[var(--bg-page)] via-[rgba(255,255,255,0)] to-transparent opacity-95"></div>
		</div>
	);
}
