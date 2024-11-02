import express from 'express';
import {
    createMaintenanceRequest,
    assignContractorToRequest,
    updateMaintenanceRequestStatus,
    getAllMaintenanceRequests
} from '../controller/maintainance.js';

const router = express.Router();


// Routes for maintenance requests
router.post('/maintenance', createMaintenanceRequest);              
router.put('/maintenance/:id/assign',  assignContractorToRequest); 
router.put('/maintenance/:id/status',  updateMaintenanceRequestStatus); 
router.get('/maintenance',  getAllMaintenanceRequests); 

export default router;
