import {

  Request,

  Response,

  NextFunction

} from "express";

import jwt from "jsonwebtoken";




// CUSTOM REQUEST TYPE

interface AuthRequest
  extends Request {

  user?: any;

}




export const protect = (

  req: AuthRequest,

  res: Response,

  next: NextFunction

): void => {




  let token;




  if (

    req.headers.authorization &&

    req.headers.authorization.startsWith(

      "Bearer"

    )

  ) {

    token =

      req.headers.authorization.split(

        " "

      )[1];

  }




  if (!token) {

    res.status(401).json({

      message:
        "No token provided"

    });

    return;

  }




  try {

    const decoded =
      jwt.verify(

        token,

        process.env.JWT_SECRET as string

      );




    req.user = decoded;




    next();

  } catch (error) {

    res.status(401).json({

      message:
        "Invalid token"

    });

  }

};