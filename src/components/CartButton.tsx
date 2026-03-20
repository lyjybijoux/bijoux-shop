'use client';

import useUIStore from '../store/ui';
import useCartStore from '../store/cart';

const CartButton = () => {
  const openCart = useUIStore((state) => state.openCart);
  const items = useCartStore((state) => state.items);

  const count = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <button
      onClick={openCart}
      style={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        width: 70,
        height: 70,
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #FFD700, #FFA500)',
        border: 'none',
        cursor: 'pointer',
        fontSize: 24,
        boxShadow: '0 0 20px rgba(255,215,0,0.6)',
        zIndex: 200,
      }}
    >
      🛒

      {/* BADGE SAPHIR */}
      {count > 0 && (
        <span
          style={{
            position: 'absolute',
            top: -5,
            right: -5,
            background: 'radial-gradient(circle at 30% 30%, #3b82f6, #1e3a8a)',
            color: 'white',
            fontSize: 12,
            fontWeight: 'bold',
            padding: '4px 8px',
            borderRadius: '999px',
            minWidth: 22,
            textAlign: 'center',
            boxShadow: '0 0 10px rgba(30,58,138,0.8)', // glow bleu
          }}
        >
          {count}
        </span>
      )}
    </button>
  );
};

export default CartButton;