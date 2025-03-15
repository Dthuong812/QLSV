const aqp = require ('api-query-params');
const Student = require('../models/Student');

const registerStudent = async ({ name, email, password, student_id, studentClass }) => {
    // Kiểm tra xem email đã tồn tại chưa
    let existingStudent = await Student.findOne({ email });
    if (existingStudent) throw new Error("Email đã được đăng ký!");

    // Tạo sinh viên mới
    const newStudent = new Student({
        name,
        email,
        password,
        student_id,
        class: studentClass
    });

    await newStudent.save();
    return { message: "Đăng ký thành công!" };
};

module.exports = { registerStudent };
