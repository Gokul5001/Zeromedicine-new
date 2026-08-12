import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Video, Copy } from "lucide-react";

const OplivaSessions = () => {

const backendURL =
import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

const [sessions,setSessions] = useState([]);
const [filtered,setFiltered] = useState([]);
const [loading,setLoading] = useState(true);

const [search,setSearch] = useState("");

/* ============================
LOAD SESSIONS
============================ */

useEffect(()=>{

loadSessions();

},[]);

const loadSessions = async ()=>{

try{

const res = await axios.get(`${backendURL}/api/opliva/sessions`);

const rows = res.data.sessions.map(s=>({

id:s._id,
name:s.leadId?.name || "",
phone:s.leadId?.phone || "",
email:s.leadId?.email || "",

date:s.preferredDate,
time:s.preferredTime,

patientLink:s.patientLink,
doctorLink:s.doctorLink,

status:s.status,

createdAt:s.createdAt

}));

setSessions(rows);
setFiltered(rows);

}
catch(err){

console.error("Error loading sessions",err);

}
finally{

setLoading(false);

}

};

/* ============================
SEARCH
============================ */

useEffect(()=>{

if(!search){

setFiltered(sessions);
return;

}

const q = search.toLowerCase();

const f = sessions.filter(s=>

s.name.toLowerCase().includes(q) ||
s.phone.includes(q)

);

setFiltered(f);

},[search,sessions]);

/* ============================
COPY FUNCTION
============================ */

const copyLink = (link)=>{

navigator.clipboard.writeText(link);

alert("Link copied!");

};

/* ============================
TABLE COLUMNS
============================ */

const columns = useMemo(()=>[

{
name:"S.No",
selector:(row,i)=>i+1,
width:"80px",
center:true
},

{
name:"Name",
selector:(row)=>row.name,
sortable:true
},

{
name:"Phone",
selector:(row)=>row.phone,
sortable:true
},

{
name:"Date",
selector:(row)=>row.date
},

{
name:"Time",
selector:(row)=>row.time
},

{
name:"Patient Link",
cell:(row)=>(

<div className="flex items-center gap-2">

<a
href={row.patientLink}
target="_blank"
rel="noopener noreferrer"
className="text-[#1e8fd3] flex items-center gap-1"
>

<Video size={16}/>
Join

</a>

<button
onClick={()=>copyLink(row.patientLink)}
className="text-gray-500 hover:text-black"
title="Copy link"
>

<Copy size={16}/>

</button>

</div>

)

},

{
name:"Doctor Link",
cell:(row)=>(

<div className="flex items-center gap-2">

<a
href={row.doctorLink}
target="_blank"
rel="noopener noreferrer"
className="text-green-600 flex items-center gap-1"
>

<Video size={16}/>
Join

</a>

<button
onClick={()=>copyLink(row.doctorLink)}
className="text-gray-500 hover:text-black"
title="Copy link"
>

<Copy size={16}/>

</button>

</div>

)

},

{
name:"Status",
cell:(row)=>(

<span
className={`px-3 py-1 rounded-full text-xs font-semibold
${row.status==="scheduled"
? "bg-blue-100 text-blue-700"
: row.status==="completed"
? "bg-green-100 text-green-700"
: "bg-gray-100 text-gray-600"}`}
>

{row.status}

</span>

)

},

{
name:"Created",
selector:(row)=>new Date(row.createdAt).toLocaleDateString()

}

],[]);

/* ============================
TABLE STYLE
============================ */

const customStyles = {

headRow:{
style:{
backgroundColor:"#f7fafc"
}
}

};

/* ============================
UI
============================ */

return(

<div className="p-[90px] max-w-[1500px] mx-auto">

<h2 className="text-[#1e8fd3] text-2xl font-semibold mb-8">

Opliva Sessions

</h2>

{/* SEARCH */}

<div className="flex gap-3 mb-4">

<input
value={search}
onChange={(e)=>setSearch(e.target.value)}
placeholder="Search name or phone..."
className="border rounded-md px-3 py-2 min-w-[220px]"
/>

</div>

{/* TABLE */}

<DataTable
columns={columns}
data={filtered}
progressPending={loading}
pagination
highlightOnHover
responsive
customStyles={customStyles}
/>

</div>

);

};

export default OplivaSessions;