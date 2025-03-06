class Student {
    constructor(name, firstName, pseudo, email, id, role, pic = "/images/user.png", courses = ["UE L315", "UE L316", "UE L317"]) {
      this.name = name;
      this.firstName = firstName;
      this.pseudo = pseudo;
      this.email = email;
      this.id = id;
      this.pic = pic;
      this.role = role;
      this.courses=courses;
    }
  }
  
  export default Student;