const express = require("express");
const cors = require('cors');

const {
    dbConnection
} = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        // Paths
        this.paths = {
            auth: "/api/auth",
            users: "/api/users",
            categories: "/api/categories",
            products: "/api/products",
            searchs: "/api/searchs"
        };/* 
        this.usersRoutesPath = "/api/users";
        this.categoriesRoutesPath = "/api/categories";
        this.authPath = '/api/auth'; */

        // Connecto to database
        this.connectDB();

        // MIDDLEWARES
        this.middlewares();

        // ROUTES
        this.routes();
    }

    routes() {
        this.app.use(this.paths.auth, require('../routes/auth.routes')); 
        this.app.use(this.paths.users, require('../routes/users.routes'));
        this.app.use(this.paths.categories, require("../routes/categories.routes"));
        this.app.use(this.paths.products, require("../routes/products.routes"));
        this.app.use(this.paths.searchs, require("../routes/searchs.routes"));
    }
    
    startListener() {
        this.app.listen(this.port, () => {
            console.log(`Server on port: ${this.port}`);
        });

    }

    middlewares() {
        // Format JSON the data that we get
        this.app.use(express.json());

        // CORS -> To validate the url that we use to do the http requests
        this.app.use(cors());

        // public directory use to load 404 not found page
        this.app.use(express.static('public'));
    }

    async connectDB() {
        await dbConnection();
    }

}




module.exports = Server;








