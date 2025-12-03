import type { APIContext } from "astro";
import fs from "fs/promises";
import path from "path";

function escapeCsv(value: string) {
	if (value == null) return "";
	return `"${String(value).replace(/"/g, '""')}"`;
}

export async function POST({ request }: APIContext) {
	console.log("POST /api/submit-contact");
	try {
		const form = await request.formData();
		console.log("formData:", Array.from(form.entries()));
		const name = String(form.get("name") ?? "");
		const email = String(form.get("email") ?? "");
		const phone = String(form.get("phone") ?? "");
		const source = String(form.get("source") ?? "");
		console.log({ name, email, phone, source });

		const timestamp = new Date().toISOString();

		const row =
			[
				escapeCsv(timestamp),
				escapeCsv(name),
				escapeCsv(email),
				escapeCsv(phone),
			].join(",") + "\n";

		const dataDir = path.join(process.cwd(), "data");
		const csvPath = path.join(dataDir, "contacts.csv");

		await fs.mkdir(dataDir, { recursive: true });

		try {
			await fs.access(csvPath);
		} catch {
			const header = "timestamp,name,email,phone\n";
			await fs.writeFile(csvPath, header, "utf8");
		}

		await fs.appendFile(csvPath, row, "utf8");

		return new Response(JSON.stringify({ ok: true }), { status: 200 });
	} catch (err) {
		console.error("Error:", err);
		return new Response("No se pudo leer los datos del formulario", {
			status: 400,
		});
	}
}

export const prerender = false;
