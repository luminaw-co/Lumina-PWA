import { motion } from "framer-motion";
const imgsRoute = "/images/";

const imgsSrc = {
	services: `${imgsRoute}services/`,
};

export default function FloatingCards() {
	return (
		<div className="relative w-[480px] h-[420px] flex items-center justify-center z-20">
			{/* Tarjeta 1: arriba izquierda (pequeña, más cerca) */}
			<motion.div
				animate={{ y: [0, -32, 0] }}
				transition={{
					duration: 10,
					repeat: Infinity,
					repeatDelay: 0,
					delay: 0,
				}}
				className="absolute left-12 top-16 w-[180px] h-[110px] flex items-center justify-center overflow-hidden rounded-3xl shadow-md"
				style={{
					background: "var(--bg-card)",
					boxShadow: "0 4px 16px 0 rgba(153,153,153,0.35)", // sombra más difuminada
				}}
			>
				<img
					src={`${imgsSrc.services}ui-design.webp`}
					alt="Diseño UX/UI"
					className="w-full h-full object-cover rounded-3xl"
					width={180}
					height={110}
					loading="lazy"
				/>
			</motion.div>
			{/* Tarjeta 2: centro derecha, más abajo (mediana, más cerca) */}
			<motion.div
				animate={{ y: [0, -32, 0] }}
				transition={{
					duration: 16,
					repeat: Infinity,
					repeatDelay: 0,
					delay: 0,
				}}
				className="absolute right-16 top-12 w-[220px] h-[140px] flex items-center justify-center overflow-hidden rounded-3xl shadow-md"
				style={{
					background: "var(--bg-card)",
					boxShadow: "0 4px 16px 0 rgba(153,153,153,0.35)", // sombra más difuminada
				}}
			>
				<img
					src={`${imgsSrc.services}web-development.webp`}
					alt="Desarrollo"
					className="w-full h-full object-cover rounded-3xl"
					width={220}
					height={140}
					loading="lazy"
				/>
			</motion.div>
			{/* Tarjeta 3: abajo centro, más a la izquierda (grande, más cerca) */}
			<motion.div
				animate={{ y: [0, -32, 0] }}
				transition={{
					duration: 12,
					repeat: Infinity,
					repeatDelay: 0,
					delay: 0,
				}}
				className="absolute left-32 right-8 bottom-8 w-[280px] h-[180px] flex items-center justify-center overflow-hidden rounded-3xl shadow-md"
				style={{
					background: "var(--bg-card)",
					boxShadow: "0 4px 16px 0 rgba(153,153,153,0.35)",
				}}
			>
				<img
					src={`${imgsSrc.services}automation.webp`}
					alt="Automatización"
					className="w-full h-full object-cover rounded-3xl"
					width={280}
					height={180}
					loading="lazy"
				/>
			</motion.div>
		</div>
	);
}
