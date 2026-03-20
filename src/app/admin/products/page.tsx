'use client';

import { useState } from 'react';

import useAdminCategoriesStore from '../../../store/adminCategories';
import useAdminThemesStore from '../../../store/adminThemes';
import useAdminProductsStore from '../../../store/adminProducts';

const ProductsPage = () => {
	const {
		products,
		addProduct,
		deleteProduct,
		toggleStock,
		updateStockQuantity,
		updateProduct,
	} = useAdminProductsStore();

	const categories = useAdminCategoriesStore((s) => s.categories);
	const themes = useAdminThemesStore((s) => s.themes);

	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState('');
	const [image, setImage] = useState('');
	const [stockQuantity, setStockQuantity] = useState('1');
	const [categoryId, setCategoryId] = useState('');
	const [themeId, setThemeId] = useState('');

	// 🔥 upload image
	const handleImageUpload = (file: File) => {
		const reader = new FileReader();
		reader.onloadend = () => {
			setImage(reader.result as string);
		};
		reader.readAsDataURL(file);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		addProduct({
			name,
			description,
			price: Number(price),
			image,
			inStock: Number(stockQuantity) > 0,
			stockQuantity: Number(stockQuantity),
			categoryId: categoryId || null,
			themeId: themeId || null,
		});

		setName('');
		setDescription('');
		setPrice('');
		setImage('');
		setStockQuantity('1');
		setCategoryId('');
		setThemeId('');
	};

	return (
		<main style={{ padding: 20 }}>
			<h1 style={{ color: 'gold' }}>Produits</h1>

			{/* FORMULAIRE */}
			<form onSubmit={handleSubmit} style={{ display: 'grid', gap: 10, maxWidth: 400 }}>
				<input placeholder="Nom" value={name} onChange={(e) => setName(e.target.value)} style={input} />

				<textarea
					placeholder="Description"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					style={{ ...input, minHeight: 80 }}
				/>

				<input type="number" placeholder="Prix" value={price} onChange={(e) => setPrice(e.target.value)} style={input} />

				<input
					type="file"
					accept="image/*"
					onChange={(e) => {
						if (e.target.files?.[0]) handleImageUpload(e.target.files[0]);
					}}
				/>

				{image && <img src={image} style={{ width: 100, borderRadius: 10 }} />}

				<input
					type="number"
					placeholder="Stock"
					value={stockQuantity}
					onChange={(e) => setStockQuantity(e.target.value)}
					style={input}
				/>

				<select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} style={input}>
					<option value="">Catégorie</option>
					{categories.map((c) => (
						<option key={c.id} value={c.id}>
							{c.name}
						</option>
					))}
				</select>

				<select value={themeId} onChange={(e) => setThemeId(e.target.value)} style={input}>
					<option value="">Thème</option>
					{themes.map((t) => (
						<option key={t.id} value={t.id}>
							{t.name}
						</option>
					))}
				</select>

				<button style={btn}>Ajouter</button>
			</form>

			<hr style={{ margin: '30px 0' }} />

			{/* LISTE PRODUITS */}
			{products.map((p) => (
				<div key={p.id} style={row}>

					{/* IMAGE + INFOS */}
					<div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
						<img src={p.image} style={img} />

						<div>
							<h3 style={{ margin: 0 }}>{p.name}</h3>
							<p style={{ margin: 0, opacity: 0.6 }}>{p.description}</p>
							<p style={{ margin: 0 }}>{p.price} €</p>
						</div>
					</div>

					{/* ACTIONS */}
					<div style={actions}>

						<input
							type="number"
							value={p.stockQuantity}
							onChange={(e) =>
								updateStockQuantity(p.id, Number(e.target.value))
							}
							style={inputSmall}
						/>

						<select
							value={p.categoryId || ''}
							onChange={(e) =>
								updateProduct(p.id, {
									categoryId: e.target.value || null,
								})
							}
							style={inputSmall}
						>
							<option value="">Catégorie</option>
							{categories.map((c) => (
								<option key={c.id} value={c.id}>
									{c.name}
								</option>
							))}
						</select>

						<select
							value={p.themeId || ''}
							onChange={(e) =>
								updateProduct(p.id, {
									themeId: e.target.value || null,
								})
							}
							style={inputSmall}
						>
							<option value="">Thème</option>
							{themes.map((t) => (
								<option key={t.id} value={t.id}>
									{t.name}
								</option>
							))}
						</select>

						{/* BOUTON DISPONIBLE */}
						<button onClick={() => toggleStock(p.id)} style={statusBtn(p.inStock)}>
							{p.inStock ? 'Disponible' : 'Indisponible'}
						</button>

						{/* DELETE */}
						<button onClick={() => deleteProduct(p.id)} style={deleteBtn}>
							Supprimer
						</button>

					</div>
				</div>
			))}
		</main>
	);
};

/* ---------- STYLES ---------- */

const input = {
	padding: 10,
	borderRadius: 8,
	border: '1px solid #334155',
	background: '#020617',
	color: 'white',
};

const inputSmall = {
	...input,
	width: 110,
};

const btn = {
	padding: 10,
	background: 'gold',
	border: 'none',
	borderRadius: 8,
	cursor: 'pointer',
};

const row = {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	padding: 16,
	borderRadius: 14,
	background: '#0f172a',
	border: '1px solid rgba(255,255,255,0.08)',
	marginBottom: 12,
};

const actions = {
	display: 'flex',
	alignItems: 'center',
	gap: 10,
};

const img: React.CSSProperties = {
	width: 70,
	height: 70,
	objectFit: 'cover',
	borderRadius: 12,
	border: '1px solid rgba(255,255,255,0.1)',
};

const statusBtn = (active: boolean) => ({
	padding: '8px 12px',
	borderRadius: 999,
	border: 'none',
	cursor: 'pointer',
	fontWeight: 600,
	background: active ? '#22c55e' : '#ef4444',
	color: 'white',
});

const deleteBtn = {
	padding: '8px 12px',
	borderRadius: 10,
	border: '1px solid #ef4444',
	background: 'transparent',
	color: '#ef4444',
	cursor: 'pointer',
	fontWeight: 600,
};

export default ProductsPage;