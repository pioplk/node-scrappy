import {NextFunction} from "express";
import {USERS} from "./config";
import {HTTPError} from "onesignal-node";

const failAuth = (res: any, next: NextFunction) => {
    res.setHeader('WWW-Authenticate','Basic');
    next(new HTTPError(401, 'You are not authenticated'));
}

const checkCredentials = (authHeader: string): boolean =>{
    const auth = Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');

    return USERS.filter(user => user.username === auth[0] && user.password === auth[1]).length === 1;
}

const auth = (req: any, res: any, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !checkCredentials(authHeader)){
        failAuth(res, next);
    }else {
        next();
    }
}

export default auth;