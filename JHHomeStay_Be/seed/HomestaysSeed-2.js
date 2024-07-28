const {Homestays, Photos, GeneralServices, Services, Amenities, Bills, Users} = require("../models");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

let dbConnect = () => {
    let connectOptions = process.env.DB_AUTHENTICATION === 'true' ?
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            user: process.env.DB_USERNAME,
            pass: process.env.DB_PASSWORD,
        } : {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    // Cơ sở dữ liệu cục bộ
     let db =  mongoose.createConnection('mongodb://localhost:27017/JadeHillHomestays', connectOptions);
//    let db =  mongoose.createConnection('mongodb+srv://jadehillhomestays:1234@cluster0.nwvtu.mongodb.net/jadehillhomestays?retryWrites=true&w=majority', connectOptions);

    return db
}
const db = dbConnect();
HomestaysSeed = async function () {
 /** danh sách homestays phải đúng thứ tự với danh sách url ở dưới */
 let homestays =  await Homestays(db).create([
    {
    name: "STAR HOUSE",
    price: 400000,
    type:"Biệt thự",
    address:"Hoàn Kiếm, Hà Nội, Việt Nam",
    province:"Hà Nội",
    district:"Hoàn Kiếm",
    description:"·Căn hộ được thiết kế với nhiều lựa chọn bố trí hợp lý và được trang bị theo tiêu chuẩn cao cấp 4 sao với ban công riêng và cảnh quan đẹp\n\n·Có nhiều dịch vụ tại chỗ khác nhau như giặt ủi, dịch vụ vệ sinh, Wi-Fi miễn phí tốc độ cao, an ninh 24/7\n\n·Dịch vụ khách hàng đặc biệt được cung cấp",
    available: 3,
    rates: [
        {
            cleanRate: 3,
            serviceRate: 4,
            valueRate: 4,
            accuracyRate: 5,
            description: "Dịch vụ của Homestay rất tốt",
            userName: "Hoàng",
            createdAt: new Date("12/08/2019")
        },
    ],
    },
    {
    name: "Tô Lịch Homestays",
    price: 500000,
    type:"Biệt thự",
    address:"Hoàn Kiếm, Hà Nội, Việt Nam",
    province:"Hà Nội",
    district:"Hoàn Kiếm",
    description:"Chúng tôi dành tất cả những gì tuyệt vời nhất cho căn hộ xinh đẹp này để chờ đến ngày được chào đón bạn. Thiết kế chủ đạo với tông màu vàng-trắng khiến cho ngôi nhà thật hiện đại, sang trọng nhưng cũng không kém phần ấm cúng mang đến cho bạn cảm giác như đang ở trong chính ngôi nhà của mình vậy.",
    available: 3,
    rates: [
        {
            cleanRate: 4,
            serviceRate: 4,
            valueRate: 5,
            accuracyRate: 3,
            description: "Dịch vụ của Homestay rất tốt",
            userName: "Hoàng",
            createdAt: new Date("11/08/2020")
        },
    ],
    },
    {
    name: "AKASHI HOTEL",
    price: 450000,
    type:"Biệt thự",
    address:"Hoàn Kiếm, Hà Nội, Việt Nam",
    province:"Hà Nội",
    district:"Hoàn Kiếm",
    description:"Căn hộ mới và hiện đại vừa được trang bị tiện nghi giúp khách hàng cảm thấy như đang ở nhà.",
    available: 3,
    rates: [
        {
            cleanRate: 3,
            serviceRate: 4,
            valueRate: 5,
            accuracyRate: 3,
            description: "Dịch vụ của Homestay rất tốt",
            userName: "Hoàng",
            createdAt: new Date("1/12/2021")
        },
    ],
    },
    {
    name: "ARUTO HOUSE",
    price: 300000,
    type:"Biệt thự",
    address:"Hoàn Kiếm, Hà Nội, Việt Nam",
    province:"Hà Nội",
    district:"Hoàn Kiếm",
    description:"Toàn bộ căn hộ tràn ngập ánh sáng tự nhiên, tạo sự vừa thoáng vừa rộng rãi. Các tòa nhà có đầy đủ tiện nghi bao gồm Phòng tập thể dục, bể bơi 4 mùa, sân vườn đẹp, nhà hàng, khu vui chơi trẻ em, Cửa hàng dược phẩm ...",
    available: 3,
    rates: [
        {
            cleanRate: 3,
            serviceRate: 3,
            valueRate: 3,
            accuracyRate: 3,
            description: "Dịch vụ của Homestay rất tốt",
            userName: "Hoàng",
            createdAt: new Date("11/01/2021")
        },
    ],
    },
    {
    name: "USAKE HOUSE",
    price: 400000,
    type:"Biệt thự",
    address:"Hoàng Mai, Hà Nội, Việt Nam",
    province:"Hà Nội",
    district:"Hoàng Mai",
    description:"Giao thông rất thuận tiện để đi bất cứ nơi nào trong thành phố cũng như các khu công nghiệp quanh thủ đô Hà Nội. Khách truy cập vào toàn bộ nơi. Tôi sẽ có mặt 24/7.",
    available: 3,
    rates: [
        {
            cleanRate: 4,
            serviceRate: 4,
            valueRate: 4,
            accuracyRate: 4,
            description: "Dịch vụ của Homestay rất tốt",
            userName: "Hoàng",
            createdAt: new Date("12/08/2019")
        },
    ],
    },
    {
    name: "EGETA HOUSE",
    price: 700000,
    type:"Nhà riêng",
    address:"Đông Anh, Hà Nội, Việt Nam",
    province:"Hà Nội",
    district:"Đông Anh",
    description:"Khu phố rất an toàn và xinh đẹp với công viên, hồ nước và khu giải trí. Cửa hàng tiện lợi, siêu thị và các dịch vụ khác cũng có sẵn trong khoảng cách đi bộ. Rất an toàn để có được xung quanh.",
    available: 3,
    rates: [
        {
            cleanRate: 5,
            serviceRate: 5,
            valueRate: 5,
            accuracyRate: 5,
            description: "Dịch vụ của Homestay rất tốt",
            userName: "Hoàng",
            createdAt: new Date("10/07/2021")
        },
    ],
    },
    {
    name: "FAIRY HOMESTAY",
    price: 600000,
    type:"Biệt thự",
    address:"Hoàn Kiếm, Hà Nội, Việt Nam",
    province:"Hà Nội",
    district:"Hoàn Kiếm",
    description:"·Căn hộ được thiết kế với nhiều lựa chọn bố trí hợp lý và được trang bị theo tiêu chuẩn cao cấp 4 sao với ban công riêng và cảnh quan đẹp\n\n·Có nhiều dịch vụ tại chỗ khác nhau như giặt ủi, dịch vụ vệ sinh, Wi-Fi miễn phí tốc độ cao, an ninh 24/7\n\n·Dịch vụ khách hàng đặc biệt được cung cấp",
    available: 3,
    rates: [
        {
            cleanRate: 5,
            serviceRate: 4,
            valueRate: 5,
            accuracyRate: 5,
            description: "Dịch vụ của Homestay rất tốt",
            userName: "Hoàng",
            createdAt: new Date("10/08/2021")
        },
    ],
    },
    {
    name: "GAMING HOUSE",
    price: 2000000,
    type:"Biệt thự",
    address:"Hoàng Mai, Hà Nội, Việt Nam",
    province:"Hà Nội",
    district:"Hoàng Mai",
    description:"Một Apt thoải mái và đáng yêu cho chuyến đi tuyệt vời của bạn. Bạn sẽ có một phòng bếp và phòng khách riêng, phòng ngủ và phòng tắm riêng. Không cần chia sẻ, nơi này là của bạn! Rất nhiều cửa sổ để bạn có được ánh sáng tự nhiên và không khí trong lành nhất.",
    available: 3,
    rates: [
        {
            cleanRate: 4,
            serviceRate: 4,
            valueRate: 5,
            accuracyRate: 5,
            description: "Dịch vụ của Homestay rất tốt",
            userName: "Hoàng",
            createdAt: new Date("01/02/2020")
        },
    ],
    },
    {
    name: "ERIS HOMESTAY",
    price: 400000,
    type:"Căn hộ dịch vụ",
    address:"Hoàng Mai, Hà Nội, Việt Nam",
    province:"Hà Nội",
    district:"Hoàng Mai",
    description:"Khám phá và tận hưởng Hà Nội tuyệt vời của chúng tôi với tất cả cảnh quan, thực phẩm và con người. Chúc bạn chuyến đi tuyệt vời và đáng nhớ!",
    available: 3,
    rates: [
        {
            cleanRate: 3,
            serviceRate: 3,
            valueRate: 3,
            accuracyRate: 5,
            description: "Dịch vụ của Homestay rất tốt",
            userName: "Hoàng",
            createdAt: new Date("11/01/2021")
        },
    ],
    },
    {
    name: "Sông Ân Hotel",
    price: 300000,
    type:"Khác",
    address:"Hoàng Mai, Hà Nội, Việt Nam",
    province:"Hà Nội",
    district:"Hoàng Mai",
    description:"Khi đến với chỗ ở của chúng tôi bạn hoàn toàn có thể sử dụng tất cả các căn hộ và coi đây như chính ngôi nhà của mình. Phòng ngủ, phòng khách, nhà bếp và phòng tắm sẽ là của bạn mà chẳng cần phải chia sẻ với ai. Còn gì tuyệt vời bằng điều đó nữa đúng không bạn ơi. ",
    available: 3,
    rates: [
        {
            cleanRate: 3,
            serviceRate: 4,
            valueRate: 4,
            accuracyRate: 5,
            description: "Dịch vụ của Homestay rất tốt",
            userName: "Hoàng",
            createdAt: new Date("11/07/2020")
        },
    ],
    }
])
// Tạm tạo cho các homestays rate
/** danh sách url phải đúng thứ tự với danh sách homestays ở trên */
    let photoUrls = [
        "/upload/homestays-photos/STAR HOUSE_1.jpg",
        "/upload/homestays-photos/STAR HOUSE_2.jpg",
        "/upload/homestays-photos/STAR HOUSE_3.jpg",
        "/upload/homestays-photos/Tô Lịch Homestays_1.jpg",
        "/upload/homestays-photos/Tô Lịch Homestays_2.jpg",
        "/upload/homestays-photos/Tô Lịch Homestays_3.jpg",
        "/upload/homestays-photos/AKASHI HOTEL_1.jpg",
        "/upload/homestays-photos/AKASHI HOTEL_2.jpg",
        "/upload/homestays-photos/AKASHI HOTEL_3.jpg",
        "/upload/homestays-photos/ARUTO HOUSE_1.jpg",
        "/upload/homestays-photos/ARUTO HOUSE_2.jpg",
        "/upload/homestays-photos/ARUTO HOUSE_3.jpg",
        "/upload/homestays-photos/USAKE HOUSE_1.jpg",
        "/upload/homestays-photos/USAKE HOUSE_2.jpg",
        "/upload/homestays-photos/USAKE HOUSE_3.jpg",
        "/upload/homestays-photos/EGETA HOUSE_1.jpg",
        "/upload/homestays-photos/EGETA HOUSE_2.jpg",
        "/upload/homestays-photos/EGETA HOUSE_3.jpg",
        "/upload/homestays-photos/FAIRY HOMESTAY_1.jpg",
        "/upload/homestays-photos/FAIRY HOMESTAY_2.jpg",
        "/upload/homestays-photos/FAIRY HOMESTAY_3.jpg",
        "/upload/homestays-photos/GAMING HOUSE_1.jpg",
        "/upload/homestays-photos/GAMING HOUSE_2.jpg",
        "/upload/homestays-photos/GAMING HOUSE_3.jpg",
        "/upload/homestays-photos/ERIS HOMESTAY_1.jpg",
        "/upload/homestays-photos/ERIS HOMESTAY_2.jpg",
        "/upload/homestays-photos/ERIS HOMESTAY_3.jpg",
        "/upload/homestays-photos/Sông Ân Hotel_1.jpg",
        "/upload/homestays-photos/Sông Ân Hotel_2.jpg",
        "/upload/homestays-photos/Sông Ân Hotel_3.jpg", 
    ]

    // Lưu và cập nhật _id vào mỗi documents (bidirectional)
    for(let i = 0; i < homestays.length; i++) {
        for(let j = i*3; j <= i*3+2; j++)
        {
        let photo = await Photos(db).create({
            url: photoUrls[j],
            homestays: homestays[i]._id,
        })
        // cập nhật _id của photo vào homestays
        await Homestays(db).findByIdAndUpdate(homestays[i]._id,
            {$push: {photos: photo._id}})
        }
    }
}

HomestaysSeed()
.then(() => {
    console.log("Homestays seed ok!!")
}).catch(error => {
    console.log(error)
});