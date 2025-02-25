class Student {
    constructor(name, email, id, pic = "/images/user.png", courses = ["UE L315", "UE L316", "UE L317"]) {
      this.name = name;
      this.email = email;
      this.id = id;
      this.pic = pic;
      this.courses=courses;
    }
  }
  
  export default Student;