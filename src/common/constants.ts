export default {
  DATE: {
    DATE_TIME: "YYYY-MM-DD HH:mm:ss"
  },
  JWT: {
    JWT: "2h",
    JWT_REFRESH: '365d',
  },
  REGEX: {
    PHONE_NUMBER: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
    EMAIL:
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
  },
  ROLE: {
    ADMIN: 'admin',
    STUDENT: 'student',
    TEACHER: 'teacher'
  },
  ERROR: {
    INVALID_TOKEN_FORMAT: 'Invalid token format',
    INVALID_TOKEN: 'Token is invalided',
    EXPIRED_TOKEN: 'Token is expired',
    INVALID_ACCOUNT: 'Your account is wrong email or password',
    NO_TOKEN: 'No has token',
    ACCESS_DENIED: "Access denied",
    //REGISTER ERROR
    STUDENT_ROLE_NOT_FOUND: 'Student role not found',
    EXISTED_INFO_REGISTER: 'Existed username or email',
    //COURSE
    COURSE_EXISTED: "Cannot create course. Course existed"
    
  },
}
