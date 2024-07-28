const {Bills, Services, Homestays} = require('./../../../models/index');
const {db} = require("../../../helpers/dbHelper");
const {ObjectId} = require("mongodb");
const {sendEmailWhenCreateBill, sendEmail} = require("../../../helpers/emailHelper");
const {Users} = require("../../../models");


//Tạo bills với những thông tin nhận được
exports.createBill = async ( data ) => {

    // Lấy thông tin homestays bằng _id
    const homestay = await Homestays(db).findById({ _id:data._id })
    .then( homestay => {
        return homestay;
    })

    //Lấy giá của homestays/1 ngày mà bills tham chiếu tới
    const priceHomestayPerDay = homestay.price;
    let _idBill               = 0;
    let priceBill             = 0;

    //Tạo bill
    await Bills(db).create({
        homestay         : ObjectId( data._id ),
        checkinDate      : data.checkinDate ,
        checkoutDate     : data.checkoutDate ,
        status           : data.status,
        customer         : data.customer,
        customerTogether : data.customerTogether,
        servicesPerBill  : data.servicesPerBill,
        price            : 0
    })
    .then( bill => { 
        const numberOfDays = (bill.checkoutDate - bill.checkinDate) / ( 24 * 60 * 60 * 1000 );
              priceBill   += numberOfDays *  priceHomestayPerDay;
              _idBill      = bill._id;
    })

    //Lấy về danh sách thông tin services trong bill
    const services = await Bills(db).findById({ _id : _idBill })
    .populate({
        path : 'servicesPerBill',
        populate : { path : 'services' }
    })
    .then( bill => {
        return bill.servicesPerBill ;
    })

    // Cộng price service vào price đồng thời update idBill vào services tương ứng
    for( let i = 0; i < services.length; i++ )
    {
        priceBill += services[i].count * services[i].services.pricePerUnit;
        let _idService = services[i].services._id;
        await Services(db).findByIdAndUpdate({ _id : ObjectId( _idService ) }, { $push:{ bills : _idBill } })
    }

    //Update priceBill
    await Bills(db).findByIdAndUpdate(

        {
            _id : _idBill
        },

        {
            price : priceBill
        },
    )

    // đẩy bill vào homestays
    await Homestays(db).findByIdAndUpdate(data._id, { $push: {bills: _idBill}});

    // Gửi email sau khi tao bill xong
    let customer = data.customer;
    let bill = await Bills(db).findById(_idBill);
    sendEmailWhenCreateBill(customer.name, customer.identification, customer.email, customer.phoneNumber, bill.checkinDate, bill.checkoutDate, bill.price, bill.customerTogether.length +1, homestay.name, homestay.district, homestay.province);
}

