
class User {
  constructor(id, username, password, role) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.role = role; // 'visitor', 'student', 'teacher', 'admin'
    this.avatar = '';
    this.nickname = '';
    this.signature = '';
    this.todoList = [];
    this.history = [];
    this.notes = [];
    this.favorites = [];
    this.registeredCourses = [];
    this.mistakes = [];
    this.discussions = [];
  }
}

class Course {
  constructor(id, title, category, teacherId) {
    this.id = id;
    this.title = title;
    this.category = category;
    this.teacherId = teacherId;
    this.timestamp = Date.now();
    this.description = '';
    this.materials = [];
    this.assignments = [];
    this.students = [];
    this.comments = [];
    this.recommended = false;
    this.popular = false;
  }
}

class Assignment {
  constructor(id, courseId, title, description, dueDate) {
    this.id = id;
    this.courseId = courseId;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.submissions = [];
  }
}

class Submission {
  constructor(userId, content, timestamp) {
    this.userId = userId;
    this.content = content;
    this.timestamp = timestamp;
    this.grade = null;
    this.feedback = '';
  }
}

export { User, Course, Assignment, Submission };