const AdminService = require('./super-admin.admin.service');
const jwt = require("jsonwebtoken");
//API update thông tin của Admin
exports.updateAdminById = async (req, res) => {
    if (req.user.role !== "super_admin") {
        return res.status(400).json({
            success: false,
            content: null,
            message: "Chưa đăng nhập với tư cách là Super Admin"
        })
    } else {
        try {
            //Lấy các thông tin để update cho Admin.
            const data = req.body;
            const id = data.id;
            const name = data.name;
            const address = data.address;
            const role = data.role;
            const email = data.email;
            const password = data.password;
            const phone = data.phone;
            const status = data.status;
            const gender = data.gender;
            const identification = data.identification;
            const avatarUrl = data.avatarUrl;
            const dateAtWork = data.dateAtWork;
            const dateAtBirth = data.dateAtBirth;
            let homestays;
            if (data.homestays == "" || data.homestays == null) homestays = null;
            else homestays = data.homestays;

            let admin = await AdminService.updateAdminById(id, name, address, role, email, password, phone, status, gender, identification, avatarUrl, dateAtWork, dateAtBirth, homestays);
            return res.status(200).json({
                success: true,
                content: admin
            });
        } catch (error) {
            // Nếu ko thành công -> 400
            return res.status(400).json({
                success: false,
                message: Array.isArray(error) ? error : "Cannot update admin!",
                content: error
            });
        }
    }
}

exports.createAdmin = async (req, res) => {
    if (req.user.role !== "super_admin") {
        return res.status(400).json({
            success: false,
            content: null,
            message: "Chưa đăng nhập với tư cách là Super Admin"
        })
    } else {
        try {
            const data = req.body;
            const name = data.name;
            const address = data.address;
            const role = data.role;
            const email = data.email;
            const password = data.password;
            const phone = data.phone;
            const status = data.status;
            const gender = data.gender;
            const identification = data.identification;
            const avatarUrl = data.avatarUrl;
            const dateArWork = data.dateAtWork;
            const dateAtBirth = data.dateAtBirth;
            let homestays;
            if (data.homestays == "" || data.homestays == null) homestays = null;

            let admin = await AdminService.createAdmin(name, address, role, email, password, phone, status, gender, identification, avatarUrl, dateArWork, dateAtBirth, homestays);
            if (admin === 0) {
                return res.status(400).json({
                    success: false,
                    content: null,
                    message: "Không đủ dữ liệu để có thể tạo một admin mới!"
                })
            } else {
                if (admin === 1) {
                    return res.status(400).json({
                        success: false,
                        content: null,
                        message: "Admin này đã có sẵn!"
                    })
                } else return res.status(200).json({
                    success: true,
                    content: admin
                })
            }
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: Array.isArray(error) ? error : "Admin's id is not correct!",
                content: error
            });
        }
    }
}

exports.assignAdminToHomestay = async (req, res) => {
    const role = req.currentRole;
    // Kiểm tra là superadmin
    if ( role !== "super_admin") {
        return res.status(400).json({
            success: false,
            message: "Chưa đăng nhập với tư cách là Super Admin"
        })
    } else {
        try {
            let data = req.body;
            const adminId = data.adminId;
            const homestayId = data.homestayId;
            let admin = await AdminService.assignAdminToHomestay(adminId, homestayId);
            if (admin) {
                return res.status(200).json({
                    success: true,
                    message: "Đã gán homestay cho admin thành công",
                    content: admin
                })
            }
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: Array.isArray(error) ? error : "Admin's id or Homestay'id is not correct!",
                content: error
            });
        }
    }
}

exports.unassignAdminToHomestay = async (req, res) => {
    const role = req.currentRole;
    // Kiểm tra là superadmin
    if ( role !== "super_admin") {
        return res.status(400).json({
            success: false,
            message: "Chưa đăng nhập với tư cách là Super Admin"
        })
    } else {
        try {
            let data = req.body;
            const adminId = data.adminId;
            const homestayId = data.homestayId;
            let admin = await AdminService.unassignAdminToHomestay(adminId, homestayId);
            if (admin) {
                return res.status(200).json({
                    success: true,
                    message: "Đã bỏ gán homestay cho admin thành công",
                    content: admin
                })
            }
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: Array.isArray(error) ? error : "Admin's id or Homestay'id is not correct!",
                content: error
            });
        }
    }
}

exports.deleteAdmin = async (req, res ) => {
    const role = req.currentRole;
    // Kiểm tra là superadmin
    if ( role !== "super_admin") {
        return res.status(400).json({
            success: false,
            message: "Chưa đăng nhập với tư cách là Super Admin"
        })
    } else {
        try {
            // Lấy id ở params
            const id = req.params.id;
            await AdminService.deleteAdmin(id);

            return res.status(200).json({
                success: true,
                message: "Đã xóa admin"
            })

        } catch (error) {
            return res.status(400).json({
                success: false,
                message: Array.isArray(error) ? error : "Admin's id is not correct!",
                content: error
            });
        }
    }
}

exports.deleteHomestay = async (req, res ) => {
    const role = req.currentRole;
    // Kiểm tra là superadmin
    if ( role !== "super_admin") {
        return res.status(400).json({
            success: false,
            message: "Chưa đăng nhập với tư cách là Super Admin"
        })
    } else {
        try {
            // Lấy id ở params
            const id = req.params.id;
            await AdminService.deleteHomestay(id);
            return res.status(200).json({
                success: true,
                message: "Đã xóa homestay"
            })
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: Array.isArray(error) ? error : "homestay's id is not correct!",
                content: error
            });
        }
    }
}

exports.getAdmins = async (req, res) => {
    const role = req.currentRole;
    // Kiểm tra là superadmin
    if ( role !== "super_admin") {
        return res.status(400).json({
            success: false,
            message: "Chưa đăng nhập với tư cách là Super Admin"
        })
    } else {
        try {
            let admins = await AdminService.getAdmins();
            return res.status(200).json({
                success: true,
                message: "Get all admin successfully",
                content: admins
            })
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: "Failed to get all admins",
                content: error
            });
        }
    }
}

exports.getAdminById = async (req, res) => {
    const role = req.currentRole;
    // Kiểm tra là superadmin
    if ( role !== "super_admin") {
        return res.status(400).json({
            success: false,
            message: "Chưa đăng nhập với tư cách là Super Admin"
        })
    } else {
        try {
            const id = req.params;
            console.log(id);
            let admin = await AdminService.getAdminById(id);
            return res.status(200).json({
                success: true,
                message: "Get admin successfully",
                content: admin
            })
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: "Failed to get admin",
                content: error
            });
        }
    }
}