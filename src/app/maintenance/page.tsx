export default function MaintenancePage() {
	return (
		<main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 20 }}>
			<h1>🚧 Site en construction</h1>
			<p>Inscris-toi pour être prévenu du lancement ✨</p>

			<input placeholder="Ton email" style={{ padding: 10 }} />
			<button style={{ padding: 10 }}>Me prévenir</button>
		</main>
	);
}