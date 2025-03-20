import React from "react";

const UnauthorizedPage = () => {
  return (
    <div className="container text-center mt-5">
      <h1>Accès Refusé</h1>
      <p>Vous n'êtes pas autorisé à accéder à cette page.</p>
      <a href="/" className="btn btn-primary mt-3">Retour à l'accueil</a>
    </div>
  );
};

export default UnauthorizedPage;