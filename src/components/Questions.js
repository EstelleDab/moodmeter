const questions = {
  clarte_consigne: {
    question: "Clarté des consignes",
    options: {
      1: { icon: '😫', label: 'Trop confus' },
      2: { icon: '😵‍💫', label: 'Assez confus' },
      3: { icon: '🤨', label: 'Moyennement clair' },
      4: { icon: '🙂', label: 'Plutôt clair' },
      5: { icon: '🤗', label: 'Très clair' },
    },
  },
  difficulte: {
    question: "Difficulté du cours",
    options: {
      1: { icon: '🤯', label: 'Trop difficile' },
      2: { icon: '😵', label: 'Un peu dur' },
      3: { icon: '🤓', label: 'Correct' },
      4: { icon: '😊', label: 'Facile' },
      5: { icon: '😎', label: 'Trop facile' },
    },
  },
  reactivite_enseignant: {
    question: "Réactivité de l'enseignant",
    options: {
      1: { icon: '👻', label: 'Pas réactif' },
      2: { icon: '👎', label: 'Peu réactif' },
      3: { icon: '🤷', label: 'Moyennement réactif' },
      4: { icon: '👍', label: 'Réactif' },
      5: { icon: '🚀', label: 'Très réactif' },
    },
  },
  ressenti_global: {
    question: "Ressenti global",
    options: {
      1: { icon: '😰', label: 'SOS' },
      2: { icon: '😥', label: 'Pas top' },
      3: { icon: '🫡', label: 'Ça va' },
      4: { icon: '😀', label: 'Plutôt bien' },
      5: { icon: '🥳', label: 'Tout roule !' },
    },
  },
};

export default questions;
