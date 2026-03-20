'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

import useCartStore from '../store/cart';
import useAuthStore from '../store/auth';
import useAdminProductsStore from '../store/adminProducts';
import useAdminCategoriesStore from '../store/adminCategories';
import useAdminThemesStore from '../store/adminThemes';
import FiltersMenu from '@/components/FiltersMenu';

const MAINTENANCE = true;

// 💎 COMING SOON
const ComingSoon = () => {
	const [email, setEmail] = useState('');
	const [sent, setSent] = useState(false);

	const handleSubmit = () => {
		if (!email) return;

		const existing = JSON.parse(localStorage.getItem('emails') || '[]');
		localStorage.setItem('emails', JSON.stringify([...existing, email]));

		setSent(true);
	};

	return (
		<main className="relative min-h-screen flex items-center justify-center bg-black text-white overflow-hidden px-6">
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_70%)]" />

			<div className="relative z-10 text-center max-w-md w-full">
				<h1 className="text-5xl md:text-6xl font-semibold tracking-tight mb-6">
					LYJY
				</h1>

				<p className="text-lg text-white/70 mb-8">
					Une nouvelle collection de bijoux arrive bientôt.
				</p>

				<div className="h-px w-24 mx-auto bg-white/20 mb-8" />

				{sent ? (
					<p className="text-green-400 text-sm">
						Merci 💎 Tu seras informé du lancement.
					</p>
				) : (
					<div className="flex flex-col gap-3">
						<input
							type="email"
							placeholder="Ton email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white outline-none"
						/>

						<button
							onClick={handleSubmit}
							className="px-4 py-3 rounded-lg bg-white text-black font-medium hover:opacity-90 transition"
						>
							Être prévenu
						</button>
					</div>
				)}

				<p className="text-xs text-white/40 mt-6">
					Lancement prochainement
				</p>
			</div>
		</main>
	);
};

// 🛍️ HOME
const Home = () => {
	const searchParams = useSearchParams();
	const preview = searchParams.get('preview') === 'true';

	const addToCart = useCartStore((state) => state.addToCart);
	const clearCart = useCartStore((state) => state.clearCart);

	const user = useAuthStore((state) => state.user);
	const logout = useAuthStore((state) => state.logout);
	const hasAuthHydrated = useAuthStore((state) => state.hasHydrated);

	const products = useAdminProductsStore((state) => state.products);
	const hasProductsHydrated = useAdminProductsStore((state) => state.hasHydrated);

	useAdminCategoriesStore((state) => state.categories);
	useAdminThemesStore((state) => state.themes);

	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
	const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
	const [openMenu, setOpenMenu] = useState(false);

	if (!hasAuthHydrated || !hasProductsHydrated) return null;

	const filteredProducts = products.filter((product) => {
		if (selectedCategory && product.categoryId !== selectedCategory) return false;
		if (selectedTheme && product.themeId !== selectedTheme) return false;
		return true;
	});

	// 🔥 MAINTENANCE + ACCÈS SECRET
	if (MAINTENANCE && !preview) return <ComingSoon />;

	return (
		<main className="site" style={{ paddingTop: 80 }}>
			<header style={navbar}>
				<img src="/logo-transparent.png" style={{ height: 40 }} />

				<div style={{ display: 'flex', gap: 10 }}>
					{user ? (
						<>
							<Link href="/account" style={btnOutline}>
								Mon compte
							</Link>

							<button
								style={btnGold}
								onClick={() => {
									logout();
									clearCart();
								}}
							>
								Déconnexion
							</button>
						</>
					) : (
						<>
							<Link href="/login" style={btnOutline}>
								Connexion
							</Link>

							<Link href="/register" style={btnGold}>
								Inscription
							</Link>
						</>
					)}
				</div>
			</header>

			<button onClick={() => setOpenMenu(!openMenu)} style={menuButton}>
				☰ Menu
			</button>

			{openMenu && (
				<div style={menuBox}>
					<FiltersMenu
						selectedCategory={selectedCategory}
						setSelectedCategory={setSelectedCategory}
						selectedTheme={selectedTheme}
						setSelectedTheme={setSelectedTheme}
					/>
				</div>
			)}

			<section style={hero}>
				<div style={heroContent}>
					<img src="/logo-transparent.png" style={heroLogo} />
					<p style={heroText}>
						Des créations uniques inspirées par l’élégance et le raffinement.
					</p>
				</div>
			</section>

			<section>
				<div style={heading}>
					<p style={{ opacity: 0.6 }}>Boutique</p>
					<h2>Nos créations</h2>
				</div>

				<div style={grid}>
					{filteredProducts.map((product) => (
						<Link
							key={product.id}
							href={`/product/${product.id}`}
							style={{ textDecoration: 'none', color: 'inherit' }}
						>
							<article style={card}>
								<img src={product.image || '/placeholder.png'} style={image} />

								<div style={content}>
									<h3 style={title}>{product.name}</h3>
									<p style={price}>{product.price} €</p>

									<button
										style={btnGold}
										onClick={(e) => {
											e.preventDefault();
											e.stopPropagation();

											addToCart({
												id: product.id,
												title: product.name,
												price: product.price,
												quantity: 1,
											});
										}}
									>
										Ajouter
									</button>
								</div>
							</article>
						</Link>
					))}
				</div>
			</section>
		</main>
	);
};

