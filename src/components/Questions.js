const questions = {
    travail: {
      question: "Charge de travail",
      options: {
        1: { icon: '⛱️', label: 'Tranquille' },
        2: { icon: '🙂', label: 'Je gère' },
        3: { icon: '😌', label: 'Bien équilibré' },
        4: { icon: '😕', label: 'En difficulté' },
        5: { icon: '⚰️', label: 'Sous l\'eau' },
      },
    },
    consignes: {
      question: "Clarté des consignes",
      options: {
        1: { icon: '🤗', label: 'Très clair' },
        2: { icon: '🙂', label: 'Plutôt clair' },
        3: { icon: '🤨', label: 'Moyennement clair' },
        4: { icon: '😵‍💫', label: 'Assez confus' },
        5: { icon: '😫', label: 'Trop confus' },
      },
    },
    difficulte: {
      question: "Difficulté du cours",
      options: {
        1: { icon: '😎', label: 'Trop facile' },
        2: { icon: '😊', label: 'Facile' },
        3: { icon: '🤓', label: 'Correct' },
        4: { icon: '😵', label: 'Un peu dur' },
        5: { icon: '🤯', label: 'Trop difficile' },
      },
    },
    global: {
      question: "Ressenti global",
      options: {
        1: { icon: '🥳', label: 'Tout roule !' },
        2: { icon: '😀', label: 'Plutôt bien' },
        3: { icon: '🫡', label: 'Ça va' },
        4: { icon: '😥', label: 'Pas top' },
        5: { icon: '😰', label: 'SOS' },
      },
    },
  };
  
  export default questions;
  