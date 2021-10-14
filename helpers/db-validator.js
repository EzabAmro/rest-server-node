

const isValidCollection = (collection = "", validCollections = []) => {
    if (!validCollections.includes(collection)) throw new Error(`${collection} is not a valid collection, collections ${validCollections}`);
    /* 
        all custom middlewares must be return true
    */
    return true;
}

const isValidExtensionFile = (file) => {
    const cutFileName = file.name.split(".");
    const extensionFile = cutFileName[cutFileName.length - 1];
    if (!validExtensions.includes(extensionFile)) return res.status(400).json(
        {
            ok: false,
            msg: `Invalid type of the extension ${extensionFile}, valid extensions: ${validExtensions}`
        }
    );
}


module.exports = {
    isValidCollection,
    isValidExtensionFile
}