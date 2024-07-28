const DiscountService = require('./admin.discounts.service');

exports.CreateDiscount = async (req, res) => {
    try {
        const name = req.body.discountName;
        const value = req.body.discountValue;

        let discount = await DiscountService.CreateDiscount(name, value);

        return res.status(200).json({
            success: true,
            content: discount
        });

    }
    catch (error) {
        return res.status(400).json(
            {
                success: false,
                content: error
            }
        );
    }
}

exports.DeleteDiscount = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);
        
        const discount = await DiscountService.DeleteDiscount(id);

        return res.status(200).json({
            success: true,
            content: discount
        });
    }
    catch (error) {
        return res.status(400).json(
            {
                success: false,
                content: error
            }
        );
    }
}

exports.UpdateDiscount = async (req, res) => {
    try {

        const id = req.params.id;
        const newName = req.body.discountName;
        const newValue = req.body.discountValue;

        console.log(id, newName, newValue);
        const message = await DiscountService.UpdateDiscount(id, newName, newValue);
        return res.status(200).json({
            success: true, 
            content: {message: message},
        });
    }
    catch (error) {
        return res.status(400).json(
            {
                success: false,
                content: error
            }
        );
    }
}


exports.FindDiscountById = async(req, res) => {
    try 
    {
        const id = req.params.id;
        const discount = await DiscountService.FindDiscountById(id);

        return res.status(200).json(
            {
                success: true,
                content: discount
            }
        )
    }
    catch (error) {
        return res.status(400).json(
            {
                success: false,
                content: error
            }
        );
    }
}

exports.GetAllDiscounts = async(req, res) => {
    try 
    {
        const discounts = await DiscountService.GetAllDiscounts()
        return res.status(200).json(
            {
                success: true,
                content: discounts
            }
        )
    }
    catch (error) {
        console.log(error);
        return res.status(400).json(
            {
                success: false,
                content: error
            }
        );
    }
}