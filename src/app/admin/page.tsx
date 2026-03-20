const AdminHomePage = () => {
	return (
		<main>
			<h1 style={{ marginTop: 0, color: 'gold' }}>
				Tableau de bord
			</h1>

			<p style={{ opacity: 0.8 }}>
				Bienvenue dans l’interface admin de ta boutique.
			</p>

			<div
				style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
					gap: 16,
					marginTop: 24,
				}}
			>
				<div
					style={{
						padding: 20,
						borderRadius: 16,
						background: '#111827',
						border: '1px solid rgba(255,255,255,0.08)',
					}}
				>
					<h2 style={{ marginTop: 0 }}>Produits</h2>
					<p style={{ opacity: 0.7, marginBottom: 0 }}>
						Ajoute, supprime et gère les stocks.
					</p>
				</div>

				<div
					style={{
						padding: 20,
						borderRadius: 16,
						background: '#111827',
						border: '1px solid rgba(255,255,255,0.08)',
					}}
				>
					<h2 style={{ marginTop: 0 }}>Catégories</h2>
					<p style={{ opacity: 0.7, marginBottom: 0 }}>
						Classe les produits par famille.
					</p>
				</div>

				<div
					style={{
						padding: 20,
						borderRadius: 16,
						background: '#111827',
						border: '1px solid rgba(255,255,255,0.08)',
					}}
				>
					<h2 style={{ marginTop: 0 }}>Thèmes</h2>
					<p style={{ opacity: 0.7, marginBottom: 0 }}>
						Mariage, naissance, anniversaire...
					</p>
				</div>
			</div>
		</main>
	);
};

export default AdminHomePage;