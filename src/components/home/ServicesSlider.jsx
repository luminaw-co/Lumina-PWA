import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";

const imgsRoute = "/images/services/";

const defaultItems = [
	{
		id: "audit",
		title: "Auditoría web",
		src: `${imgsRoute}audit.jpg`,
		desc: "Revisión de código y diseño de un sitio y sugerencias de corrección.",
		priceUsd: 120,
	},
	{
		id: "consult-ux",
		title: "Consultoría UX/UI",
		src: `${imgsRoute}consulting.jpg`,
		desc: "Sesiones 1:1 sobre diseño o desarrollo.",
		priceUsd: 150,
	},
	{
		id: "landing",
		title: "Desarrollo de landing page",
		src: `${imgsRoute}dev-landing.jpg`,
		desc: "Desarrollo de página web estática e informativa (1 página con 4 secciones principales y CTA).",
		priceUsd: 250,
	},
	{
		id: "pwa-ui",
		title: "Diseño de PWA",
		src: `${imgsRoute}pwa-design.jpg`,
		desc: "Diseño de aplicación web progresiva desde 6 hasta 20 páginas.",
		priceUsd: 720,
	},
	{
		id: "multipage",
		title: "Desarrollo de sitio web",
		src: `${imgsRoute}dev-site.jpg`,
		desc: "Desarrollo de página web responsiva desde 3 hasta 10 páginas.",
		priceUsd: 750,
	},
	{
		id: "landing-ui",
		title: "Diseño de landing page",
		src: `${imgsRoute}landing-design.jpg`,
		desc: "Diseño de página web estática e informativa (1 pantalla con 4 secciones principales y CTA).",
		priceUsd: 100,
	},
	{
		id: "ux-review",
		title: "Revisión UX",
		src: `${imgsRoute}review.jpg`,
		desc: "Revisión de cumplimiento de principios de diseño UX.",
		priceUsd: 80,
	},
	{
		id: "site-ui",
		title: "Diseño de sitio web",
		src: `${imgsRoute}site-design.jpg`,
		desc: "Diseño de sitio web con varias páginas (desde 3 pantallas).",
		priceUsd: 750,
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

export default function ServicesSlider({ items = defaultItems, speed = 80 }) {
	const duration = Math.max(20, Number(speed) || 80);
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
			className="w-full max-w-[1424px] m-auto overflow-hidden h-max-content py-5 relative fadeup"
		>
			<motion.div
				ref={trackRef}
				className="flex items-center gap-10 z-0"
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
							className="relative flex-shrink-0 w-[300px] h-[380px] md:w-[340px] md:h-[420px] rounded-lg overflow-hidden shadow-md shadow-[var(--shadow-base)] bg-[var(--bg-card)]"
						>
							<img
								src={it.src}
								alt={it.title}
								className="w-full h-full object-cover"
								loading="lazy"
							/>
							<div className="absolute left-0 bottom-0 w-full h-3/4 px-4 bg-gradient-to-t from-[var(--brand-dark)] to-transparent text-[var(--brand-blue)] text-2xl font-semibold flex items-end justify-center pb-5 text-center">
								{it.title}
							</div>

							<motion.div
								initial={{ y: "100%", opacity: 0 }}
								animate={
									isHovered
										? { y: "0%", opacity: 1 }
										: { y: "100%", opacity: 0 }
								}
								transition={{ duration: 0.28, ease: "easeOut" }}
								className="absolute inset-0 bg-black/85 flex flex-col items-stretch justify-center gap-6 px-3 text-white"
							>
								<h3 className="w-full text-[18px] md:text-[20px] font-semibold text-center">
									{it.title}
								</h3>
								<p className="w-full text-sm md:text-base text-center">
									{it.desc}
								</p>
								<div className="w-full text-sm italic font-semibold text-center">
									Desde USD {it.priceUsd}
								</div>
								<a
									href={`https://wa.me/573021011753?text=${encodeURIComponent(
										`Hola, quiero cotizar: ${it.title} - desde USD ${it.priceUsd}`,
									)}`}
									target="_blank"
									rel="noreferrer"
									className="link"
								>
									Cotizar por WhatsApp
								</a>
							</motion.div>
						</div>
					);
				})}
			</motion.div>
			<div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-20 bg-gradient-to-r from-[var(--bg-page)] via-[rgba(255,255,255,0)] to-transparent opacity-95"></div>
			<div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-20 bg-gradient-to-l from-[var(--bg-page)] via-[rgba(255,255,255,0)] to-transparent opacity-95"></div>
		</div>
	);
}
