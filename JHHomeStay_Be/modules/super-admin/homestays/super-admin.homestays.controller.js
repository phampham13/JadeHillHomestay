const HomestayService = require('./super-admin.homestays.service');

//Tạo Homestays
exports.createInformationForHomestay = async (req, res) => {
    try{
        //Lấy về dữ liệu trong body của request
        const data = req.body;

        const adminId = data.adminId && (data.adminId !== "undefined") ? data.adminId : null;
        const homestayName = data.name ? data.name : null;
        const homestayPrice = data.price ? data.price : 0;
        const homestayType = data.type ? data.type : null;
        const homestayAddress = data.address ? data.address : null;
        const homestayProvince = data.province ? data.province : null;
        const homestayDistrict = data.district ? data.district : null;
        const homestayLatitude = data.latitude ? data.latitude : null;
        const homestayLongitude = data.longitude ? data.longitude : null;
        const homestayArea = data.area ? data.area : 0;
        const homestayDescription = data.description ? data.description : null;
        const homestayAvailable = data.available ? data.available : 0;
        let homestayServices, homestayGeneralServices, homestayAmenities, homestayPhotos;
        if (data.services == '' || data.services == null) {
            homestayServices = null
        } else homestayServices = JSON.parse(data.services);
        if (data.generalServices == '' || data.generalServices == null) {
            homestayGeneralServices = null
        } else homestayGeneralServices = JSON.parse(data.generalServices);
        if (data.amenities == '' || data.amenities == null) {
            homestayAmenities = null
        } else homestayAmenities = JSON.parse(data.amenities);

        console.log(req.files);
        homestayPhotos = req.files.map((file) => {
            return `/upload/homestays-photos/${file.originalname}`
        });
        console.log(homestayPhotos);

        //Tạo homestay
        const homestay = await HomestayService.createHomestay(adminId, homestayName, homestayProvince, homestayDistrict, homestayAddress, homestayType, homestayPrice, homestayLatitude, homestayLongitude, homestayArea, homestayDescription, homestayAvailable, homestayServices, homestayGeneralServices, homestayAmenities, homestayPhotos );

        return res.status(200).json({
            success: true,
            message: "Create homestay successful",
            content: homestay
        })

    }
    catch(Error){
        //Lỗi không xác định
        console.log(Error)
        return res.status(400).json({
            success: false,
            message: "Create homestay fail",
            content: Error
    })   
    }
}

exports.getIdAdmin = async ( req, res ) => {
    try{

        const data = req.body;
        const province = data.province;
  
        //Trả về danh sách Admins
        const Admins = await HomestayService.getIdAdminByProvince( province );
        return res.status(200).json({
            success: true,
            message: "Get IdAdmin successful",
            content:Admins
        })
    }
    catch(Error){
        //Lỗi không xác định
        return res.status(400).json({
            success: false,
            message: "Get IdAdmin fail",
            content: Error
        })  
    }
}
//Lấy toàn bộ homestays
exports.getAllHomestays = async (req, res) => {
    try {
        // Dữ liệu role và email lấy từ token
        // Role superadmin -> trả về hết, admin -> trả về danh sách homestay admin đó quản lý
        // Email để tìm ra admin, từ id admin -> Danh sách homestay admin đó quản lý
        const role = req.currentRole;
        const email = req.currentEmail;
        const {page, perPage} = req.query;
        let homestays = await HomestayService.getAllHomestays(page, perPage, role, email);

        return res.status(200).json({
            success: true,
            message: "Get all homestays successfully",
            content: homestays
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Exception",
            content: Error
        })
    }
}

//Thống kê doanh thu của toàn bộ homestay theo tháng trong 1 năm
exports.totalRevenueStatistic = async ( req, res ) => {
    try
    {
        const data = req.query;
        const year = data.year;
        
        // Tạo biến tổng doanh thu và mảng trả về doanh thu theo tháng trong năm year 
        const {totalRevenue, revenuePerMonth} = await HomestayService.totalRevenueStatistic( year );

        return res.status(200).json({
            success: true,
            message: "Total revenue statistics successfully",
            content: { "totalRevenue": totalRevenue, "revenuePerMonth": revenuePerMonth }
        });
    }
    catch
    {
        return res.status(400).json({
            success: false,
            message: "Exception",
            content: Error
        })
    }

}

exports.revenueStatistic = async ( req, res ) => {
    try
    {
        const data = req.query;
        const year = data.year;
        const homestayId = data.homestayId;

        if( typeof( homestayId ) === "undefined" || typeof( year ) === "undefined")
        {
            return res.status(400).json({
                success: false,
                message: "Điền thiếu trường trong lúc gọi API",
                content: ""
            })
        }
        // Tạo biến tổng doanh thu và mảng trả về doanh thu theo tháng trong năm year 
        const { totalRevenue, revenuePerMonth } = await HomestayService.revenueStatistic( year, homestayId );


        return res.status(200).json({
            success: true,
            message: "Revenue statistics successfully",
            content: { "totalRevenue": totalRevenue, "revenuePerMonth": revenuePerMonth }
        });
    }
    catch
    {
        return res.status(400).json({
            success: false,
            message: "Exception",
            content: Error
        })
    }

}