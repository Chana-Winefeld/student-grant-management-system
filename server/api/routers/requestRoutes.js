import express from 'express';
const router = express.Router();

import { createRequest } from '../controllers/request.js';
import { auth } from '../Middlewares/auth-middleware.js';
import { getMyRequest } from '../controllers/request.js';
import { getRequestByLoggedUser } from '../controllers/request.js';
import { uploadSingleFileMiddleware } from '../Middlewares/upload-middleware.js';
import { uploadSingleFile } from '../controllers/request.js';
import { getAllRequests } from '../controllers/request.js';
import { updateRequestStatus } from '../controllers/request.js';
import { isAdmin } from '../Middlewares/auth-middleware.js';    

router.post('/upload-single', auth, uploadSingleFileMiddleware, uploadSingleFile);
router.post('/', auth, createRequest);
router.get('/my-request', auth, getMyRequest);
router.get('/my-status', auth, getRequestByLoggedUser);
router.get('/all', auth, isAdmin, getAllRequests);
router.patch('/:requestId/status', auth, isAdmin, updateRequestStatus);

export default router;