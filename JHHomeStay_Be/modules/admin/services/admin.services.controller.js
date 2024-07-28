const  ServicesService  = require("./admin.services.service");

exports.getAllServices = async (req, res) => {
    try {
        const services = await ServicesService.getAllServices();

        return res.status(200).json({
            success: true,
            content: services
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: Array.isArray(error) ? error : "Can't get all services",
            content: error
        })
    }
}

exports.createService = async (req, res) => {
    try {
        const {name, pricePerUnit, personServe} = req.body;

        const service = await ServicesService.createService(name, pricePerUnit, personServe);

        return res.status(200).json({
            success: true,
            message: "Create service successfully",
            content: service
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: Array.isArray(error) ? error : "Can create service",
            content: error
        })
    }
}