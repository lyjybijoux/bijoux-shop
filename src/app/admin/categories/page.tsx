'use client';

import { useState } from 'react';

import useAdminCategoriesStore from '../../../store/adminCategories';

const CategoriesPage = () => {
	const [name, setName] = useState('');

	const categories = useAdminCategoriesStore((state) => state.categories);
	const addCategory = useAdminCategoriesStore((state) => state.addCategory);
	const deleteCategory = useAdminCategoriesStore((state) => state.deleteCategory);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		addCategory(name);
		setName('');
	};

	return (
		<main>
			<h1 style={{ marginTop: 0, color: 'gold' }}>Catégories</h1>

			<form onSubmit={handleSubmit} style={{ marginTop: 20, marginBottom: 30 }}>
				<input
					type="text"
					placeholder="Nom de la catégorie"
					value={name}
					onChange={(event) => setName(event.target.value)}
					style={{
						padding: '12px 14px',
						borderRadius: 10,
						border: '1px solid #334155',
						background: '#020617',
						color: 'white',
						width: 280,
						marginRight: 10,
					}}
				/>

				<button
					type="submit"
					style={{
						padding: '12px 16px',
						borderRadius: 10,
						border: 'none',
						background: 'gold',
						color: '#020617',
						fontWeight: 700,
						cursor: 'pointer',
					}}
				>
					Ajouter
				</button>
			</form>

			<div style={{ display: 'grid', gap: 12 }}>
				{categories.length === 0 ? (
					<p style={{ opacity: 0.7 }}>Aucune catégorie pour le moment.</p>
				) : (
					categories.map((category) => (
						<div
							key={category.id}
							style={{
								padding: 16,
								borderRadius: 14,
								background: '#111827',
								border: '1px solid rgba(255,255,255,0.08)',
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
							}}
						>
							<div>
								<p style={{ margin: 0, fontWeight: 700 }}>{category.name}</p>
								<p style={{ margin: '6px 0 0', opacity: 0.6 }}>
									Slug : {category.slug}
								</p>
							</div>

							<button
								onClick={() => deleteCategory(category.id)}
								style={{
									padding: '10px 12px',
									borderRadius: 10,
									border: '1px solid #7f1d1d',
									background: 'transparent',
									color: '#fca5a5',
									cursor: 'pointer',
								}}
							>
								Supprimer
							</button>
						</div>
					))
				)}
			</div>
		</main>
	);
};

export default CategoriesPage;