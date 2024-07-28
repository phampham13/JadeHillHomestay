const { Discounts } = require("../../../models");
const { db } = require('../../../helpers/dbHelper');

exports.CreateDiscount = async (discountName, discountValue) => {
    const discount = await Discounts(db).create({ name: discountName, value: discountValue });
    console.log(discount);
    return discount;
}

exports.GetAllDiscounts = async () => {
    console.log('Get all discounts');
    const discounts = await Discounts(db).aggregate([{
        $project: {
            "name": 1, "value": 1
        }
    }])

    console.log(discounts)
    return discounts;
}

exports.FindDiscountById = async (discountId) => {
    console.log(discountId);
    const discount = await Discounts(db).findById(discountId);
    return discount;
}

exports.UpdateDiscount = async (discountId, discountName, discountValue) => {

    const discount = await this.FindDiscountById(discountId);
    if (discount) {
        await Discounts(db).updateOne(
            { _id: discountId },
            { $set: { name: discountName, value: discountValue } }
        );
        return "Discount updated";
    }

    return "Discount not found";
}

exports.DeleteDiscount = async (discountId) => {
    const discount = await Discounts(db).findById(discountId);

    if (discount) {
        await Discounts(db).deleteOne({ _id: discountId });
        return discount;
    }

    return null;
}