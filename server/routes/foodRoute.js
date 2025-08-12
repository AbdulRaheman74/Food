import express from 'express';
import { addFood, getAllFoods, removeFood } from '../controller/foodContoller.js';
import multer from 'multer';

const foodRouter=express.Router();

//image upload middleware can be added here if needed

const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
     return cb(null, `${Date.now()}-${file.originalname}`);
    }

})
const upload=multer({storage:storage});

foodRouter.post('/add',upload.single("image"),addFood);
foodRouter.get("/all", getAllFoods);
foodRouter.delete("/remove/:id", removeFood);

export default foodRouter;