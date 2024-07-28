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
    // Cơ sở dữ liệu Atlas

//    let db =  mongoose.createConnection('mongodb+srv://jadehillhomestays:1234@cluster0.nwvtu.mongodb.net/jadehillhomestays?retryWrites=true&w=majority', connectOptions);
    // Cơ sở dữ liệu cục bộ
         let db =  mongoose.createConnection('mongodb://localhost:27017/JadeHillHomestays', connectOptions);

    /** CSDL cho docker */
    // let db = mongoose.createConnection('mongodb://mongo-jadehills:27017/JadeHillHomestays',
    //     connectOptions);
    return db
}
const db = dbConnect();

HomestaysSeed = async function () {
    Homestays(db).deleteMany().then(function () {
        console.log("Homestays is cleared");
    }).catch(function (error) {
        console.log(error);
    });

    Photos(db).deleteMany().then(function () {
        console.log("Photos is cleared");
    }).catch(function (error) {
        console.log(error);
    });

    Amenities(db).deleteMany().then(function () {
        console.log("Amenities is cleared");
    }).catch(function (error) {
        console.log(error);
    });

    Services(db).deleteMany().then(function () {
        console.log("Services is cleared");
    }).catch(function (error) {
        console.log(error);
    });

    GeneralServices(db).deleteMany().then(function () {
        console.log("GeneralServices is cleared");
    }).catch(function (error) {
        console.log(error);
    });

    Bills(db).deleteMany().then(function () {
        console.log("Bills is cleared");
    }).catch(function (error) {
        console.log(error);
    });

    /** danh sách homestays phải đúng thứ tự với danh sách url ở dưới */
    let homestays =  await Homestays(db).create([
        {// Làm 10 cái phía dưới nhá, làm theo mẫu dưới đây nhá
            name: "999 CONDOTEL Mường Thanh Viễn Triều",
            price: 999000,
            type:"Căn hộ",
            address:"Nha Trang, Khánh Hòa, Vietnam",
            province:"Khánh Hòa",
            district:"Nha Trang",
            description:"Tóm tắt về 999 CONDOTEL Mường Thanh Viễn Triều\n Vị trí rất đẹp và thuận tiện ở Nha Trang\n Gần công viên Nha Trang, Lotteria, trung tâm mua sắm với môi trường ngoài trời yên tĩnh\n Bạn hoàn toàn có thể trải nghiệm những dịch vụ cao cấp tại đây",
            available: 3,
            rates: [
                {
                    cleanRate: 4,
                    serviceRate: 4,
                    valueRate: 5,
                    accuracyRate: 5,
                    description: "Dịch vụ của Homestay rất tốt",
                    userName: "Minh",
                    createdAt: new Date("12/08/2019")
                },
            ],
        },
        {
            name: "Scenia Bay Residences Nha Trang",
            price: 1357000,
            type:"Căn hộ",
            address:"Nha Trang, Khánh Hòa, Vietnam",
            province:"Khánh Hòa",
            district:"Nha Trang",
            description: "Nơi đây có hệ thống hạ tầng tiện ích và dịch vụ đồng bộ, khép kín bao gồm: các trung tâm chăm sóc sức khỏe và làm đẹp như bể bơi ngoài trời, bể bơi trong nhà (4 mùa), khu tập gym, khu vui chơi trẻ em, trường học, hệ thống nhà hàng, siêu thị mua sắm, hầm đỗ xe thông minh …",
            available: 3,
            rates: [
                {
                    cleanRate: 3,
                    serviceRate: 4,
                    valueRate: 5,
                    accuracyRate: 3,
                    description: "Nơi đây có hệ thống hạ tầng tiện ích và dịch vụ đồng bộ, khép kín bao gồm: các trung tâm chăm sóc sức khỏe và làm đẹp như bể bơi ngoài trời, bể bơi trong nhà (4 mùa), khu tập gym, khu vui chơi trẻ em, trường học, hệ thống nhà hàng, siêu thị mua sắm, hầm đỗ xe thông minh …",
                    userName: "Hoàng",
                    createdAt: new Date("01/01/2019")
                },
            ],
        },
        {
            name: "Wonderland 24H Apartments",
            price: 899000,
            type:"Căn hộ",
            address:"Nha Trang, Khánh Hòa, Vietnam",
            province:"Khánh Hòa",
            district:"Nha Trang",
            description: "Khu vực sát bên cạnh Bến cáp treo Vinpearl và Cảng du lịch Nha Trang, rất thuận tiện cho nhóm bạn, hoặc gia đình có nhu cầu đi chơi đảo, Vinpearl",
            available: 3,
            rates: [
                {
                    cleanRate: 5,
                    serviceRate: 3,
                    valueRate: 5,
                    accuracyRate: 4,
                    description: "Khu vực sát bên cạnh Bến cáp treo Vinpearl và Cảng du lịch Nha Trang, rất thuận tiện cho nhóm bạn, hoặc gia đình có nhu cầu đi chơi đảo, Vinpearl",
                    userName: "Tú",
                    createdAt: new Date("12/12/2018")
                },
            ],
        },
        {
            name: "Shoho Hotel Nha Trang",
            price: 200000,
            type:"Hotel",
            address:"Nha Trang, Khánh Hòa, Vietnam",
            province:"Khánh Hòa",
            district:"Nha Trang",
            description: "Ngoài việc tận hưởng không gian vô cùng ấm áp và lãng mạn bên người ấy. Couple Nest còn mang đến những món ăn đặc biệt được phục vụ tại phòng, trên chiếc bàn trang trí đẹp mắt trong không gian lãng mạn chỉ có hai người. Cùng với nhiều dịch vụ được chuẩn bị vô cùng chu đáo và chuyên nghiệp.",
            available: 3,
            rates: [
                {
                    cleanRate: 3,
                    serviceRate: 3,
                    valueRate: 4,
                    accuracyRate: 3,
                    description: "Ngoài việc tận hưởng không gian vô cùng ấm áp và lãng mạn bên người ấy. Couple Nest còn mang đến những món ăn đặc biệt được phục vụ tại phòng, trên chiếc bàn trang trí đẹp mắt trong không gian lãng mạn chỉ có hai người. Cùng với nhiều dịch vụ được chuẩn bị vô cùng chu đáo và chuyên nghiệp.",
                    userName: "Quỳnh Anh",
                    createdAt: new Date("12/01/2020")
                },
            ],
        },
        {
            name: "Diamond Villa",
            price: 3700000,
            type:"Biệt thự",
            address:"Nha Trang, Khánh Hòa, Vietnam",
            province:"Khánh Hòa",
            district:"Nha Trang",
            description: "Phòng riêng dành cho 2 người\nPhòng có nhà vệ sinh riêng, nước nóng lạnh, có sẵn khăn tắm, dầu gội và sữa tắm\nPhòng ở cạnh phòng khách nên có thể có tiếng ồn, bạn cân nhắc nhé. Nomad có quy định không làm ồn sau 22h nên bạn có thể yên tâm ngủ ngon vào buổi tối\nCó ăn sáng",
            available: 3,
            rates: [
                {
                    cleanRate: 5,
                    serviceRate: 4,
                    valueRate: 3,
                    accuracyRate: 2,
                    description: "Phòng riêng dành cho 2 người\nPhòng có nhà vệ sinh riêng, nước nóng lạnh, có sẵn khăn tắm, dầu gội và sữa tắm\nPhòng ở cạnh phòng khách nên có thể có tiếng ồn, bạn cân nhắc nhé. Nomad có quy định không làm ồn sau 22h nên bạn có thể yên tâm ngủ ngon vào buổi tối\nCó ăn sáng",
                    userName: "Đạt",
                    createdAt: new Date("01/08/2018")
                },
            ],
        },
        {
            name: "Relaxing 2 BR Apartment",
            price: 859000,
            type:"Căn hộ",
            address:"Nha Trang, Khánh Hòa, Vietnam",
            province:"Khánh Hòa",
            district:"Nha Trang",
            description: "Phòng Superior Twin Room với 2 giường 1,1m, phù hợp với những nhóm bạn muốn hưởng kỳ nghỉ bên nhau thật đầm ấm, sang trọng. Ngoài ra, Home Vu Apartments còn có các loại phòng Superior Double và Standard, giúp quý khách tiết kiệm chi phí khi đi du lịch.",
            available: 3,
            rates: [
                {
                    cleanRate: 2,
                    serviceRate: 4,
                    valueRate: 5,
                    accuracyRate: 3,
                    description: "Phòng Superior Twin Room với 2 giường 1,1m, phù hợp với những nhóm bạn muốn hưởng kỳ nghỉ bên nhau thật đầm ấm, sang trọng. Ngoài ra, Home Vu Apartments còn có các loại phòng Superior Double và Standard, giúp quý khách tiết kiệm chi phí khi đi du lịch.",
                    userName: "Bình",
                    createdAt: new Date("12/12/2020")
                },
            ],
        },
        {
            name: "Paralia Nha Trang",
            price: 949000,
            type:"Căn hộ",
            address:"Nha Trang, Khánh Hòa, Vietnam",
            province:"Khánh Hòa",
            district:"Nha Trang",
            description: "Đội ngũ nhân viên nhiệt tình, kinh nghiệm, Home Vu Apartments – Nha Trang rất hân hạnh được phục vụ quý khách! Niềm vui, sự hài lòng và thoải mái của khách hàng luôn là điều hạnh phúc nhất đối với tôi. Đến với chúng tôi các bạn sẽ luôn nhận được những nụ cười và những tiện ích tốt nhất.",
            available: 3,
            rates: [
                {
                    cleanRate: 5,
                    serviceRate: 5,
                    valueRate: 5,
                    accuracyRate: 5,
                    description: "Đội ngũ nhân viên nhiệt tình, kinh nghiệm, Home Vu Apartments – Nha Trang rất hân hạnh được phục vụ quý khách! Niềm vui, sự hài lòng và thoải mái của khách hàng luôn là điều hạnh phúc nhất đối với tôi. Đến với chúng tôi các bạn sẽ luôn nhận được những nụ cười và những tiện ích tốt nhất.",
                    userName: "Loan",
                    createdAt: new Date("11/11/2018")
                },
            ],
        },
        {
            name: "LeJardin De Papa",
            price: 250000,
            type:"Nhà riêng",
            address:"Đà Lạt, Lâm Đồng, Việt Nam",
            province:"Lâm Đồng",
            district:"Đà Lạt",
            description: "Hệ thống báo cháy tự động, điều hòa nhiệt độ, tủ lạnh, máy đun nước nóng, bồn tắm và máy sấy tóc… cũng là những tiện nghi có trong mỗi phòng. Đặc biệt, tất cả các căn hộ đều được trang bị đầy đủ các dụng cụ làm bếp, phục vụ quý khách có nhu cầu tự nấu nướng cho kỳ nghỉ của mình.",
            available: 3,
            rates: [
                {
                    cleanRate: 3,
                    serviceRate: 3,
                    valueRate: 3,
                    accuracyRate: 3,
                    description: "Hệ thống báo cháy tự động, điều hòa nhiệt độ, tủ lạnh, máy đun nước nóng, bồn tắm và máy sấy tóc… cũng là những tiện nghi có trong mỗi phòng. Đặc biệt, tất cả các căn hộ đều được trang bị đầy đủ các dụng cụ làm bếp, phục vụ quý khách có nhu cầu tự nấu nướng cho kỳ nghỉ của mình.",
                    userName: "Tú",
                    createdAt: new Date("01/02/2019")
                },
            ],
        },
        {
            name: "Oriana Villa Đà Lạt 102",
            price: 300000,
            type:"Biệt thự",
            address:"Đà Lạt, Lâm Đồng, Việt Nam",
            province:"Lâm Đồng",
            district:"Đà Lạt",
            description:"·Căn hộ được thiết kế với nhiều lựa chọn bố trí hợp lý và được trang bị theo tiêu chuẩn cao cấp 4 sao với ban công riêng và cảnh quan đẹp\n\n·Có nhiều dịch vụ tại chỗ khác nhau như giặt ủi, dịch vụ vệ sinh, Wi-Fi miễn phí tốc độ cao, an ninh 24/7\n\n·Dịch vụ khách hàng đặc biệt được cung cấp",
            available: 3,
            rates: [
                {
                    cleanRate: 2,
                    serviceRate: 3,
                    valueRate: 4,
                    accuracyRate: 4,
                    description: "Dịch vụ của Homestay rất tốt",
                    userName: "Nhật",
                    createdAt: new Date("12/08/2019")
                },
            ],
        },
        {
            name: "Le Petit Prince",
            price: 1400000,
            type:"Căn hộ",
            address:"Đà Lạt, Lâm Đồng, Việt Nam",
            province:"Lâm Đồng",
            district:"Đà Lạt",
            description:"·Thang máy ra vào căn hộ với hệ thống thẻ khóa an ninh\n\n·Phòng khách được thiết kế theo phong cách hiện đại với ghế sofa và khu vực ăn uống riêng\n\n·Nhà bếp được trang bị đầy đủ với bếp điện và máy hút mùi điện, lò vi sóng, tủ lạnh, ấm điện, đồ thủy tinh, đồ sành sứ, dao kéo",
            rates: [
                {
                    cleanRate: 5,
                    serviceRate: 5,
                    valueRate: 4,
                    accuracyRate: 4,
                    description: "Dịch vụ của Homestay rất tốt",
                    userName: "Châu",
                    createdAt: new Date("01/10/2021")
                },
            ],
        },
        {
            name: "Nhà Mình homestay",
            price: 830000,
            type:"Khác",
            address:"Đà Lạt, Lâm Đồng, Việt Nam",
            province:"Lâm Đồng",
            district:"Đà Lạt",
        },
        {
            name: "Cối Xay Gió Homestay and Coffee",
            price: 600000,
            type:"Khác",
            address:"Đà Lạt, Lâm Đồng, Việt Nam",
            province:"Lâm Đồng",
            district:"Đà Lạt",
        },
        {
            name: "Blue Light - Villa",
            price: 3100000,
            type:"Biệt thự",
            address:"Đà Lạt, Lâm Đồng, Việt Nam",
            province:"Lâm Đồng",
            district:"Đà Lạt",
        },
        {
            name: "H-Long Hotel Dalat",
            price: 740000,
            type:"Nhà riêng",
            address:"Đà Lạt, Lâm Đồng, Việt Nam",
            province:"Lâm Đồng",
            district:"Đà Lạt",
        },
        {
            name: "RỐN STUDIO",
            price: 800000,
            type:"Căn hộ Studio",
            address:"Đà Lạt, Lâm Đồng, Việt Nam",
            province:"Lâm Đồng",
            district:"Đà Lạt",
        },
        // minh
        {
            name: "AN VILLA15",
            price: 5000000,
            type: "Biệt thự",
            address: "Thạch Thất, Hà Nội, Vietnam",
            province: "Hà Nội",
            district: "Thạch Thất",
        },
        {
            name: "Villas",
            price: 4999000,
            type: "Biệt thự",
            address: "Ba Vì, Hà Nội, Vietnam",
            province: "Hà Nội",
            district: "Ba Vì",
        },
        {
            name: "Stream House",
            price: 9500000,
            type: "Biệt thự",
            address: "Sóc Sơn, Hà Nội, Vietnam",
            province: "Hà Nội",
            district: "Sóc Sơn",
        },
        {
            name: "1001 Lakeside Villas",
            price: 4900000,
            type: "Biệt thự",
            address: "Ba Vì, Hà Nội, Vietnam",
            province: "Hà Nội",
            district: "Ba Vì",
        },
        {
            name: "Biệt thự hoa hồng BT4",
            price: 4699000,
            type: "Biệt thự",
            address: "Ba Vì, Hà Nội, Vietnam",
            province: "Hà Nội",
            district: "Ba Vì",
        },
        {
            name: "Embossi Garden",
            price: 4000000,
            type: "Nhà riêng",
            address: "Ba Vì, Hà Nội, Vietnam",
            province: "Hà Nội",
            district: "Ba Vì",
        },
        {
            name: "Sóc Sơn Riverside",
            price: 4500000,
            type: "Biệt thự",
            address: "Sóc Sơn, Hà Nội, Vietnam",
            province: "Hà Nội",
            district: "Sóc Sơn",
        },
        {
            name: "Storm Villa",
            price: 4500000,
            type: "Biệt thự",
            address: "Sóc Sơn, Hà Nội, Vietnam",
            province: "Hà Nội",
            district: "Sóc Sơn",
        },
        {
            name: "The Moonlight",
            price: 4500000,
            type: "Biệt thự",
            address: "Sóc Sơn, Hà Nội, Vietnam",
            province: "Hà Nội",
            district: "Sóc Sơn",
        }, {
            name: "Choai Villa Sóc Sơn",
            price: 4500000,
            type: "Biệt thự",
            address: "Sóc Sơn, Hà Nội, Vietnam",
            province: "Hà Nội",
            district: "Sóc Sơn",
        }, {
            name: "BAVI Padme Home",
            price: 4500000,
            type: "Biệt thự",
            address: "Ba Vì, Hà Nội, Vietnam",
            province: "Hà Nội",
            district: "Ba Vì",
        }, {
            name: "MARS NNM",
            price: 4500000,
            type: "Khác",
            address: "Thạch Thất, Hà Nội, Vietnam",
            province: "Hà Nội",
            district: "Thạch Thất",
        }, {
            name: "Xanh Villa 04",
            price: 4500000,
            type: "Biệt thự",
            address: "Thạch Thất, Hà Nội, Vietnam",
            province: "Hà Nội",
            district: "Thạch Thất",
        }, {
            name: "Rose villa",
            price: 4000000,
            type: "Biệt thự",
            address: "Ba Vì, Hà Nội, Vietnam",
            province: "Hà Nội",
            district: "Ba Vì",
        }, {
            name: "An Vui Cottage 19",
            price: 4000000,
            type: "Khác",
            address: "Ba Vì, Hà Nội, Vietnam",
            province: "Hà Nội",
            district: "Ba Vì",
        },
        // Hoang
        {
            name: "Full House Condotel",
            price: 1650000,
            type: "Căn hộ chung cư",
            address: "Đà Lạt, Lâm Đồng, Vietnam ",
            province: "Lâm Đồng",
            district: "Đà Lạt",
        }, {
            name: "Luxury Villa in supercentral",
            price: 2050000,
            type: "Biệt thự",
            address: "Hải Châu, Đà Nẵng, Vietnam",
            province: "Đà Nẵng",
            district: "Hải Châu",
        }, {
            name: "Icity Villa Riverfront Danang",
            price: 8500000,
            type: "Biệt thự",
            address: "Hải Châu, Đà Nẵng, Vietnam",
            province: "Đà Nẵng",
            district: "Hải Châu",
        }, {
            name: "Kaia Residence - Private Terrace - Secret Garden",
            price: 1140000,
            type: "Căn hộ Studio",
            address: "Hải Châu, Đà Nẵng, Vietnam",
            province: "Đà Nẵng",
            district: "Hải Châu",
        }, {
            name: "Ocean View Home 2736",
            price: 1500000,
            type: "Căn hộ chung cư",
            address: "Ngũ Hành Sơn, Đà Nẵng, Vietnam",
            province: "Đà Nẵng",
            district: "Ngũ Hành Sơn",
        }, {
            name: "T P Villa",
            price: 3500000,
            type: "Biệt thự",
            address: "Ngũ Hành Sơn, Đà Nẵng, Vietnam",
            province: "Đà Nẵng",
            district: "Ngũ Hành Sơn",
        }, {
            name: "MAI VILLA DA NANG",
            price: 699000,
            type: "Biệt thự",
            address: "Ngũ Hành Sơn, Đà Nẵng, Vietnam",
            province: "Đà Nẵng",
            district: "Ngũ Hành Sơn",
        }, {
            name: "Muong Thanh Apartment Sea View",
            price: 800000,
            type: "Căn hộ dịch vụ",
            address: "Ngũ Hành Sơn, Đà Nẵng, Vietnam",
            province: "Đà Nẵng",
            district: "Ngũ Hành Sơn",
        }, {
            name: "Suit family apartment",
            price: 850000,
            type: "Căn hộ dịch vụ",
            address: "Hải Châu, Đà Nẵng, Vietnam",
            province: "Đà Nẵng",
            district: "Hải Châu",
        }, {
            name: "Tropical House Apartment",
            price: 730000,
            type: "Căn hộ dịch vụ",
            address: "Sơn Trà, Đà Nẵng, Vietnam",
            province: "Đà Nẵng",
            district: "Sơn Trà",
        }, {
            name: "Top Hotel Apartment",
            price: 650000,
            type: "Căn hộ dịch vụ",
            address: "Sơn Trà, Đà Nẵng, Vietnam",
            province: "Đà Nẵng",
            district: "Sơn Trà",
        }, {
            name: "Bong Villa",
            price: 3300000,
            type: "Biệt thự",
            address: "Sơn Trà, Đà Nẵng, Vietnam",
            province: "Đà Nẵng",
            district: "Sơn Trà",
        }, {
            name: "Rolex",
            price: 1700000,
            type: "Căn hộ Studio",
            address: "Hải Châu, Đà Nẵng, Vietnam",
            province: "Đà Nẵng",
            district: "Hải Châu",
        }, {
            name: "ARITA RIVERA",
            price: 1300000,
            type: "Căn hộ dịch vụ",
            address: "Ngũ Hành Sơn, Đà Nẵng, Vietnam",
            province: "Đà Nẵng",
            district: "Ngũ Hành Sơn",
        },{
            name: "B245 VILLA VUNG TAU",
            price: 5500000,
            type: "Biệt thự",
            address: "Vũng Tàu, Bà Rịa Vũng Tàu, Vietnam",
            province: "Bà Rịa Vũng Tàu",
            district: "Vũng Tàu",
        },
        //Nhat
        {
            name: "The 1993 Hoi An",
            price: 420000,
            type: "Nhà riêng",
            address: "Hội An, Quảng Nam, Việt Nam",
            province: "Quảng Nam",
            district: "Hội An",
        },{
            name: "Hai Au Boutique",
            price: 750000,
            type: "Biệt thự",
            address: "Hội An, Quảng Nam, Việt Nam",
            province: "Quảng Nam",
            district: "Hội An",
        },{
            name: "De An Hoi An",
            price: 560000,
            type: "Biệt thự",
            address: "Hội An, Quảng Nam, Việt Nam",
            province: "Quảng Nam",
            district: "Hội An",
        },{
            name: "Mali Villa",
            price: 3000000,
            type: "Biệt thự",
            address: "Hội An, Quảng Nam, Việt Nam",
            province: "Quảng Nam",
            district: "Hội An",
        },{
            name: "Ancient River Villa",
            price: 400000,
            type: "Biệt thự",
            address: "Hội An, Quảng Nam, Việt Nam",
            province: "Quảng Nam",
            district: "Hội An",
        },{
            name: "Dao Tien homestay",
            price: 550000,
            type: "Khác",
            address: "Hội An, Quảng Nam, Việt Nam",
            province: "Quảng Nam",
            district: "Hội An",
        },{
            name: "La Vista Villa Hoi An",
            price: 320000,
            type: "Biệt thự",
            address: "Hội An, Quảng Nam, Việt Nam",
            province: "Quảng Nam",
            district: "Hội An",
        },{
            name: "ABA TRAVEL VILLA",
            price: 380000,
            type: "Biệt thự",
            address: "Hội An, Quảng Nam, Việt Nam",
            province: "Quảng Nam",
            district: "Hội An",
        },{
            name: "Bespoke Villa",
            price: 350000,
            type: "Biệt thự",
            address: "Hội An, Quảng Nam, Việt Nam",
            province: "Quảng Nam",
            district: "Hội An",
        },{
            name: "Double Luxury Room",
            price: 400000,
            type: "Khác",
            address: "Hội An, Quảng Nam, Việt Nam",
            province: "Quảng Nam",
            district: "Hội An",
        },{
            name: "Santori Homestay",
            price: 5000000,
            type: "Biệt thự",
            address: "Hội An, Quảng Nam, Việt Nam",
            province: "Quảng Nam",
            district: "Hội An",
        },{
            name: "Flame Flowers Homestay",
            price: 480000,
            type: "Khác",
            address: "Hội An, Quảng Nam, Việt Nam",
            province: "Quảng Nam",
            district: "Hội An",
        },{
            name: "YLANG GARDEN VILLA",
            price: 9000000,
            type: "Căn hộ dịch vụ",
            address: "Hội An, Quảng Nam, Việt Nam",
            province: "Quảng Nam",
            district: "Hội An",
        },{
            name: "Open Balcony",
            price: 500000,
            type: "Khác",
            address: "Hội An, Quảng Nam, Việt Nam",
            province: "Quảng Nam",
            district: "Hội An",
        },{
            name: "Hoi An Majestic villa",
            price: 850000,
            type: "Khác",
            address: "Hội An, Quảng Nam, Việt Nam",
            province: "Quảng Nam",
            district: "Hội An",
        },

        // Thêm 10 homestays cho Hà Nội - Tú
        {
            name: "The Galaxy Home",
            price: 850000,
            type:"Căn hộ dịch vụ",
            address:"Cầu Giấy, Hà Nội, Vietnam",
            province:"Hà Nội",
            district:"Cầu Giấy",
            rates: [
                {
                    cleanRate: 3,
                    serviceRate: 4,
                    valueRate: 5,
                    accuracyRate: 4,
                    description: "Dịch vụ của Homestay khá ổn",
                    userName: "Minh",
                    createdAt: new Date("12/09/2019")
                },
            ],
        },
        {
            name: "Esperanto Artistic studio",
            price: 808500,
            type:"Căn hộ Studio",
            address:"Hoàn Kiếm, Hà Nội, Vietnam",
            province:"Hà Nội",
            district:"Hoàn Kiếm",
            rates: [
                {
                    cleanRate: 4,
                    serviceRate: 5,
                    valueRate: 5,
                    accuracyRate: 5,
                    description: "Dịch vụ của Homestay rất tốt",
                    userName: "Nhật",
                    createdAt: new Date("12/12/2018")
                },
            ],
        },
        {
            name: "Tiny&Tom Home",
            price: 600600,
            type:"Nhà riêng",
            address:"Ba Đình, Hà Nội, Vietnam",
            province:"Hà Nội",
            district:"Ba Đình",
            rates: [
                {
                    cleanRate: 5,
                    serviceRate: 5,
                    valueRate: 5,
                    accuracyRate: 5,
                    description: "Dịch vụ của Homestay rất tốt",
                    userName: "Tú",
                    createdAt: new Date("1/06/2017")
                },
            ],
        },
        {
            name: "Hanoi Friendly House",
            price: 2800000,
            type:"Nhà riêng",
            address:"Tây Hồ, Hà Nội, Vietnam",
            province:"Hà Nội",
            district:"Tây Hồ",
            rates: [
                {
                    cleanRate: 4,
                    serviceRate: 4,
                    valueRate: 4,
                    accuracyRate: 4,
                    description: "Dịch vụ của Homestay rất tốt",
                    userName: "Đạt",
                    createdAt: new Date("2/12/2020")
                },
            ],
        },
        {
            name: "Sa Sa House Old Quarter Quiet Private Room 5F",
            price: 800000,
            type:"Nhà riêng",
            address:"Hoàn Kiếm, Hà Nội, Vietnam",
            province:"Hà Nội",
            district:"Hoàn Kiếm",
            rates: [
                {
                    cleanRate: 5,
                    serviceRate: 4,
                    valueRate: 5,
                    accuracyRate: 4,
                    description: "Dịch vụ của Homestay rất tốt",
                    userName: "Quỳnh Anh",
                    createdAt: new Date("2/12/2019")
                },
            ],
        },
        {
            name: "OKiaTreehouse - NHÀ KHẾ",
            price: 750000,
            type:"Khác",
            address:"Ba Vì, Hà Nội, Vietnam",
            province:"Hà Nội",
            district:"Ba Vì",
            rates: [
                {
                    cleanRate: 5,
                    serviceRate: 3,
                    valueRate: 5,
                    accuracyRate: 5,
                    description: "Dịch vụ của Homestay rất tốt",
                    userName: "Thanh",
                    createdAt: new Date("7/01/2018")
                },
            ],
        },
        {
            name: "The Kefi House Ba Vi - Villa Hồng Anh",
            price: 3800000,
            type:"Biệt thự",
            address:"Ba Vì, Hà Nội, Vietnam",
            province:"Hà Nội",
            district:"Ba Vì",
            rates: [
                {
                    cleanRate: 4,
                    serviceRate: 4,
                    valueRate: 4,
                    accuracyRate: 4,
                    description: "Dịch vụ của Homestay rất tốt",
                    userName: "Bình",
                    createdAt: new Date("2/08/2019")
                },
            ],
        },
        {
            name: "Mersey Central Hanoi",
            price: 900000,
            type:"Căn hộ dịch vụ",
            address:"Ba Đình, Hà Nội, Vietnam",
            province:"Hà Nội",
            district:"Ba Đình",
            rates: [
                {
                    cleanRate: 5,
                    serviceRate: 5,
                    valueRate: 4,
                    accuracyRate: 4,
                    description: "Dịch vụ của Homestay rất tốt",
                    userName: "Hoàng",
                    createdAt: new Date("4/04/2019")
                },
            ],
        },
        {
            name: "Vinhomes Ocean Park",
            price: 419000,
            type:"Căn hộ chung cư",
            address:"Gia Lâm, Hà Nội, Vietnam",
            province:"Hà Nội",
            district:"Gia Lâm",
            rates: [
                {
                    cleanRate: 4,
                    serviceRate: 4,
                    valueRate: 5,
                    accuracyRate: 3,
                    description: "Dịch vụ của Homestay rất tốt",
                    userName: "Tú",
                    createdAt: new Date("1/04/2019")
                },
            ],
        },
        {
            name: "Luxury Stay",
            price: 1180000,
            type:"Căn hộ dịch vụ",
            address:"Ba Đình, Hà Nội, Vietnam",
            province:"Hà Nội",
            district:"Ba Đình",
            rates: [
                {
                    cleanRate: 5,
                    serviceRate: 4,
                    valueRate: 5,
                    accuracyRate: 5,
                    description: "Dịch vụ của Homestay rất tốt",
                    userName: "Minh",
                    createdAt: new Date("2/07/2017")
                },
            ],
        },

        // Nhat them 10 homestays
        {
            name: "Leo house LinhLang",
            price: 470000,
            type:"Căn hộ dịch vụ",
            address:"Ba Đình, Hà Nội, Vietnam",
            province:"Hà Nội",
            district:"Ba Đình",
            rates: [
                {
                    cleanRate: 5,
                    serviceRate: 4,
                    valueRate: 5,
                    accuracyRate: 5,
                    description: "Dịch vụ của Homestay rất tốt",
                    userName: "Minh",
                    createdAt: new Date("2/07/2017")
                },
            ],
        },
        {
            name: "Lucky Time - Lucky House, Sóc Sơn.",
            price: 1180000,
            type:"Căn hộ dịch vụ",
            address:"Sóc Sơn, Hà Nội, Vietnam",
            province:"Hà Nội",
            district:"Sóc Sơn",
            rates: [
                {
                    cleanRate: 5,
                    serviceRate: 4,
                    valueRate: 5,
                    accuracyRate: 5,
                    description: "Dịch vụ của Homestay rất tốt",
                    userName: "Minh",
                    createdAt: new Date("2/07/2017")
                },
            ],
        },
        {
            name: "Stream House ♥ Nghỉ Dưỡng Bungalow",
            price: 1180000,
            type:"Căn hộ dịch vụ",
            address:"Sóc Sơn, Hà Nội, Vietnam",
            province:"Hà Nội",
            district:"Sóc Sơn",
            rates: [
                {
                    cleanRate: 5,
                    serviceRate: 4,
                    valueRate: 5,
                    accuracyRate: 5,
                    description: "Dịch vụ của Homestay rất tốt",
                    userName: "Minh",
                    createdAt: new Date("2/07/2017")
                },
            ],
        },
        {
            name: "Breakfast Included★4BR Apartment",
            price: 1180000,
            type:"Căn hộ dịch vụ",
            address:"Ba Đình, Hà Nội, Vietnam",
            province:"Hà Nội",
            district:"Ba Đình",
            rates: [
                {
                    cleanRate: 5,
                    serviceRate: 4,
                    valueRate: 5,
                    accuracyRate: 5,
                    description: "Dịch vụ của Homestay rất tốt",
                    userName: "Minh",
                    createdAt: new Date("2/07/2017")
                },
            ],
        },
        {
            name: "Big group✩Old Quarter✩Cityview✩3sto HoanKiemLake",
            price: 1180000,
            type:"Căn hộ dịch vụ",
            address:"Hoàn Kiếm, Hà Nội, Vietnam",
            province:"Hà Nội",
            district:"Hoàn Kiếm",
            rates: [
                {
                    cleanRate: 5,
                    serviceRate: 4,
                    valueRate: 5,
                    accuracyRate: 5,
                    description: "Dịch vụ của Homestay rất tốt",
                    userName: "Minh",
                    createdAt: new Date("2/07/2017")
                },
            ],
        },
        {
            name: "Asahi Luxstay - R4 Royal City 2Br Apartment",
            price: 1180000,
            type:"Căn hộ dịch vụ",
            address:"Thanh Xuân, Hà Nội, Vietnam",
            province:"Hà Nội",
            district:"Thanh Xuân",
            rates: [
                {
                    cleanRate: 5,
                    serviceRate: 4,
                    valueRate: 5,
                    accuracyRate: 5,
                    description: "Dịch vụ của Homestay rất tốt",
                    userName: "Minh",
                    createdAt: new Date("2/07/2017")
                },
            ],
        },
        {
            name: "Asahi Luxstay - R4 Royal City - 1Br Apartment",
            price: 1180000,
            type:"Căn hộ dịch vụ",
            address:"Thanh Xuân, Hà Nội, Vietnam",
            province:"Hà Nội",
            district:"Thanh Xuân",
            rates: [
                {
                    cleanRate: 5,
                    serviceRate: 4,
                    valueRate: 5,
                    accuracyRate: 5,
                    description: "Dịch vụ của Homestay rất tốt",
                    userName: "Minh",
                    createdAt: new Date("2/07/2017")
                },
            ],
        },
        {
            name: "Villa 2 phòng ngủ-bể sục nóng bơi quanh năm",
            price: 1180000,
            type:"Căn hộ dịch vụ",
            address:"Ba Vì, Hà Nội, Vietnam",
            province:"Hà Nội",
            district:"Ba Vì",
            rates: [
                {
                    cleanRate: 5,
                    serviceRate: 4,
                    valueRate: 5,
                    accuracyRate: 5,
                    description: "Dịch vụ của Homestay rất tốt",
                    userName: "Minh",
                    createdAt: new Date("2/07/2017")
                },
            ],
        },
        {
            name: "Diamond 22housing 1BR Vinhomes Metropolis, Near Lotte Tower",
            price: 1180000,
            type:"Căn hộ dịch vụ",
            address:"Ba Đình, Hà Nội, Vietnam",
            province:"Hà Nội",
            district:"Ba Đình",
            rates: [
                {
                    cleanRate: 5,
                    serviceRate: 4,
                    valueRate: 5,
                    accuracyRate: 5,
                    description: "Dịch vụ của Homestay rất tốt",
                    userName: "Minh",
                    createdAt: new Date("2/07/2017")
                },
            ],
        },
        {
            name: "PICCOLO phòng đẹp lý tưởng với decor cực chill ở trung tâm HN",
            price: 1180000,
            type:"Căn hộ dịch vụ",
            address:"Ba Đình, Hà Nội, Vietnam",
            province:"Hà Nội",
            district:"Ba Đình",
            rates: [
                {
                    cleanRate: 5,
                    serviceRate: 4,
                    valueRate: 5,
                    accuracyRate: 5,
                    description: "Dịch vụ của Homestay rất tốt",
                    userName: "Minh",
                    createdAt: new Date("2/07/2017")
                },
            ],
        },

        // Minh them 10 homestays
        {
            name: "Mirr Homestay Hanoi 2",
            price: 354009,
            type: "Nhà riêng",
            address: "Tây Hồ, Hà Nội, Vietnam ",
            province: "Hà Nội",
            district: "Tây Hồ",
            rates: [
                {
                    cleanRate: 5,
                    serviceRate: 4,
                    valueRate: 3,
                    accuracyRate: 2,
                    description: "An excellent host who even came To pick me outside as I was a little lost... I definitely recommend Viên's house ",
                    userName: "Nhật",
                    createdAt: new Date("01/08/2018")
                },
            ],
        },
        {
            name: "Hana' House",
            price: 354009,
            type: "Nhà riêng",
            address: "Tây Hồ, Hà Nội, Vietnam ",
            province: "Hà Nội",
            district: "Tây Hồ",
            rates: [
                {
                    cleanRate: 4,
                    serviceRate: 4,
                    valueRate: 3,
                    accuracyRate: 4,
                    description: "Một nơi hoàn hảo để ở!",
                    userName: "Minh",
                    createdAt: new Date("01/08/2021")
                },
            ],
        },
        {
            name: "Đông Viên Village",
            price: 354009,
            type: "Nhà riêng",
            address: "Ba Đình, Hà Nội, Vietnam",
            province: "Hà Nội",
            district: "Ba Đình",
            rates: [
                {
                    cleanRate: 4,
                    serviceRate: 4,
                    valueRate: 3,
                    accuracyRate: 4,
                    description: "Homestay khá tốt",
                    userName: "Tú",
                    createdAt: new Date("01/08/2021")
                },
            ],
        },
        {
            name: "Studio Deluxe",
            price: 354009,
            type: "Khác",
            address: "Ba Đình, Hà Nội, Vietnam",
            province: "Hà Nội",
            district: "Ba Đình",
            rates: [
                {
                    cleanRate: 4,
                    serviceRate: 5,
                    valueRate: 5,
                    accuracyRate: 4,
                    description: "Dịch vụ ở đây thật là tuyệt vời!",
                    userName: "Đạt",
                    createdAt: new Date("01/10/2021")
                },
            ],
        },
        {
            name: "Aimee House",
            price: 350000,
            type: "Khác",
            address: "Hoàn Kiếm, Hà Nội, Vietnam",
            province: "Hà Nội",
            district: "Hoàn Kiếm",
            rates: [
                {
                    cleanRate: 4,
                    serviceRate: 4,
                    valueRate: 3,
                    accuracyRate: 4,
                    description: "cá tính, hiện đại, lãng mạng, ấm cúng",
                    userName: "Hoàng",
                    createdAt: new Date("10/08/2021")
                },
            ],
        },
        {
            name: "HBT HOMESTAY",
            price: 300000,
            type: "Nhà riêng",
            address: "Hoàn Kiếm, Hà Nội, Vietnam",
            province: "Hà Nội",
            district: "Hoàn Kiếm",
            rates: [
                {
                    cleanRate: 5,
                    serviceRate: 5,
                    valueRate: 3,
                    accuracyRate: 4,
                    description: "Dịch vụ của homestay này thật đẹp:v",
                    userName: "Thanh",
                    createdAt: new Date("01/11/2021")
                },
            ],
        },
        {
            name: "STAR HOUSE IN THE OLD QUARTER",
            price: 350000,
            type: "Nhà riêng",
            address: "Hoàn Kiếm, Hà Nội, Vietnam",
            province: "Hà Nội",
            district: "Hoàn Kiếm",
            rates: [
                {
                    cleanRate: 5,
                    serviceRate: 4,
                    valueRate: 5,
                    accuracyRate: 4,
                    description: "nằm ở trung tâm Hà Nội trên một trong những con đường đẹp nhất trong khu phố cổ. Từ căn hộ này sẽ ko khiến bạn thất vọng, sẽ rất thuận tiện cho bạn khám phá Hà Nội và bạn chắc chắn sẽ háo hức lang thang dọc theo những con phố cổ để ghé qua các cửa hàng và mua đặc sản",
                    userName: "Quỳnh Anh",
                    createdAt: new Date("01/08/2021")
                },
            ],
        },
        {
            name: "Capsule Hanoi Penthouse",
            price: 354009,
            type: "Căn hộ dịch vụ",
            address: "Ba Đình, Hà Nội, Vietnam",
            province: "Hà Nội",
            district: "Ba Đình",
            rates: [
                {
                    cleanRate: 4,
                    serviceRate: 4,
                    valueRate: 3,
                    accuracyRate: 4,
                    description: "Tuyệt!",
                    userName: "Bình",
                    createdAt: new Date("01/08/2021")
                },
            ],
        },
        {
            name: "Nordique",
            price: 350000,
            type: "Nhà riêng",
            address: "Hai Bà Trưng, Hà Nội, Vietnam ",
            province: "Hà Nội",
            district: "Hai Bà Trưng",
            rates: [
                {
                    cleanRate: 4,
                    serviceRate: 4,
                    valueRate: 4,
                    accuracyRate: 4,
                    description: "Phòng thực tế hơi cũ và tối so với ảnh. Nội thất cũng hơi bừa một chút. Vệ sinh tương đối nhưng mình có cảm giác đồ trong phòng hơi bụi. Ưu điểm là bạn chủ nhà nhiệt tình hỗ trợ nhận, trả phòng nhanh chóng. Mình nghĩ nếu đầu tư vệ sinh dọn dẹp trước khi khách nhận phòng sẽ để lại ấn tượng tốt hơn.",
                    userName: "Minh",
                    createdAt: new Date("01/08/2021")
                },
            ],
        },
        {
            name: "Brandnew apartment",
            price: 350000,
            type: "Nhà riêng",
            address: "Tây Hồ, Hà Nội, Vietnam ",
            province: "Hà Nội",
            district: "Tây Hồ",
            rates: [
                {
                    cleanRate: 4,
                    serviceRate: 4,
                    valueRate: 3,
                    accuracyRate: 4,
                    description: "Căn hộ hoàn toàn sạch sẽ với ban công riêng và nhà bếp riêng được trang bị tốt Vị trí cực kỳ thuận tiện cho hầu hết các điểm du lịch ở Hà Nội, bắt taxi hoặc lấy xe vì địa chỉ cực kỳ dễ tìm Điều đặc biệt ở nơi này là: Dễ dàng đến Hồ, Phố cổ, các điểm tham quan hà nội, nhà hàng, ... ",
                    userName: "Nhật",
                    createdAt: new Date("01/08/2021")
                },
            ],
        }
    ]);

    // Tạm tạo cho các homestays rate
    /** danh sách url phải đúng thứ tự với danh sách homestays ở trên */
    let photoUrls = [
        "/upload/homestays-photos/999 CONDOTEL Muong Thanh Vien Trieu.jpg",
        "/upload/homestays-photos/Scenia Bay Residences Nha Tran.jpg",
        "/upload/homestays-photos/Wonderland 24H Apartments.jpg",
        "/upload/homestays-photos/Shoho Hotel Nha Trang.jpg",
        "/upload/homestays-photos/Diamond Villa.jpg",
        "/upload/homestays-photos/Relaxing 2 BR Apartment.jpg",
        "/upload/homestays-photos/Paralia Nha Trang.jpg",
        "/upload/homestays-photos/LeJardin De Papa.jpg",
        "/upload/homestays-photos/Oriana Villa Da Lat 102.jpg",
        "/upload/homestays-photos/Le Petit Prince.jpg",
        "/upload/homestays-photos/Nha Minh homestay.jpg",
        "/upload/homestays-photos/Coi Xay Gio Homestay and Coffee.jpg",
        "/upload/homestays-photos/Blue Light - Villa.jpg",
        "/upload/homestays-photos/H-Long Hotel Dalat.jpg",
        "/upload/homestays-photos/RON STUDIO.jpg",
        "/upload/homestays-photos/AN VILLA15.jpg",
        "/upload/homestays-photos/Villas.jpg",
        "/upload/homestays-photos/Stream House.jpg",
        "/upload/homestays-photos/1001 Lakeside Villas.jpg",
        "/upload/homestays-photos/Biệt thự hoa hồng BT4.jpg",
        "/upload/homestays-photos/Embossi Garden.jpg",
        "/upload/homestays-photos/Sóc Sơn Riverside.jpg",
        "/upload/homestays-photos/Storm Villa.jpg",
        "/upload/homestays-photos/The Moonlight.jpg",
        "/upload/homestays-photos/Choai Villa Sóc Sơn.png",
        "/upload/homestays-photos/BAVI Padme Home.jpg",
        "/upload/homestays-photos/MARSNNM.png",
        "/upload/homestays-photos/Xanh Villa 04.jpg",
        "/upload/homestays-photos/Rose villa.jpg",
        "/upload/homestays-photos/An Vui Cottage 19.jpg",
        //hoang
        "/upload/homestays-photos/fullhousecondotel_1.png",
        "/upload/homestays-photos/luxuryvillainsupercentral_1.jpg",
        "/upload/homestays-photos/icityvillariverfrontdanang_1.jpg",
        "/upload/homestays-photos/kaiaresidenceprivateterracesecretgarden_1.jpg",
        "/upload/homestays-photos/oceanviewhome2736_1.jpg",
        "/upload/homestays-photos/tpvilla_1.jpg",
        "/upload/homestays-photos/maivilladanang_1.jpg",
        "/upload/homestays-photos/muongthanhapartmentseaview_1.jpg",
        "/upload/homestays-photos/suitfamilyapartment_1.jpg",
        "/upload/homestays-photos/tropicalhouseapartment_1.jpg",
        "/upload/homestays-photos/tophotelapartment_1.jpg",
        "/upload/homestays-photos/bongvilla_1.jpg",
        "/upload/homestays-photos/rolex_1.jpg",
        "/upload/homestays-photos/aritarivera_1.jpg",
        "/upload/homestays-photos/b245villavungtau_1.jpg",
        //Nhat
        "/upload/homestays-photos/The 1993 Hoi An.jpg",
        "/upload/homestays-photos/Hai Au Boutique.jpg",
        "/upload/homestays-photos/De An Hoi An.jpg",
        "/upload/homestays-photos/Mali Villa.jpg",
        "/upload/homestays-photos/Ancient River Villa.jpg",
        "/upload/homestays-photos/Dao Tien homestay.png",
        "/upload/homestays-photos/La Vista Villa Hoi An.jpg",
        "/upload/homestays-photos/ABA TRAVEL VILLA.png",
        "/upload/homestays-photos/Bespoke Villa.jpg",
        "/upload/homestays-photos/Double Luxury Room.jpg",
        "/upload/homestays-photos/Santori Homestay.jpg",
        "/upload/homestays-photos/Flame Flowers Homestay.jpg",
        "/upload/homestays-photos/YLANG GARDEN VILLA.jpg",
        "/upload/homestays-photos/Open Balcony.jpg",
        "/upload/homestays-photos/Hoi An Majestic villa.jpg",

        // Them 10 homestays tai Ha Noi - TuNN
        "/upload/homestays-photos/TheGalaxyHome.png",
        "/upload/homestays-photos/Esperanto Artistic studio.jpg",
        "/upload/homestays-photos/Tiny&Tom Home.jpg",
        "/upload/homestays-photos/Hanoi Friendly House.jpg",
        "/upload/homestays-photos/Sa Sa House Old Quarter Quiet Private Room 5F.png",
        "/upload/homestays-photos/OKiaTreehouse - NHA KHE.jpg",
        "/upload/homestays-photos/The Kefi House Ba Vi - Villa Hong Anh.jpg",
        "/upload/homestays-photos/Mersey Central Hanoi.jpg",
        "/upload/homestays-photos/Vinhomes Ocean Park.jpg",
        "/upload/homestays-photos/Luxury Stay.jpg",

        // Thêm 10 homestays tại Ha Noi - NhatNT
        "/upload/homestays-photos/1.jpg",
        "/upload/homestays-photos/2.jpg",
        "/upload/homestays-photos/3.jpg",
        "/upload/homestays-photos/4.jpg",
        "/upload/homestays-photos/5.png",
        "/upload/homestays-photos/6.jpg",
        "/upload/homestays-photos/7.jpg",
        "/upload/homestays-photos/8.jpg",
        "/upload/homestays-photos/9.jpg",
        "/upload/homestays-photos/10.jpg",
        
        // Them 10 homestays tai Ha Noi - Minh
        "/upload/homestays-photos/Mirr Homestay Hanoi 2.png",
        "/upload/homestays-photos/Hana' House.jpg",
        "/upload/homestays-photos/Đong Vien Village.jpg",
        "/upload/homestays-photos/Studio Deluxe.jpg",
        "/upload/homestays-photos/Aimee House.jpg",
        "/upload/homestays-photos/HBT HOMESTAY.png",
        "/upload/homestays-photos/STAR HOUSE IN THE OLD QUARTER.jpg",
        "/upload/homestays-photos/Capsule Hanoi Penthouse.jpg",
        "/upload/homestays-photos/Nordique.jpg",
        "/upload/homestays-photos/Brandnew apartment.jpg",
    ]

    // Lưu và cập nhật _id vào mỗi documents (bidirectional)
    for(let i = 0; i < homestays.length; i++) {
        let photo = await Photos(db).create({
            url: photoUrls[i],
            homestays: homestays[i]._id,
        })
        // cập nhật _id của photo vào homestays
        await Homestays(db).findByIdAndUpdate(homestays[i]._id,
            {$push: {photos: photo._id}})
    }

    /** danh sách generalServices phải đúng thứ tự với danh sách homestays ở trên */
    let generalServicesName = [
        // Làm thêm 7 cái cho đủ 10 cái như này
        "Bể bơi",
        "Phòng karaoke",
        "Suối nước nóng",
        "Coffee bên hồ",
        "Dọn phòng",
        "Cho thuê xe tự lái",
        "Dịch vụ giặt ủi",
        "Massage trị liệu",
        "Xông hơi",
        "Thuê hướng dẫn viên du lịch"
    ]
    // Gán theo thứ tự các generalServices cho các homestay
    // Hiện tại đang seed dữ liệu kiểu 1 - 1 , sau sẽ chỉnh lại thành 1 - n sau
    for(let i = 0; i < generalServicesName.length; i++) {
        let generalServicesID = new Array();
        for (let j = 0; j < 25; j++) {
            generalServicesID[j] = homestays[i + j * 2]._id;
        }
        let generalServices = await GeneralServices(db).create({
            name: generalServicesName[i],
            homestays: generalServicesID,
        })
        // cập nhật _id của generalService vào homestays
        for (let j = 0; j < 25; j++) {
            await Homestays(db).findByIdAndUpdate(homestays[i + j * 2]._id,
                {$push: {generalServices: generalServices._id}})
        }
    }

    // Seed data phan Bills

    let bills =  await Bills(db).create([
        {
            customer:{
                name: "Nguyen Quynh Anh",
                identification: "012345678910",
                email: "quynhanh@gmail.com",
                phoneNumber: "1234567890",
                age: 20
            },
            customerTogether :[
                {
                    name: "Nguyen Thi Thao",
                    age: 20,
                },
                {
                    name: "Nguyen Thi Thu",
                    age: 20,
                },
                {
                    name: "Vu Linh Chi",
                    age: 20,
                }
            ],
            checkinDate: new Date("1-20-2021"),
            checkoutDate: new Date("1-25-2021"),
            status: 3
        },
        {
            customer:{
                name: "Nguyen The Nhat",
                identification: "012345678911",
                email: "nhat@gmail.com",
                phoneNumber: "1234567891",
                age: 20
            },
            customerTogether :[
                {
                    name: "Tran Van Ngoc",
                    age: 18,
                },
            ],
            checkinDate: new Date("2-23-2021"),
            checkoutDate: new Date("2-28-2021"),
            status: 1
        },
        {
            customer:{
                name: "Tran Tuan Dat",
                identification: "012345678912",
                email: "datoccho@gmail.com",
                phoneNumber: "1234567892",
                age: 20
            },
            customerTogether :[
                {
                    name: "Bo Cua Dat",
                    age: 45,
                },
                {
                    name: "Me Cua Dat",
                    age: 40,
                },
                {
                    name: "Em Gai Cua Dat",
                    age: 15,
                }
            ],
            checkinDate: new Date ("3-7-2021"),
            checkoutDate: new Date("3-12-2021"),
            status: 2
        },
        {
            customer:{
                name: "Nguyen Ba Binh",
                identification: "012345678913",
                email: "bingboong@gmail.com",
                phoneNumber: "1234567893",
                age: 20
            },
            customerTogether :[
                {
                    name: "Nguoi Yeu Binh",
                    age: 22,
                },
            ],
            checkinDate: new Date("4-28-2021"),
            checkoutDate: new Date("4-03-2021"),
            status: 3
        },
        {
            customer:{
                name: "Vu Minh Thanh",
                identification: "012345678914",
                email: "thanhcute@gmail.com",
                phoneNumber: "1234567894",
                age: 35
            },
            customerTogether :[
                {
                    name: "Rua",
                    age: 25,
                },
            ],
            checkinDate: new Date("5-03-2021"),
            checkoutDate: new Date("5-10-2021"),
            status: 2
        },
        {
            customer:{
                name: " Fuckboizz Kien Dao",
                identification: "012345678915",
                email: "kindao@gmail.com",
                phoneNumber: "1234567895",
                age: 27
            },
            customerTogether :[
                {
                    name: "Fuckboizz Trung",
                    age: 27,
                },
            ],
            checkinDate: new Date("6-15-2021"),
            checkoutDate: new Date( "6-20-2021"),
            status: 1
        },
        {
            customer:{
                name: " Pham Cong Minh",
                identification: "012345678916",
                email: "minh@gmail.com",
                phoneNumber: "1234567896",
                age: 20
            },
            customerTogether :[
                {
                    name: "Nguyen The Nhat",
                    age: 20,
                },
                {
                    name: "Tran Tuan Dat",
                    age: 20,
                },
                {
                    name: "Nguyen Ngoc Tu",
                    age: 20,
                },
                {
                    name: "Nguyen Ba Binh",
                    age: 20,
                },
                {
                    name: "Pham Viet Hoang",
                },
                {
                    name: "Vu Minh Thanh pld",
                    age: 20,
                },
                {
                    name: "Nguyen Quynh Anh",
                    age: 20,
                },
            ],
            checkinDate: new Date("7-10-2022"),
            checkoutDate: new Date("7-20-2022"),
            status: 1
        },
        {
            customer:{
                name: "Cristian Ronaldo",
                identification: "012345678917",
                email: "ronaldo@gmail.com",
                phoneNumber: "1234567897",
                age: 36
            },
            customerTogether :[
                {
                    name: "Edison Cavani",
                    age: 34,
                },
                {
                    name: "Van der Beek",
                    age: 22,
                },
                {
                    name: "Wukong Degea",
                    age: 28,
                },
                {
                    name: "Shaw U'",
                    age: 28,
                },
                {
                    name: "Jadon Sancho",
                    age: 21,
                },
                {
                    name: "Lord Fred",
                    age: 25,
                },
                {
                    name: "Harry Max Hai",
                    age: 26,
                },
            ],
            checkinDate: new Date("8-20-2021"),
            checkoutDate: new Date("8-30-2021"),
            status: 1
        },
        {
            customer:{
                name: "Leonel Messi",
                identification: "012345678918",
                email: "messi@gmail.com",
                phoneNumber: "1234567898",
                age: 34
            },
            customerTogether :[
                {
                    name: "Neymar JR",
                    age: 30,
                },
                {
                    name: "Killian Mpappe",
                    age: 22,
                },
            ],
            checkinDate: new Date("9-9-2021"),
            checkoutDate: new Date("9-15-2021"),
            status: 2
        },
        {
            customer:{
                name: "Tom Holland",
                identification: "012345678919",
                email: "holland@gmail.com",
                phoneNumber: "1234567899",
                age: 18
            },
            customerTogether :[
            ],
            checkinDate: new Date("10-23-2021"),
            checkoutDate: new Date("10-28-2021"),
            status: 1
        },
    ])
    
    for(let i = 0; i < bills.length; i++) {
        if (i < 5) {
            await Bills(db).findByIdAndUpdate(bills[i]._id,
                {$set: {homestay: homestays[0]._id}})
            // seed 5 bills cho homestays[0]
            await Homestays(db).findByIdAndUpdate(homestays[0]._id,
                {$push: {bills: bills[i]._id}})
        } else {
            await Bills(db).findByIdAndUpdate(bills[i]._id,
                {$set: {homestay: homestays[1]._id}})
            // seed 5 bills cho homestays[1]
            await Homestays(db).findByIdAndUpdate(homestays[1]._id,
                {$push: {bills: bills[i]._id}})
        }
    }


    /** danh sách services phải đúng thứ tự với danh sách homestays ở trên */
    let servicesName = [
        { // Làm 10 cái như này
            name: "Lẩu thái",
            pricePerUnit: 300000,
            personServe: 6
        },{ // Làm 10 cái như này
            name: "Buffet",
            pricePerUnit: 1000000,
            personServe: 5
        },{ // Làm 10 cái như này
            name: "Karaoke",
            pricePerUnit: 500000,
            personServe: 6
        },{ // Làm 10 cái như này
            name: "Tiệc mini",
            pricePerUnit: 500000,
            personServe: 4
        },{ // Làm 10 cái như này
            name: "Lẩu hải sản",
            pricePerUnit: 250000,
            personServe: 6
        },{ // Làm 10 cái như này
            name: "BBQ Kinh",
            pricePerUnit: 200000,
            personServe: 5
        },{ // Làm 10 cái như này
            name: "Nướng",
            pricePerUnit: 200000,
            personServe: 4
        },{ // Làm 10 cái như này
            name: "Cơm bình dân",
            pricePerUnit: 50000,
            personServe: 1
        },{ // Làm 10 cái như này
            name: "Gỏi",
            pricePerUnit: 500000,
            personServe: 6
        },{ // Làm 10 cái như này
            name: "Đặt vé máy bay",
            pricePerUnit: 1000000,
            personServe: 1
        }
    ]
    // Gán theo thứ tự các Services cho các homestay
    // Hiện tại đang seed dữ liệu kiểu 1 - 1 , sau sẽ chỉnh lại thành 1 - n sau
    for(let i = 0; i < servicesName.length; i++) {
        let servicesID = new Array();
        for (let j = 0; j < 25; j ++) {
            servicesID[j]= homestays[i+j*2]._id;
        }
        let services = await Services(db).create({
            name: servicesName[i].name,
            pricePerUnit: servicesName[i].pricePerUnit,
            personServe: servicesName[i].personServe,
            homestays: servicesID,
        })
        // cập nhật _id của generalService vào homestays
        for (let j = 0; j < 25; j ++) {
            await Homestays(db).findByIdAndUpdate(homestays[i+j*2]._id,
                {$push: {services: services._id}})
        }
        for (let j = 0; j < bills.length; j ++) {
            if ( (i+j) % 2) {
                await Bills(db).findByIdAndUpdate(bills[j]._id,
                    {$push: {servicesPerBill: {services: services._id, count: j%3+1 }}});
            }
        }
    }

    /** danh sách amenities phải đúng thứ tự với danh sách homestays ở trên */
        //Tạo dữ liệu các Amenities
    let amenitiesName = [
            { // Làm 10 cái như này
                name:"Wifi",
                type:"Tiện ích",
            },{ // Làm 10 cái như này
                name:"Tivi",
                type:"Tiện ích",
            },{ // Làm 10 cái như này
                name:"Dầu gội, dầu xả",
                type:"Tiện ích",
            },{ // Làm 10 cái như này
                name:"Khăn tắm",
                type:"Tiện ích",
            },{ // Làm 10 cái như này
                name:"Kem đánh răng",
                type:"Tiện ích",
            },{ // Làm 10 cái như này
                name:"Xà phòng tắm",
                type:"Tiện ích",
            },{ // Làm 10 cái như này
                name:"Máy sấy",
                type:"Tiện ích",
            },{ // Làm 10 cái như này
                name:"Bếp điện",
                type:"Tiện ích bếp",
            },{ // Làm 10 cái như này
                name:"Tủ lạnh",
                type:"Tiện ích bếp",
            },{ // Làm 10 cái như này
                name:"Ban công",
                type:"Tiện ích bếp",
            }
        ]
    // Gán theo thứ tự các Amenities cho các homestay
    // Hiện tại đang seed dữ liệu kiểu 1 - 1 , sau sẽ chỉnh lại thành 1 - n sau
    for(let i = 0; i < amenitiesName.length; i++) {
        let homestaysID = [];
        for (let j = 0; j < 25; j ++) {
            homestaysID[j]= homestays[i+j*2]._id;
        }
        let amenities = await Amenities(db).create({
            name: amenitiesName[i].name,
            type: amenitiesName[i].type,
            homestays: homestaysID
        })
        // cập nhật _id của generalService vào homestays
        for (let j = 0; j < 25; j ++) {
            await Homestays(db).findByIdAndUpdate(homestays[i+j*2]._id,
                {$push: {amenities: amenities._id}})
        }

    }

    let usersInfo = await Users(db).find();
    usersInfo = usersInfo.filter((a) => a.role === 'admin')
    // Hiện tại là gán 1 admin - 1 homestay
    for(let i = 0; i < usersInfo.length; i++) {
        let user = await Users(db).findByIdAndUpdate(
            usersInfo[i]._id,
            {$set: {homestays: [homestays[i]._id]}}
        )
        // cập nhật _id của user vào homestays
        await Homestays(db).findByIdAndUpdate(homestays[i]._id,
            {$push: {admin: user._id}})
    }

    await db.close();
}

HomestaysSeed()
.then(() => {
    console.log("Homestays seed ok!!")
}).catch(error => {
    console.log(error)
});
