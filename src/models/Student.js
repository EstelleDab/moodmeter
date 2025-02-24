class Student {
    constructor(name, email, id, pic = "/images/user.png", courses =[]) {
      this.name = name;
      this.email = email;
      this.id = id;
      this.pic = pic;
      this.courses= courses;
    }
  }
  
  export default Student;