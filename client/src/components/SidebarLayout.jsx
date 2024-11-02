import React from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import { Outlet } from 'react-router-dom';

function SidebarLayout() {
    return (
        <div className="grid gap-4 p-4 grid-cols-[220px,_1fr]">
            <Sidebar/>
            <Outlet /> {/* Renders child routes like AddPropertyForm, Property, etc. */}
        </div>
    );
}

export default SidebarLayout;
