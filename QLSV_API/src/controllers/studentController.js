const { registerStudent } = require('../services/studentService');

const createStudent = async (req, res) => {
    try {
        const { name, email, password, student_id, class: studentClass } = req.body;
        const response = await registerStudent({ name, email, password, student_id, studentClass });
        return res.status(201).json({
            errorCode : 0,
            data : response
        });
    } catch (error) {
        res.status(500).json({ message: "Lỗi đăng ký!", error: error.message });
    }
};

module.exports = { createStudent };
