const { Homestays,Bills,Services } = require('../../../models');
const {db} = require("../../../helpers/dbHelper");
const BillsService = require('./user.bills.service');

exports.createBills = async (req,res)=>{
    try{
        //Lấy dữ liệu từ body
        const data = req.body;

        console.log(data._id);
        // Lấy thông tin homestays bằng _id
        const homestay = await Homestays(db).findById({ _id:data._id })
        .then( homestay => {
            return homestay;
        })
        
        //Nếu không nhập đúng _id của homestays thì trả về lỗi
        if( homestay === null || typeof( homestay ) === undefined ){
            res.status(400).json({
                success:false,
                message:"_id của homestay không đúng",
                content: ""
            })
        }
        
        //Kiểm tra xem _id services nhập có đúng không
        for( let i = 0; i < data.servicesPerBill.length; i++ ){

            // Lấy về thông tin của services;
            const services = await Services(db).findById({ _id : data.servicesPerBill[i].services  })
            .then( services => {
                return services;
            })

            if( services === null || typeof( services ) === undefined ){
                res.status(400).json({
                    success:false,
                    message:"_id của services không đúng",
                    content: ""
                })
            }

        }

        //Tạo bills với các trường đơn, bắt buộc phải điền hết các trường đơn
        await BillsService.createBill( data );

        res.status(200).json({
            success:true,
            message:"Create Success",
            content: ""
        })
    }

    catch(Error){
        console.error(Error);
        res.status(400).json({
            success:false,
            message:"Exception",
            content: Error
        })
    }
}