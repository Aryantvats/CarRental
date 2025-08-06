import imagekit from "../configs/imagekit.js";
import Car from "../models/Car.js";
import User from "../models/User.js";
import fs from "fs";


//API to chane role of user
export const changeRoleToOwner = async (req, res) => {
    try {
        const { _id } = req.user;
        await User.findByIdAndUpdate(_id, { role: "owner" });
        res.json({success:true, message:"Now you can list cars"})
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

//API to list cars

export const addCar = async (req, res) => {
    try {
        const { _id } = req.user;
        let car = JSON.parse(req.body.carData);
        const imageFile = req.file;

        //upload image to imagekit
        const fileBuffer = fs.readFileSync(imageFile.path);
        const response=await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder:'/cars'
        })
        
        // optimized through imagekit url transformation
        var optimizedImageUrl = imagekit.url({
            path : response.filePath,
            transformation: [
                {"width" : "1280"},//width resize
                { "quality": "auto" },//auto compression
                {"format":"webp"}//convert to modern format
            ]
        });

        const image = optimizedImageUrl;
        await Car.create({ ...car, owner: _id, image });

        res.json({ success: true, message: "Car added" });

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}


//API to list owner cars

export const getOwnerCars = async (req, res) => {
    try {
        const { _id } = req.user;
        const cars = await Car.find({ owner: _id });
        res.json({ success: true, cars });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

//API to toggle car availability

export const toggleCarAvailability = async (req, res) => {
    try {
        const { _id } = req.user;
        const { carId } = req.body;
        const car = await Car.findById(carId);

        //checking if cars belong to owner
        if (car.owner.toString() !== _id.toString()) {
            return res.json({ success: false, message:"Unauthorized" });
        }

        car.isAvailable = !car.isAvailable;
        await Car.save();


        res.json({ success: true, message:"Availability toggled" });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

//API  to delete a car

export const deleteCar = async (req, res) => {
    try {
        const { _id } = req.user;
        const { carId } = req.body;
        const car = await Car.findById(carId);

        //checking if cars belong to owner
        if (car.owner.toString() !== _id.toString()) {
            return res.json({ success: false, message:"Unauthorized" });
        }

        car.owner = null;
        car.isAvailable = false;

        await Car.save();


        res.json({ success: true, message:"Car Removed" });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

//API to get dashboard data

export const getDashboardData = async (req, res) => {
    try {
        const { _id, rple } = req.user;
        if (role !== 'owner') {
            return res.json({ success: false, message:"Unauthorized" });
        }
        const cars = await Car.find({ owner: _id });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}
