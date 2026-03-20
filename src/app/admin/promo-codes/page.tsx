'use client';

import { useState } from 'react';
import usePromoStore, { PromoCode } from 'src/store/admin-promo-codes-store';

const PromoCodesPage = () => {
	const { promoCodes, addPromoCode, deletePromoCode } = usePromoStore();

	const [code, setCode] = useState('');
	const [value, setValue] = useState(0);

	return (
		<div style={{ padding: 20 }}>
			<h1>Codes promo</h1>

			<input
				placeholder="Code"
				value={code}
				onChange={(e) => setCode(e.target.value)}
			/>

			<input
				type="number"
				placeholder="Valeur"
				value={value}
				onChange={(e) => setValue(Number(e.target.value))}
			/>

			<button
				onClick={() => {
					addPromoCode(code, value);
					setCode('');
					setValue(0);
				}}
			>
				Ajouter
			</button>

			{promoCodes.map((p: PromoCode) => (
				<div key={p.id}>
					{p.code} - {p.value}€
					<button onClick={() => deletePromoCode(p.id)}>
						Supprimer
					</button>
				</div>
			))}
		</div>
	);
};

export default PromoCodesPage;