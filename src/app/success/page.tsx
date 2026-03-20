const SuccessPage = () => {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
        textAlign: 'center',
        padding: 20,
      }}
    >
      <h1>🎉 Paiement réussi</h1>

      <p>
        Merci pour votre achat 💎  
        Votre commande a bien été prise en compte.
      </p>

      <a href="/" style={{ color: 'gold' }}>
        Retour à la boutique
      </a>
    </main>
  );
};

export default SuccessPage;