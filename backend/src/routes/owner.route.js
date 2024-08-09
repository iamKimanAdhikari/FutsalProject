import { Router } from "express";

import { 
    registerOwner,
    loginOwner, 
    ownerLogout,
    refreshAccessToken,
    getCurrentOwner,
    registerTurf,
    editOwnerInfo
} from "../controllers/owner.controller.js";

import { ownerTokenVerification } from "../middlewares/ownerTokenVerification.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route('/register').post(registerOwner);
router.route('/login').post(loginOwner);
router.route('/logout').post(ownerTokenVerification, ownerLogout);
router.route('/refresh-token').post(refreshAccessToken);
router.route('/get-current-owner').get(ownerTokenVerification, getCurrentOwner);
router.route('/register-turf').post(ownerTokenVerification, upload.array('images', 3), registerTurf);
router.route('/edit').patch(ownerTokenVerification, editOwnerInfo);

export default router;
