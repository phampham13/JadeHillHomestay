const BillsService = require('./admin.bills.service');

//API trả về danh sách các bills theo admin (gửi về bills của các homestays mà admin X có)
exports.getBillsByAdminId = async (req, res) => {
    try {
        // Lấy id ở params
        const id = req.params.id;
        console.log(id);
        // Truy xuất cơ sở dữ liệu bằng id để lấy
        let bills = await BillsService.getBillsByAdminId(id);
        // Nếu thành công trả lại res 200 và danh sách các bills
        return res.status(200).json({
            success: true,
            content: bills
        });
    } catch (error) {
        // Nếu ko thành công -> 400
        return res.status(400).json({
            success: false,
            message: Array.isArray(error) ? error : "Admin's id is not correct!",
            content: error
        });
    }
}

exports.updateBillsById = async (req, res) => {
    try {

        //Lấy các trường cần sửa đổi từ body request
        const data = req.body;

        const billId = data._id;
        const customer = data.customer? data.customer: null;
        const customerTogether = data.customerTogether ?data.customerTogether: null;
        const checkinDate = data.checkinDate? data.checkinDate: null;
        const checkoutDate = data.checkoutDate? data.checkoutDate: null;
        const status = data.status? data.status: 1;
        const servicesPerBill = data.servicesPerBill? data.servicesPerBill: null;

        let bill = await BillsService.updateBillsByBillsId(billId, customer, customerTogether,checkinDate, checkoutDate, status, servicesPerBill);
        return res.status(200).json({
            success: true,
            content: bill
        });

    } catch (error) {
        console.log(error)
        // Nếu ko thành công -> 400
        return res.status(400).json({
            success: false,
            message: Array.isArray(error) ? error : "Bill cannot update",
            content: error
        })
    }
}
exports.deleteBillsById = async ( req, res) =>{
    try{
        //Lấy id của bills
        const Bill_Id = req.params.id;
        
        //Kiểm trả xem bill có tồn tại không bằng Id
        const Bills = await BillsService.findBillsById( Bill_Id );
        
        if( typeof( Bills ) == "undefined" || Bills === null ){
            return res.status(403).json({
                success: false,
                message: "Bills is not exist",
                content: ""
            })
        }

        // //Xóa bills ra khỏi danh sách bills
        await BillsService.deleteBillsById( Bill_Id );

        //Nếu thành công gửi về thông báo thành công
        return res.status(200).json({
            success: true,
            message: "Delete bill success",
            content: ""
        });

    } catch ( Error ) {
        // Nếu ko thành công -> 400
        return res.status(400).json({
            success: false,
            message: "Exception",
            content: Error
        });
    }
}


exports.getBillsByHomestayId = async (req, res) => {
    try {
        // Lấy id ở params
        const {id, status} = req.query;
        // Truy xuất cơ sở dữ liệu bằng id để lấy
        let bills = await BillsService.getBillsByHomestayId(id, status);
        
        // Nếu thành công trả lại res 200 và danh sách các bills
        return res.status(200).json({
            success: true,
            content: bills 
        });
    } catch (error) {
        // Nếu ko thành công -> 400
        console.log(error)
        return res.status(400).json({
            success: false,
            message: Array.isArray(error) ? error : "Homestay's id is not correct!",
            content: error
        });
    }
}
