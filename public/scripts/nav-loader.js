(() => {
	const ID = "global-loader";
	const loader = document.getElementById(ID);
	if (!loader) return;
	let safetyTimer;
	const SAFETY_TIMEOUT = 10000;
	const show = () => {
		loader.classList.remove("hidden");
		loader.setAttribute("aria-hidden", "false");
		clearTimeout(safetyTimer);
		safetyTimer = setTimeout(() => hide(), SAFETY_TIMEOUT);
	};
	const hide = () => {
		loader.classList.add("hidden");
		loader.setAttribute("aria-hidden", "true");
		clearTimeout(safetyTimer);
	};
	window.showGlobalLoader = show;
	window.hideGlobalLoader = hide;
	const isInternal = (anchor) => {
		if (!anchor || !anchor.getAttribute) return false;
		const href = anchor.getAttribute("href") || "";
		if (
			!href ||
			href.startsWith("mailto:") ||
			href.startsWith("tel:") ||
			href.startsWith("javascript:")
		)
			return false;
		if (anchor.target === "_blank" || anchor.hasAttribute("download"))
			return false;
		if (anchor.dataset && anchor.dataset.noLoader !== undefined)
			return false;
		try {
			const url = new URL(href, location.href);
			if (url.origin !== location.origin) return false;
			if (
				url.pathname === location.pathname &&
				url.hash &&
				url.search === location.search
			)
				return false;
			return true;
		} catch (e) {
			return false;
		}
	};
	document.addEventListener(
		"click",
		(ev) => {
			const a = ev.target.closest && ev.target.closest("a");
			if (!a) return;
			if (isInternal(a)) show();
		},
		true,
	);
	document.addEventListener("submit", function (e) {
		if (
			e?.submitter?.dataset?.noLoader === "true" ||
			e.target?.dataset?.noLoader === "true"
		) {
			return;
		}
	});
	window.addEventListener("beforeunload", show);
	window.addEventListener("DOMContentLoaded", hide);
	window.addEventListener("pageshow", hide);
})();
