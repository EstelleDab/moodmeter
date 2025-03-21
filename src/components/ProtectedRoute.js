import React from "react";
import { Navigate } from "react-router-dom";
//rest transmets les props non specifiés à tous les enfants
const ProtectedRoute = ({ children, user, role, ...rest }) => {
  console.log("=== Debug ProtectedRoute ===");
  console.log("Utilisateur reçu :", user);
  console.log("Rôle requis :", role);

  // Vérifiez si les données utilisateur sont encore en cours de chargement
  if (user === null) {
    console.log("Utilisateur en cours de chargement...");
    return <p>Chargement des données utilisateur...</p>;
  }

  // Vérifiez si l'utilisateur n'est pas connecté
  if (!user) {
    console.log("Aucun utilisateur connecté. Redirection vers /login.");
    return <Navigate to="/login" replace />;
  }

  // Vérifiez si le rôle est défini dans l'objet utilisateur
  if (!user.role) {
    console.warn("ATTENTION : Le champ 'role' est manquant dans les données utilisateur :", user);
    console.warn("Redirection vers /unauthorized car le rôle utilisateur est inconnu.");
    return <Navigate to="/unauthorized" replace />;
  }

  // Vérifiez si le rôle de l'utilisateur correspond au rôle requis
  if (role && user.role !== role) {
    console.log(`Accès refusé : rôle utilisateur (${user.role}) différent du rôle requis (${role}).`);
    return <Navigate to="/unauthorized" replace />;
  }

  // Si tout est OK, l'accès est autorisé
  console.log("Accès autorisé pour l'utilisateur :", user);
  return React.cloneElement(children, { user, ...rest });

};

export default ProtectedRoute;
