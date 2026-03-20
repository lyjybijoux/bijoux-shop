import './globals.css';
import ClientProviders from '@/components/ClientProviders';

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="fr">
			<body
				style={{
					margin: 0,
					background: '#0f172a',
					color: 'white',
					minHeight: '100vh',
				}}
			>
				{/* 🔌 Tout ce qui est interactif */}
				<ClientProviders />

				{/* 📦 Contenu des pages */}
				<main style={{ padding: 16 }}>
					{children}
				</main>
			</body>
		</html>
	);
}