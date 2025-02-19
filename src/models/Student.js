class Student {
    constructor(name, email, id, pic = "/images/user.png") {
      this.name = name;
      this.email = email;
      this.id = id;
      this.pic = pic;
    }
  }
  
  export default Student;