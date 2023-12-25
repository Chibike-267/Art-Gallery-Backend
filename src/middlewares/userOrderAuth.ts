import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ArtistInstance } from "../model/artistModel";
import { UserInstance } from "../model/userModel";

const jwtsecret = process.env.JWT_SECRET as string;



// export async function userOrderAuth(req: Request | any, res: Response, next: NextFunction) {
// 	const token = req.params.token;
// 	console.log(req.params.token)
	
// 	if (!token) {
// 		return res.status(401).json({ error: "Kindly login or sign up" });
// 	}
	
// 	// const token = authorization.slice(7, authorization.length);
// 	// if (!token) {
// 	// 	return res.status(401).json({ error: "Kindly login or sign up" });
// 	// }

// 	let verified = jwt.verify(token, jwtsecret);

// 	if (!verified) {
// 		return res.status(401).json({ error: "Invalid token. You cannot access this route" });
// 	}
// 	console.log(verified);

// 	const { id } = verified as { [key: string]: string };

// 	//Check if the artist exist
// 	const user = await UserInstance.findOne({ where: { id: id } });

//     if (!user) {
// 		return res.status(401).json({ error: "Kindly sign-up as a user" });
// 	}

// 	req.user = verified;
// 	next();

// }




export async function userOrderAuth(req: Request | any, res: Response, next: NextFunction) {
	try {
	   const token = req.headers.authorization?.split('Bearer ')[1];
 
	   if (!token) {
		  return res.status(401).json({ error: "Kindly login or sign up" });
	   }
 
	   const verified = jwt.verify(token, jwtsecret) as { id: string };
 
	   // Handle token expiration explicitly
	   if (!verified) {
		  return res.status(401).json({ error: "Invalid token. You cannot access this route" });
	   }
 
	   const { id } = verified;
 
	   const user = await UserInstance.findOne({ where: { id } });
 
	   if (!user) {
		  return res.status(401).json({ error: "Kindly sign-up as a user" });
	   }
 
	   req.user = verified;
	   next();
	} catch (error) {
	   // Handle other errors (e.g., invalid signature, token format)
	   console.error(error);
	   return res.status(401).json({ error: "Invalid token. You cannot access this route" });
	}
 }
 