export default Home;

// 🎨 STYLES (inchangés)
const navbar = {
	position: 'fixed' as const,
	top: 0,
	left: 0,
	width: '100%',
	height: 80,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	padding: '0 20px',
	background: '#020617',
	zIndex: 1000,
};

const menuButton = {
	position: 'fixed' as const,
	top: 90,
	left: 20,
	padding: '10px 14px',
	borderRadius: 10,
	background: '#020617',
	color: 'white',
	border: '1px solid rgba(255,255,255,0.1)',
	cursor: 'pointer',
	zIndex: 1000,
};

const menuBox = {
	position: 'fixed' as const,
	top: 140,
	left: 20,
	width: 260,
	maxHeight: 'calc(100vh - 160px)',
	overflowY: 'auto' as const,
	padding: 16,
	borderRadius: 16,
	background: '#020617',
	border: '1px solid rgba(255,255,255,0.08)',
	boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
	zIndex: 999,
};

const hero = {
	display: 'flex',
	justifyContent: 'center',
	paddingTop: 10,
	paddingBottom: 10,
};

const heroContent = {
	display: 'flex',
	flexDirection: 'column' as const,
	alignItems: 'center',
	gap: 4,
	marginTop: -20,
};

const heroLogo = {
	width: 200,
};

const heroText = {
	fontSize: 14,
	opacity: 0.8,
	textAlign: 'center' as const,
};

const heading = {
	textAlign: 'center' as const,
	marginTop: 20,
};

const grid = {
	display: 'grid',
	gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
	gap: 20,
	padding: 20,
};

const card = {
	borderRadius: 16,
	background: '#020617',
	border: '1px solid rgba(255,255,255,0.08)',
	overflow: 'hidden',
	cursor: 'pointer',
};

const image = {
	width: '100%',
	height: 160,
	objectFit: 'cover' as const,
};

const content = {
	padding: 12,
};

const title = {
	fontSize: 15,
	margin: '5px 0',
};

const price = {
	fontSize: 14,
	opacity: 0.8,
};

const btnOutline = {
	padding: '8px 14px',
	borderRadius: 8,
	background: 'transparent',
	color: 'white',
	border: '1px solid rgba(255,255,255,0.2)',
	cursor: 'pointer',
	textDecoration: 'none',
	display: 'inline-flex',
	alignItems: 'center',
};

const btnGold = {
	padding: '8px 14px',
	borderRadius: 8,
	background: 'linear-gradient(135deg, #f7e7a1 0%, #d4af37 45%, #b8962e 100%)',
	color: '#111',
	border: 'none',
	fontWeight: 600,
	cursor: 'pointer',
	boxShadow: `
		inset 0 1px 1px rgba(255,255,255,0.55),
		0 4px 10px rgba(0,0,0,0.28)
	`,
};