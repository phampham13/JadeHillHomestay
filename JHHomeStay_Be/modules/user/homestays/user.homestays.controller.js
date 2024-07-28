const HomestaysService = require('./user.homestays.service');

exports.getRankingHomestays = async (req, res) => {
    try {
        const { quantity } = req.query;
        const homestays = await HomestaysService.getRankingHomestays(quantity);
        res.status(200).json({
            success: true,
            messages: ["get_ranking_homestays_success"],
            content: homestays
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            messages: Array.isArray(error) ? error : ["get_ranking_homestays_failed"],
            content: error,
        });
    }
};

exports.createRatingOfHomestay = async (req, res) => {
    try {
        const { id, rate } = req.body;
        rate.createdAt = Date.now();
        const homestay =  HomestaysService.createRating(id, rate);
        res.status(200).json({
            success: true,
            messages: ["create_rate_success"],
            content: homestay
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            messages: Array.isArray(error) ? error : ["create_rate_failed"],
            content: error,
        });
    }
};

// Lấy dữ liệu chi tiết về 1 homestay
// API này chưa test hết các trường hợp lỗi trả về
exports.getHomestayById = async (req, res) => {
    try {
        // Lấy id ở params
        const id = req.params.id;
        // Truy xuất cơ sở dữ liệu bằng id để lấy
        let homestay = await HomestaysService.getHomestayById(id);
        let billOfHomestayArray = await HomestaysService.getCheckInAndOutDateByIdHomestay(id);
        // Nếu thành công trả lại res 200 và toàn bộ thông tin homestay
        return res.status(200).json({
            success: true,
            content: {billOfHomestayArray, homestay}
        });
    } catch (error) {
        // Nếu ko thành công -> 400
        return res.status(400).json({
            success: false,
            message: Array.isArray(error) ? error : "Get homestays failed",
            content: error
        });
    }
}

exports.getHomestayByFilter = async (req, res) => {
    try {
        // Lấy thông tin filter ở query parameters: province, type, lowPrice, highPrice, các mảng amenities và generalServices
        const data = req.query;

        const province = (data.province)?data.province:null;
        const type = (data.type)?data.type:null;
        const averageRates = (data.averageRates)?data.averageRates:0;
        const minPrice = (data.minPrice)?data.minPrice:null;
        const maxPrice = (data.maxPrice)?data.maxPrice:null;
        const amenities = (data.amenities)?data.amenities: null;
        const generalServices = (data.generalServices)?data.generalServices: null;

        //Lấy số hiệu slide trả về, ban đầu auto là 1.
        const slice = (data.slice)?data.slice:0;

        // Truy xuất cơ sở dữ liệu bằng filter để lấy mảng homestays
        let {homestays, sliceTotal} = (await HomestaysService.getHomestayByFilter(province, type, averageRates, minPrice,
            maxPrice, generalServices, amenities, slice));

        // Nếu thành công trả lại res 200 và toàn bộ thông tin các homestay
        if (sliceTotal === 0) {
            return res.status(400).json({
                success: true,
                content: sliceTotal,
                message : "No slice"
            })
        }
        else return res.status(200).json({
            success: true,
            content: { homestays: homestays, sliceTotal : sliceTotal },
            message: sliceTotal + " slice"
        });
    } catch (error) {
        // Nếu ko thành công -> 400
        return res.status(400).json({
            success: false,
            message: Array.isArray(error) ? error : "Some error founded!",
            content: error
        });
    }
}

// Cập nhật homestay theo id, admin và superadmin có quyền
exports.updateHomestay = async (req,res) => {
    try{
        //Lấy dữ liệu từ request
        const data = req.body;
        //Lấy thông tin các trường
        const homestayId = data._id ? data._id : null;
        const adminId = data.adminId && (data.adminId !== "undefined") ? data.adminId : null;
        const homestayName = data.name ? data.name : null;
        const homestayPrice = data.price ? data.price : null;
        const homestayType = data.type ? data.type : null;
        const homestayAddress = data.address ? data.address : null;
        const homestayProvince = data.province ? data.province : null;
        const homestayDistrict = data.district ? data.district : null;
        const homestayLatitude = data.latitude ? data.latitude : null;
        const homestayLongitude = data.longitude ? data.longitude : null;
        const homestayArea = data.area ? data.area : null;
        const homestayDescription = data.description ? data.description : null;
        const homestayAvailable = data.available ? data.available : null;
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
        if (data.photos == '' || data.photos == null) {
            homestayPhotos = null
        } else homestayPhotos = JSON.parse(data.photos);
        console.log(req.files)
        let newHomestayPhotos = req.files?.map((file) => {
            return `/upload/homestays-photos/${file.originalname}`
        });
        // Update homestays và trả về thông báo thành công
        const homestays = await HomestaysService.updateHomestay(homestayId, homestayName,
            homestayPrice, homestayType, homestayAddress, homestayProvince, homestayDistrict,
            homestayLatitude, homestayLongitude, homestayArea, homestayDescription,
            homestayAvailable, homestayAmenities, homestayServices, homestayGeneralServices, homestayPhotos, adminId, newHomestayPhotos)

        //Trả về thông báo thành công
        return res.status(200).json({
            success: true,
            message: "Update homestay success",
            content: homestays
        })

    }
    catch(Error){
        console.log(Error)
        //Lỗi không xác định
        return res.status(400).json({
            success: false,
            message: "Exception",
            content: Error
        })}

}


