export const POST = async (req: Request) => {
	const { email } = await req.json();

	if (!email) {
		return new Response(JSON.stringify({ error: 'Email requis' }), {
			status: 400,
		});
	}

	console.log('📩 Nouvel email:', email);

	// 👉 pour l’instant on log (on pourra stocker après)

	return new Response(JSON.stringify({ success: true }), {
		status: 200,
	});
};