const {request, response} = require('express');


const isAdminRole = (req = request, res = response, next) => {

    if (!req.userAuth) return res.status(500).json(
        {
            ok: false,
            msg: "The token isn't yet validated"
        }
    );

    const {role, name} = req.userAuth;

    if (role !== 'ADMIN_ROLE') return res.status(401).json(
        {
            ok: false,
            msg: `${name} doesn't have an administrator role`
        }
    );

    next();
 
}

const haveRole = (...roles) => (req = request, res = response, next) => {

    if (!req.userAuth) return res.status(500).json(
        {
            ok: false,
            msg: "The token isn't yet validated"
        }
    );

    if (!roles.includes(req.userAuth.role)) return res.status(401).json(
        {
            ok: false,
            msg: `User ${req.userAuth.name} doesn't have an authorized role`
        }
    );


    next();
}





module.exports = {
    isAdminRole,
    haveRole
}












