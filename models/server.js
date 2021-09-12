const express = require("express");
const cors = require('cors');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersRoutesPath = "/api/users";
        
        // MIDDLEWARES
        this.middlewares();

        // ROUTES
        this.routes();
    }

    routes() {
        this.app.use(this.usersRoutesPath, require('../routes/users.routes'));
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

}




module.exports = Server;








