class User{
    constructor(nom, prenom, pseudo, email, id, role, pic = "/images/user.png", UEs = ["UE L315", "UE L316", "UE L317"]) {
      this.nom = nom;
      this.prenom = prenom;
      this.pseudo = pseudo;
      this.email = email;
      this.id = id;
      this.pic = pic;
      this.role = role;
      this.UEs=UEs;
    }
  }
  
  export default User;