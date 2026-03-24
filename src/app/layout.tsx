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
					background: '#020617',
					color: 'white',
				}}
			>
				<ClientProviders />
				{children}
			</body>
		</html>
	);
}