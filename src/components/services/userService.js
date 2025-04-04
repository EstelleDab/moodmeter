const User = require('../../models/User');


const getAllEnseignants = async (req, res) => {
  try {
    const enseignants = await User.findAll({
      where: { role: 'enseignant' },
      attributes: ['id', 'nom', 'prenom'],
    });
    return res.status(200).json(enseignants);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erreur serveur' });
  }
};



const fetchUserDetails = async () => {
    const token = localStorage.getItem('token'); // Récupérer le token JWT
    console.log('Token:', token); 
    try {
      const response = await fetch('http://localhost:5000/home', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // Ajouter le token dans les en-têtes
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des données utilisateur');
      }
  
      const user = await response.json(); // Transforme la réponse en JSON
      return user; // Retourne les détails utilisateur
    } catch (error) {
      console.error('Erreur :', error);
      return null;
    }
  };
  
  module.exports = { getAllEnseignants, fetchUserDetails};