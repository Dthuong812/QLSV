const {registerStudent, loginStudent} = require('../services/studentService');


module.exports = {
    createStudent: async (req, res) => {
        try {
            const {
                name,
                email,
                password,
                student_id,
                class: studentClass
            } = req.body;
            const response = await registerStudent({
                name,
                email,
                password,
                student_id,
                studentClass
            });
            return res.status(201).json({errorCode: 0, data: response});
        } catch (error) {
            res.status(500).json({message: "Lỗi đăng ký!", error: error.message});
        }
    },
    loginStudentController: async (req, res) => {
        try {
            const {email, password} = req.body;
            const response = await loginStudent({email, password});
            res.status(200).json(response);
        } catch (error) {
            res.status(401).json({message: "Lỗi đăng nhập!", error: error.message});
        }
    }
}
