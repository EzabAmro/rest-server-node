const {v4: uuidv4} = require("uuid");
const path = require("path");


const loadFile = (files, validExtensions, folder = "") => {

    return new Promise((resolve, reject) => {

        const { file } = files;
        const cutName = file.name.split(".");
        const extensionName = cutName[cutName.length - 1];

        /* const validExtensions = [
            "png",
            "jpg",
            "jpeg",
            "gif"
        ]; */

        if (!validExtensions.includes(extensionName)) 
            return reject(`Invalid type of the extension ${extensionName}, valid extensions: ${validExtensions}`);

        const nameFile = uuidv4() + "." + extensionName;
        const uploadPath = path.join(__dirname, "../uploads/", folder, nameFile);

        file.mv(uploadPath, (error) => {
            if (error) return reject(error);
            resolve(nameFile);
        });
    });


}







module.exports = {
    loadFile
}