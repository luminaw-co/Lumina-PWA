import type { APIContext } from "astro";
import fs from "fs/promises";
import path from "path";

function escapeCsv(value: unknown) {
	return `"${String(value ?? "").replace(/"/g, '""')}"`;
}

export async function POST({ request }: APIContext) {
	try {
		const form = await request.formData();
		const name = String(form.get("name") ?? "");
		const email = String(form.get("email") ?? "");
		const phone = String(form.get("phone") ?? "");
		const objective = String(form.get("objective") ?? "");
		const message = String(form.get("message") ?? "");
		const source = String(form.get("source") ?? "");
		const timestamp = new Date().toISOString();

		const dataDir = path.join(process.cwd(), "data");
		await fs.mkdir(dataDir, { recursive: true });
		const csvPath = path.join(dataDir, "leads.csv");

		try {
			await fs.access(csvPath);
		} catch {
			const header =
				"timestamp,name,email,phone,objective,message,source\n";
			await fs.writeFile(csvPath, header, "utf8");
		}

		const row =
			[timestamp, name, email, phone, objective, message, source]
				.map(escapeCsv)
				.join(",") + "\n";

		await fs.appendFile(csvPath, row, "utf8");

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
