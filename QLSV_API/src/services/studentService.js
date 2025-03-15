const aqp = require('api-query-params');
const Student = require('../models/Student');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
module.exports = {
    registerStudent: async (
        {
            name,
            email,
            password,
            student_id,
            studentClass
        }
    ) => { // Kiểm tra xem email đã tồn tại chưa
        let existingStudent = await Student.findOne({email});
        if (existingStudent) 
            throw new Error("Email đã được đăng ký!");
        

        const hashedPassword = await bcrypt.hash(password, 10);

        // Tạo sinh viên mới
        const newStudent = new Student({
            name,
            email,
            password: hashedPassword,
            student_id,
            class: studentClass
        });

        await newStudent.save();
        return {message: "Đăng ký thành công!"};
    },
    loginStudent: async (
        {email, password}
    ) => {
        const student = await Student.findOne({email});
        if (! student) 
            throw new Error("Email chưa được đăng ký!");
        


        // Kiểm tra password
        const isMatch = await bcrypt.compare(password, student.password);
        if (! isMatch) 
            throw new Error("Mật khẩu không đúng!");
        


        // // Tạo token JWT
        const token = jwt.sign({
            id: student._id,
            email: student.email
        }, "secret_key", {expiresIn: "1h"});

        return {message: "Đăng nhập thành công!", token};
    }

}
