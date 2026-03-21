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
					background: '#020617', // 🔥 même couleur que ton site
					color: 'white',
				}}
			>
				<ClientProviders />

				{/* ❌ PAS de padding ici */}
				{children}
			</body>
		</html>
	);
}