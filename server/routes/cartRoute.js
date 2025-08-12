import express from 'express';
import { addToCart, getCart, removeFromCart } from '../controller/cartController.js';
import verifyToken from '../auth/verifyToken.js';

const cartRoute=express.Router();

cartRoute.post('/add',verifyToken,addToCart);
cartRoute.post("/remove",verifyToken,removeFromCart)
cartRoute.post("/get",verifyToken,getCart)


export default cartRoute;