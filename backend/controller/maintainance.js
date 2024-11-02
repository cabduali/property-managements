import MaintenanceRequest from '../model/maintainance.js';

// Create a new maintenance request (for tenants to submit requests)
export const createMaintenanceRequest = async (req, res) => {
    try {
        const { tenantId, propertyId, description, priority } = req.body;

        const newRequest = new MaintenanceRequest({
            tenantId,
            propertyId,
            description,
            priority,
        });

        await newRequest.save();
        res.status(201).json({ message: 'Maintenance request created successfully', data: newRequest });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create maintenance request', error: error.message });
    }
};

// Assign a contractor to a maintenance request (Admin only)
export const assignContractorToRequest = async (req, res) => {
    try {
        const { id } = req.params; 
        const { contractorId, assignmentDate } = req.body;

        const maintenanceRequest = await MaintenanceRequest.findById(id);
        if (!maintenanceRequest) {
            return res.status(404).json({ message: 'Maintenance request not found' });
        }

        maintenanceRequest.contractorId = contractorId;
        maintenanceRequest.assignmentDate = assignmentDate || new Date();
        maintenanceRequest.status = 'In Progress';

        await maintenanceRequest.save();
        res.status(200).json({ message: 'Contractor assigned successfully', data: maintenanceRequest });
    } catch (error) {
        res.status(500).json({ message: 'Failed to assign contractor', error: error.message });
    }
};

// Update the status of a maintenance request (Admin only)
export const updateMaintenanceRequestStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const maintenanceRequest = await MaintenanceRequest.findById(id);
        if (!maintenanceRequest) {
            return res.status(404).json({ message: 'Maintenance request not found' });
        }

        maintenanceRequest.status = status;

        // If status is completed, record completion date
        if (status === 'Completed') {
            maintenanceRequest.completionDate = new Date();
        }

        await maintenanceRequest.save();
        res.status(200).json({ message: 'Maintenance request status updated successfully', data: maintenanceRequest });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update maintenance request status', error: error.message });
    }
};

// Get all maintenance requests (Admin only)
export const getAllMaintenanceRequests = async (req, res) => {
    try {
        const maintenanceRequests = await MaintenanceRequest.find()
            .populate('tenantId')
            .populate('propertyId')
            .populate('contractorId');

        res.status(200).json({ data: maintenanceRequests });
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve maintenance requests', error: error.message });
    }
};
