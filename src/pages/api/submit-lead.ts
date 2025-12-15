import type { APIContext } from "astro";
import { Client } from "@notionhq/client";

export async function POST({ request }: APIContext) {
	try {
		const NOTION_TOKEN = process.env.NOTION_TOKEN;
		const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;

		if (!NOTION_TOKEN || !NOTION_DATABASE_ID) {
			console.error("Missing NOTION_TOKEN or NOTION_DATABASE_ID");
			return new Response(
				JSON.stringify({
					ok: false,
					error: "Server env not configured",
				}),
				{
					status: 500,
					headers: { "Content-Type": "application/json" },
				},
			);
		}

		const notion = new Client({ auth: NOTION_TOKEN });

		const form = await request.formData();
		const nombre = String(form.get("name") ?? "");
		const correo = String(form.get("email") ?? "");
		const telefonoRaw = form.get("phone");
		const telefono = telefonoRaw ? String(telefonoRaw).trim() : "";
		const objetivo = String(form.get("objective") ?? "Agenda rápida");
		const mensaje = String(form.get("message") ?? "Sin mensaje");
		const acquisition =
			String(
				form.get("sent_at") ?? form.get("acquisition") ?? "",
			).trim() || new Date().toISOString();
		const source = String(form.get("source") ?? "");

		await notion.pages.create({
			parent: { database_id: NOTION_DATABASE_ID },
			properties: {
				Name: { title: [{ text: { content: nombre } }] },
				Email: { email: correo || null },
				Phone: telefono
					? { phone_number: telefono }
					: { phone_number: null },
				Objective: { select: { name: objetivo || "Agenda rápida" } },
				Message: {
					rich_text: [
						{ text: { content: mensaje || "Sin mensaje" } },
					],
				},
				Date: { date: { start: acquisition } },
				Source: { select: { name: source } },
			},
		});

		return new Response(JSON.stringify({ ok: true }), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	} catch (err) {
		console.error("submit-lead error:", err);
		return new Response(JSON.stringify({ ok: false, error: String(err) }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}
}

export const prerender = false;
