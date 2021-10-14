

const isValidCollection = (collection = "", validCollections = []) => {
    if (!validCollections.includes(collection)) throw new Error(`${collection} is not a valid collection, collections ${validCollections}`);
    /* 
        all custom middlewares must be return true
    */
    return true;
}


module.exports = {
    isValidCollection
}