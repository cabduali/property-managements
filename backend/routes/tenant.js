import express from 'express';
import { 
  createTenant, 
  getAllTenants, 
  getTenantById, 
  updateTenant, 
  deleteTenant 
} from '../controller/Tenants.js';

const router = express.Router();

// Route to create a new tenant
router.post('/tenants', createTenant);

// Route to get all tenants
router.get('/tenants', getAllTenants);

// Route to get a tenant by ID
router.get('/tenants/:id', getTenantById);

// Route to update a tenant by ID
router.put('/tenants/:id', updateTenant);

// Route to delete a tenant by ID
router.delete('/tenants/:id', deleteTenant);

export default router;
