import TableWithActions from "../components/LeaseAgreement/TableWithAction";
import Sidebar from "../components/Sidebar/Sidebar";

export default function Tenant() {
    return (
      <main className="grid gap-4 p-4 grid-cols-[220px,_1fr]">
        <Sidebar />
        <TableWithActions/>
        
      </main>
    );
  }