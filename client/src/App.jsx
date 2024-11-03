import React from 'react';
import { Routes, Route } from 'react-router-dom';

import SidebarLayout from './components/SidebarLayout';
import Registor from './pages/registor';
import Login from './pages/login';
import Home from './pages/Home';
import Property from './pages/properts';
import AddPropertyForm from './components/property/AddPropertyForm';
import EditPropertyForm from './components/property/EditPropertyForm';

import { EditTenantForm } from './components/Tenants/EditPropertyForm';
import Tenant from './pages/Tenants';
import Contractor from './pages/Contractor';
import AddContractor from './components/contractor/AddContractor';
import EditContractorForm from './components/contractor/EditCotractorForm'; // Correct import
import Maintenance from './pages/maintenance';
import MaintenanceRequestForm from './components/Maintenance/Addmaintenance';
import EditMaintenanceRequestForm from './components/Maintenance/Editmaintenance';
import AssignContractorForm from './components/Maintenance/AssignContractorForm';
import AddTenant from './components/Tenants/AddTenantForm';
function App() {
  return (
    <Routes>
      {/* Public routes without sidebar */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Registor />} />

      {/* Routes with Sidebar */}
      <Route element={<SidebarLayout />}>
        <Route path="/Dashboard" element={<Home />} />
        <Route path="/property" element={<Property />} />
        <Route path="/AddPropertyForm" element={<AddPropertyForm />} />
        <Route path="/EditPropertyForm/:id" element={<EditPropertyForm />} />
        <Route path="/AddTenant" element={<AddTenant />} />
        <Route path="/EditTenantForm/:id" element={<EditTenantForm />} />
        <Route path="/tenants" element={<Tenant />} />
        <Route path='/Contractor' element={<Contractor/>} />
        <Route path='/AddContractor' element={<AddContractor/>} />
        <Route path='/EditContractor/:id' element={<EditContractorForm/>} /> 
        <Route path='/maintenace' element={<Maintenance/>}/>
        <Route path='/AddMaintenance' element={<MaintenanceRequestForm/>} />
        <Route path='/EditMaintenance' element={<EditMaintenanceRequestForm/>}/> 
        <Route path="/AssignContractor/:id" element={<AssignContractorForm />} />
      </Route>
    </Routes>
  );
}

export default App;
