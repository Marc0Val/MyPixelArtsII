const mongoose = require("mongoose");
const Admin = require("../models/Admin");

async function createAdmin() {
    await mongoose.connect("your_mongoDB_connection_string");

    const exists = await Admin.findOne({ username: "admin" });
    if (exists) {
        console.log("El admin ya existe.");
        return process.exit();
    }


    const admin = new Admin({ username: "your_admin", password: "your_password" });
    await admin.save();


    console.log("Admin creado con éxito.");
    process.exit();
}

createAdmin();
