import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role, userRole }) => {
    console.log("Rôle attendu:", role, "Rôle utilisateur actuel:", userRole);

    if (!userRole) {
        console.log("userRole non défini, redirection vers /login");
        return <Navigate to="/login" replace />;

    }

    if (userRole !== role) {
        console.log(`Rôle incorrect : attendu ${role}, reçu ${userRole}`);
        return <Navigate to="/login" replace />;

    }

    // Affiche le contenu 'enfant' soit userhome soit dashboard selon le role
    console.log("Accès autorisé.");
    return children;
};

export default ProtectedRoute;
