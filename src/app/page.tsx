'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import useCartStore from '../store/cart';
import useAuthStore from '../store/auth';
import useAdminProductsStore from '../store/adminProducts';
import useAdminCategoriesStore from '../store/adminCategories';
import useAdminThemesStore from '../store/adminThemes';
import FiltersMenu from '@/components/FiltersMenu';

const MAINTENANCE = true;
const PRIVATE_PATH = '/jennifer-guilloteau/0311';

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
		<main className="min-h-screen flex items-center justify-center bg-black text-white px-6">
			<div className="text-center max-w-md w-full">
				<h1 className="text-5xl font-semibold mb-6">LYJY</h1>

				<p className="text-white/70 mb-8">
					Une nouvelle collection arrive bientôt.
				</p>

				{sent ? (
					<p className="text-green-400 text-sm">
						Merci 💎 Tu seras informé du lancement.
					</p>
				) : (
					<div className="flex flex-col gap-3">
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="Ton email"
							className="px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white outline-none"
						/>

						<button
							onClick={handleSubmit}
							className="px-4 py-3 rounded-lg bg-white text-black font-medium"
						>
							Être prévenu
						</button>
					</div>
				)}
			</div>
		</main>
	);
};

// 🛍️ HOME
const Home = () => {
	const pathname = usePathname();
	const isPrivate = pathname.startsWith(PRIVATE_PATH);

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

	// 🔥 MAINTENANCE
	if (MAINTENANCE && !isPrivate) {
		return <ComingSoon />;
	}

	return (
		<main style={{ paddingTop: 80 }}>
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

			<section style={grid}>
				{filteredProducts.map((product) => (
					<div key={product.id} style={card}>
						<img src={product.image || '/placeholder.png'} style={image} />

						<div style={content}>
							<h3>{product.name}</h3>
							<p>{product.price} €</p>

							<button
								style={btnGold}
								onClick={() =>
									addToCart({
										id: product.id,
										title: product.name,
										price: product.price,
										quantity: 1,
									})
								}
							>
								Ajouter
							</button>
						</div>
					</div>
				))}
			</section>
		</main>
	);
};

export default Home;

// 🎨 STYLES

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
	padding: '10px',
	background: '#020617',
	color: 'white',
	border: '1px solid rgba(255,255,255,0.1)',
	cursor: 'pointer',
};

const menuBox = {
	position: 'fixed' as const,
	top: 140,
	left: 20,
	width: 260,
	background: '#020617',
	padding: 16,
};

const grid = {
	display: 'grid',
	gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
	gap: 20,
	padding: 20,
};

const card = {
	background: '#020617',
	borderRadius: 12,
};

const image = {
	width: '100%',
	height: 150,
	objectFit: 'cover' as const,
};

const content = {
	padding: 10,
};

const btnOutline = {
	border: '1px solid white',
	padding: '6px 10px',
	color: 'white',
	textDecoration: 'none',
};

const btnGold = {
	background: 'gold',
	padding: '6px 10px',
	color: '#000',
};