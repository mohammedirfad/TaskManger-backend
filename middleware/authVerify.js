import jwt from "jsonwebtoken";
import * as dotenv from 'dotenv';
dotenv.config();

export const generateToken = (userId) => {
 
  const token = jwt.sign({ id: userId}, process.env.JWT_SECRET_KEY, { expiresIn: "1hr" });
  return token;
};



export const checkAuth = async (req, res, next) => {
    try {
      let error={}
      let token = req.header("Authorization");

      if (!token) {
            error.message="Token Not Found"
            error.statusCode=400
           return next(error)
      }
  
      if (token.startsWith("Bearer")) {
        token = token.slice(7, token.length).trimLeft();

      } else {
           error.message="Invalid Token"
            error.statusCode=403
           return next(error)
      }
     
  
      const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
     
   
      req.user = verified;
      next();
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  