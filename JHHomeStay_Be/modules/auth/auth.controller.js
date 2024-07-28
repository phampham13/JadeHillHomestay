const AuthService  = require("./auth.service");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {pseudoRandomBytes} = require("crypto");

// Chuyển file .env sang dạng sử dụng được để lấy thông tin
require('dotenv').config();

// Xử lí đăng nhập
exports.login = async (req, res) => {
       try {
           // Tìm và lấy ra thông tin User trong database dựa vào email và role
           const data = req.body;
           let userArray = await AuthService.getByEmailAndRole(data);
           let user = userArray[0];
           let access_token;
           //Kiểm tra mật khẩu dùng bcrypt để đối chiếu mật khẩu trong req và database
           if ( user.status === 1 ) {
               if (await bcrypt.compare(req.body.password, user.password)) {
                   //Tạo token cho người mới đăng nhập
                   access_token = jwt.sign({
                       email: user.email,
                       role: user.role,
                   }, process.env.TOKEN_SECRET, {expiresIn: 60 * 60 * 24 * 7 });
                   user.token = access_token;

                   // Thêm token cho user trong database
                   await AuthService.editUser(user);
               } else {
                   return res.status(400).json({
                       success: false,
                       message: Array.isArray(error) ? error : "login_fail",
                       content: error
                   });
               }
           }

           // Nếu xác thực đăng nhập thành công, trả lại res 200 và token, thông tin dùng để đăng nhập
           return res.header('Authorization', 'Bearer '+ access_token).status(200).json({
               success: true,
               message: "login_success",
               content: user
           });

       } catch (error) {
           // Nếu ko thành công -> 400
           return res.status(400).json({
               success: false,
               message: Array.isArray(error) ? error : "login_fail",
               content: error
           });
       }
}


// Xử lí đăng xuất
exports.logout = async (req, res) => {
    try {
        // Gọi tới hàm xóa token và trả lại thông tin người dùng đã logout
        const data = req.body;
        await AuthService.deleteToken(data);

        // Lấy ra thông tin để xác nhận là đã đăng xuất rồi -> Chủ yếu là để check xem token = null trong database
        let user = await AuthService.getById(data);
        // Nếu cần xóa console thì thêm câu lệnh dưới hoặc có thể bỏ đi, sẽ ko ảnh hưởng đến phần code

        // Nếu thành công trả lại res 200
        return res.status(200).json({
            success:true,
            message: "logout_success",
            content: user
        });

    } catch (error) {
        console.log('errorLogOut', error);
        // Nếu ko thành công trả lại 400
        return res.status(400).json({
            success: false,
            message: "logout_fail",
            content: error
        });
    }
}
