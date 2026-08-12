// import React, { useEffect, useMemo, useState } from "react";
// import axios from "axios";
// import DataTable from "react-data-table-component";
// import { Eye } from "lucide-react";
// import {useNavigate  } from "react-router-dom";


// const OplivaAppointments = () => {
//     const navigate = useNavigate();

// const backendURL =
// import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

// const [leads,setLeads] = useState([]);
// const [filtered,setFiltered] = useState([]);
// const [loading,setLoading] = useState(true);

// const [search,setSearch] = useState("");

// const [selectedLead,setSelectedLead] = useState(null);
// const [showModal,setShowModal] = useState(false);

// const [showPlanModal,setShowPlanModal] = useState(false);
// const [planLead,setPlanLead] = useState(null);

// const [plans,setPlans] = useState([]);
// const [selectedPlanId,setSelectedPlanId] = useState("");
// const [notes,setNotes] = useState("");

// const [chosenCurrency,setChosenCurrency] = useState("INR");


// // ============================
// // LOAD LEADS
// // ============================

// useEffect(()=>{

// loadLeads();

// },[]);


// const loadLeads = async ()=>{

// try{

// const res = await axios.get(`${backendURL}/api/opliva/appointments`);

// const rows = res.data.data.map(l=>({

// id:l._id,
// name:l.name,
// email:l.email,
// phone:l.phone,
// age:l.age,
// message:l.message,
// status:l.status,
// createdAt:l.createdAt

// }));

// setLeads(rows);
// setFiltered(rows);

// }
// catch(err){

// console.error("Error loading leads",err);

// }
// finally{

// setLoading(false);

// }

// };


// // ============================
// // SEARCH FILTER
// // ============================

// useEffect(()=>{

// if(!search){

// setFiltered(leads);
// return;

// }

// const q = search.toLowerCase();

// const f = leads.filter(l=>

// l.name.toLowerCase().includes(q) ||
// l.phone.includes(q) ||
// l.email.toLowerCase().includes(q)

// );

// setFiltered(f);

// },[search,leads]);


// // ============================
// // FETCH PLANS
// // ============================

// const fetchPlans = async ()=>{

// try{

// const res = await axios.get(`${backendURL}/api/opliva/plans`);

// setPlans(res.data.plans || []);

// }
// catch(err){

// console.error("Plan fetch error",err);

// }

// };


// // ============================
// // VIEW LEAD
// // ============================

// const viewLead = (lead)=>{

// setSelectedLead(lead);
// setShowModal(true);

// };


// // ============================
// // OPEN PLAN MODAL
// // ============================

// const openPlanModal = async (lead)=>{

// setPlanLead(lead);
// setSelectedPlanId("");
// setNotes("");
// setChosenCurrency("INR");

// await fetchPlans();

// setShowPlanModal(true);

// };

// const closePlanModal = ()=>{

// setShowPlanModal(false);
// setPlanLead(null);

// };


// // ============================
// // BOOK PLAN
// // ============================

// const bookPlan = async ()=>{

// if(!selectedPlanId){

// alert("Please select a plan");
// return;

// }

// try{

// await axios.post(`${backendURL}/api/opliva/book-plan`,{

// leadId:planLead.id,
// planId:selectedPlanId,
// currency:chosenCurrency,
// notes

// });

// alert("Plan booked successfully");

// closePlanModal();

// }
// catch(err){

// console.error(err);
// alert("Plan booking failed");

// }

// };


// // ============================
// // TABLE COLUMNS
// // ============================

// const columns = useMemo(()=>[

// {
// name:"S.No",
// selector:(row,i)=>i+1,
// width:"80px",
// center:true
// },

// {
// name:"Actions",
// cell:(row)=>(

// <button
// onClick={()=>viewLead(row)}
// className="bg-[#1e8fd3] text-white p-2 rounded-full"
// >

// <Eye size={16}/>

// </button>

// )

// },

// {
// name:"Plan",
// cell:(row)=>(

// <button
// onClick={()=>openPlanModal(row)}
// className="px-3 py-1 rounded-md text-white"
// style={{
// background:"linear-gradient(90deg,#1e8fd3 0%,#40d3b6 100%)"
// }}
// >

// Book Plan

// </button>

// )

// },

// {
// name:"Name",
// selector:(row)=>row.name,
// sortable:true
// },

// {
// name:"Phone",
// selector:(row)=>row.phone,
// sortable:true
// },

// {
// name:"Age",
// selector:(row)=>row.age
// },

// {
// name:"Message",
// selector:(row)=>row.message,
// wrap:true
// },

// {
// name:"Status",
// cell:(row)=>(

// <span
// className={`px-3 py-1 rounded-full text-xs font-semibold
// ${row.status==="new"?"bg-yellow-100 text-yellow-700":
// row.status==="contacted"?"bg-blue-100 text-blue-700":
// "bg-green-100 text-green-700"}`}
// >

// {row.status}

// </span>

// )

// },

// {
// name:"Created",
// selector:(row)=>new Date(row.createdAt).toLocaleDateString()

// }

// ],[]);


// const customStyles = {

// headRow:{
// style:{
// backgroundColor:"#f7fafc"
// }
// }

// };


// // ============================
// // UI
// // ============================

// return(

// <div className="p-[90px] max-w-[1500px] mx-auto">

// <h2 className="text-[#1e8fd3] text-2xl font-semibold mb-8">

// Opliva Leads

// </h2>


// {/* SEARCH */}

// <div className="flex gap-3 mb-4">

// <input
// value={search}
// onChange={(e)=>setSearch(e.target.value)}
// placeholder="Search name, phone, email..."
// className="border rounded-md px-3 py-2 min-w-[220px]"
// />

// <button
// onClick={()=>navigate("/admin/opliva-payments")}
// className="px-4 py-2 rounded text-white"
// style={{
// background:"linear-gradient(90deg,#1e8fd3 0%,#40d3b6 100%)"
// }}
// >
// View Payments
// </button>

// </div>


// {/* TABLE */}

// <DataTable
// columns={columns}
// data={filtered}
// progressPending={loading}
// pagination
// highlightOnHover
// responsive
// customStyles={customStyles}
// />


// {/* VIEW LEAD MODAL */}

// {showModal && selectedLead &&(

// <div
// onClick={()=>setShowModal(false)}
// className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
// >

// <div
// onClick={(e)=>e.stopPropagation()}
// className="bg-white p-6 rounded-xl w-full max-w-lg shadow-xl"
// >

// <h3 className="text-xl font-semibold text-[#1e8fd3] mb-4">

// Lead Details

// </h3>

// <div className="space-y-2 text-sm">

// <p><b>Name:</b> {selectedLead.name}</p>
// <p><b>Email:</b> {selectedLead.email}</p>
// <p><b>Phone:</b> {selectedLead.phone}</p>
// <p><b>Age:</b> {selectedLead.age}</p>
// <p><b>Message:</b> {selectedLead.message}</p>

// </div>

// <div className="flex justify-end mt-6">

// <button
// onClick={()=>setShowModal(false)}
// className="px-4 py-2 text-white rounded"
// style={{
// background:"linear-gradient(90deg,#1e8fd3 0%,#40d3b6 100%)"
// }}
// >

// Close

// </button>

// </div>

// </div>

// </div>

// )}


// {/* PLAN MODAL */}

// {showPlanModal && planLead &&(

// <div
// onClick={closePlanModal}
// className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
// >

// <div
// onClick={(e)=>e.stopPropagation()}
// className="bg-white rounded-xl p-5 w-full max-w-md shadow-xl"
// >

// <h3 className="text-lg font-semibold text-[#1e8fd3] mb-4">

// Book Plan to: {planLead.name}

// </h3>


// <div className="space-y-4">


// <label className="font-semibold text-sm">

// Choose plan

// </label>


// <div className="flex gap-2">

// <select
// value={chosenCurrency}
// onChange={(e)=>setChosenCurrency(e.target.value)}
// className="border rounded-md px-3 py-2"
// >

// <option value="INR">INR (₹)</option>
// <option value="USD">USD ($)</option>

// </select>


// <select
// value={selectedPlanId}
// onChange={(e)=>setSelectedPlanId(e.target.value)}
// className="w-full border rounded-md px-3 py-2"
// >

// <option value="">

// Select plan

// </option>

// {plans.map(p=>(

// <option key={p._id} value={p._id}>

// {p.plan_name} — ₹{p.price_inr} / ${p.price_usd}

// </option>

// ))}

// </select>

// </div>


// {/* AMOUNT PREVIEW */}

// {selectedPlanId &&(()=>{

// const sel = plans.find(p=>String(p._id)===String(selectedPlanId));

// const amount =
// chosenCurrency==="USD"
// ? sel?.price_usd
// : sel?.price_inr;

// return(

// <div className="text-sm">

// <strong>Amount to be charged:</strong>{" "}
// {chosenCurrency==="USD"?`$${amount}`:`₹${amount}`}

// </div>

// );

// })()}


// <label className="font-semibold text-sm">

// Notes (optional)

// </label>


// <textarea
// value={notes}
// onChange={(e)=>setNotes(e.target.value)}
// rows={3}
// className="w-full border rounded-md p-2"
// placeholder="Any notes for this plan"
// />

// </div>


// <div className="flex justify-end gap-2 mt-5">

// <button
// onClick={closePlanModal}
// className="border px-4 py-2 rounded"
// >

// Cancel

// </button>


// <button
// onClick={bookPlan}
// className="px-4 py-2 text-white rounded"
// style={{
// background:"linear-gradient(90deg,#1e8fd3 0%,#40d3b6 100%)"
// }}
// >

// Book Plan

// </button>

// </div>

// </div>

// </div>

// )}

// </div>

// );

// };

// export default OplivaAppointments;


import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

const OplivaAppointments = () => {

const navigate = useNavigate();

const backendURL =
import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

const [leads,setLeads] = useState([]);
const [filtered,setFiltered] = useState([]);
const [loading,setLoading] = useState(true);

const [search,setSearch] = useState("");

const [selectedLead,setSelectedLead] = useState(null);
const [showModal,setShowModal] = useState(false);

const [showPlanModal,setShowPlanModal] = useState(false);
const [planLead,setPlanLead] = useState(null);

const [plans,setPlans] = useState([]);
const [selectedPlanId,setSelectedPlanId] = useState("");
const [notes,setNotes] = useState("");

const [chosenCurrency,setChosenCurrency] = useState("INR");

/* SESSION STATES */

const [showSessionModal,setShowSessionModal] = useState(false);
const [sessionLead,setSessionLead] = useState(null);

const [preferredDate,setPreferredDate] = useState("");
const [preferredTime,setPreferredTime] = useState("");

/* LOAD LEADS */

useEffect(()=>{

loadLeads();

},[]);

const loadLeads = async ()=>{

try{

const res = await axios.get(`${backendURL}/api/opliva/appointments`);

const rows = res.data.data.map(l=>({

id:l._id,
name:l.name,
email:l.email,
phone:l.phone,
age:l.age,
message:l.message,
status:l.status,
createdAt:l.createdAt

}));

setLeads(rows);
setFiltered(rows);

}
catch(err){

console.error("Error loading leads",err);

}
finally{

setLoading(false);

}

};

/* SEARCH FILTER */

useEffect(()=>{

if(!search){

setFiltered(leads);
return;

}

const q = search.toLowerCase();

const f = leads.filter(l=>

l.name.toLowerCase().includes(q) ||
l.phone.includes(q) ||
l.email.toLowerCase().includes(q)

);

setFiltered(f);

},[search,leads]);

/* FETCH PLANS */

const fetchPlans = async ()=>{

try{

const res = await axios.get(`${backendURL}/api/opliva/plans`);

setPlans(res.data.plans || []);

}
catch(err){

console.error("Plan fetch error",err);

}

};

/* VIEW LEAD */

const viewLead = (lead)=>{

setSelectedLead(lead);
setShowModal(true);

};

/* OPEN PLAN MODAL */

const openPlanModal = async (lead)=>{

setPlanLead(lead);
setSelectedPlanId("");
setNotes("");
setChosenCurrency("INR");

await fetchPlans();

setShowPlanModal(true);

};

const closePlanModal = ()=>{

setShowPlanModal(false);
setPlanLead(null);

};

/* BOOK PLAN */

const bookPlan = async ()=>{

if(!selectedPlanId){

alert("Please select a plan");
return;

}

try{

await axios.post(`${backendURL}/api/opliva/book-plan`,{

leadId:planLead.id,
planId:selectedPlanId,
currency:chosenCurrency,
notes

});

alert("Plan booked successfully");

closePlanModal();

}
catch(err){

console.error(err);
alert("Plan booking failed");

}

};

/* SESSION FUNCTIONS */

const openSessionModal = (lead)=>{

setSessionLead(lead);

setPreferredDate("");
setPreferredTime("");

setShowSessionModal(true);

};

const closeSessionModal = ()=>{

setShowSessionModal(false);
setSessionLead(null);

};

const bookSession = async ()=>{

if(!preferredDate || !preferredTime){

alert("Please select date and time");
return;

}

try{

await axios.post(`${backendURL}/api/opliva/book-session`,{

leadId:sessionLead.id,
preferredDate,
preferredTime

});

alert("Session created successfully");

closeSessionModal();

}
catch(err){

console.error(err);
alert("Session creation failed");

}

};


const sendConsent = async (lead) => {
    try {
        await axios.post(
            `${backendURL}/api/consent/send/opliva/${lead.id}`,
            {
              doctorName: "Dr. Zeromedixine"
            }
          );
  
      alert("✅ Consent link sent via WhatsApp");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to send consent link");
    }
  };


/* TABLE COLUMNS */

const columns = useMemo(()=>[

{
name:"S.No",
selector:(row,i)=>i+1,
width:"80px",
center:true
},

{
name:"Actions",
cell:(row)=>(

<button
onClick={()=>viewLead(row)}
className="bg-[#1e8fd3] text-white p-2 rounded-full"
>

<Eye size={16}/>

</button>

)

},


{
    name: "Consent",
    cell: (row) => (
      <button
        onClick={() => sendConsent(row)}
        className="px-3 py-1 rounded-md text-white text-xs"
        style={{
          background: "linear-gradient(90deg,#22c55e 0%,#16a34a 100%)"
        }}
      >
        Send Consent
      </button>
    )
  },
  
{
name:"Plan",
cell:(row)=>(

<button
onClick={()=>openPlanModal(row)}
className="px-3 py-1 rounded-md text-white"
style={{
background:"linear-gradient(90deg,#1e8fd3 0%,#40d3b6 100%)"
}}
>

Book Plan

</button>

)

},

{
name:"Session",
cell:(row)=>(

<button
onClick={()=>openSessionModal(row)}
className="px-3 py-1 rounded-md text-white"
style={{
background:"linear-gradient(90deg,#40d3b6 0%,#1e8fd3 100%)"
}}
>

Book Session

</button>

)

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
name:"Age",
selector:(row)=>row.age
},

{
name:"Message",
selector:(row)=>row.message,
wrap:true
},

{
name:"Status",
cell:(row)=>(

<span
className={`px-3 py-1 rounded-full text-xs font-semibold
${row.status==="new"?"bg-yellow-100 text-yellow-700":
row.status==="contacted"?"bg-blue-100 text-blue-700":
"bg-green-100 text-green-700"}`}
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

const customStyles = {

headRow:{
style:{
backgroundColor:"#f7fafc"
}
}

};

return(

<div className="p-[90px] max-w-[1500px] mx-auto">

<h2 className="text-[#1e8fd3] text-2xl font-semibold mb-8">

Opliva Leads

</h2>

<div className="flex gap-3 mb-4">

<input
value={search}
onChange={(e)=>setSearch(e.target.value)}
placeholder="Search name, phone, email..."
className="border rounded-md px-3 py-2 min-w-[220px]"
/>

<button
onClick={()=>navigate("/admin/opliva-payments")}
className="px-4 py-2 rounded text-white"
style={{
background:"linear-gradient(90deg,#1e8fd3 0%,#40d3b6 100%)"
}}
>
View Payments
</button>
<button
onClick={()=>navigate("/admin/opliva-sessions")}
className="px-4 py-2 rounded text-white"
style={{
background:"linear-gradient(90deg,#1e8fd3 0%,#40d3b6 100%)"
}}
>
View Sessions
</button>
</div>

<DataTable
columns={columns}
data={filtered}
progressPending={loading}
pagination
highlightOnHover
responsive
customStyles={customStyles}
/>

{/* VIEW LEAD MODAL */}

{showModal && selectedLead &&(

<div
onClick={()=>setShowModal(false)}
className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
>

<div
onClick={(e)=>e.stopPropagation()}
className="bg-white p-6 rounded-xl w-full max-w-lg shadow-xl"
>

<h3 className="text-xl font-semibold text-[#1e8fd3] mb-4">
Lead Details
</h3>

<div className="space-y-2 text-sm">
<p><b>Name:</b> {selectedLead.name}</p>
<p><b>Email:</b> {selectedLead.email}</p>
<p><b>Phone:</b> {selectedLead.phone}</p>
<p><b>Age:</b> {selectedLead.age}</p>
<p><b>Message:</b> {selectedLead.message}</p>
</div>

<button
onClick={()=>setShowModal(false)}
className="mt-6 px-4 py-2 text-white rounded"
style={{
background:"linear-gradient(90deg,#1e8fd3 0%,#40d3b6 100%)"
}}
>
Close
</button>

</div>

</div>

)}

{/* PLAN MODAL */}

{/* (Your existing Plan Modal remains exactly same here) */}


{showPlanModal && planLead &&(

<div
onClick={closePlanModal}
className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
>

<div
onClick={(e)=>e.stopPropagation()}
className="bg-white rounded-xl p-5 w-full max-w-md shadow-xl"
>

<h3 className="text-lg font-semibold text-[#1e8fd3] mb-4">

Book Plan to: {planLead.name}

</h3>


<div className="space-y-4">


<label className="font-semibold text-sm">

Choose plan

</label>


<div className="flex gap-2">

<select
value={chosenCurrency}
onChange={(e)=>setChosenCurrency(e.target.value)}
className="border rounded-md px-3 py-2"
>

<option value="INR">INR (₹)</option>
<option value="USD">USD ($)</option>

</select>


<select
value={selectedPlanId}
onChange={(e)=>setSelectedPlanId(e.target.value)}
className="w-full border rounded-md px-3 py-2"
>

<option value="">

Select plan

</option>

{plans.map(p=>(

<option key={p._id} value={p._id}>

{p.plan_name} — ₹{p.price_inr} / ${p.price_usd}

</option>

))}

</select>

</div>


{/* AMOUNT PREVIEW */}

{selectedPlanId &&(()=>{

const sel = plans.find(p=>String(p._id)===String(selectedPlanId));

const amount =
chosenCurrency==="USD"
? sel?.price_usd
: sel?.price_inr;

return(

<div className="text-sm">

<strong>Amount to be charged:</strong>{" "}
{chosenCurrency==="USD"?`$${amount}`:`₹${amount}`}

</div>

);

})()}


<label className="font-semibold text-sm">

Notes (optional)

</label>


<textarea
value={notes}
onChange={(e)=>setNotes(e.target.value)}
rows={3}
className="w-full border rounded-md p-2"
placeholder="Any notes for this plan"
/>

</div>


<div className="flex justify-end gap-2 mt-5">

<button
onClick={closePlanModal}
className="border px-4 py-2 rounded"
>

Cancel

</button>


<button
onClick={bookPlan}
className="px-4 py-2 text-white rounded"
style={{
background:"linear-gradient(90deg,#1e8fd3 0%,#40d3b6 100%)"
}}
>

Book Plan

</button>

</div>

</div>

</div>

)}

{/* SESSION MODAL */}

{showSessionModal && sessionLead &&(

<div
onClick={closeSessionModal}
className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
>

<div
onClick={(e)=>e.stopPropagation()}
className="bg-white rounded-xl p-5 w-full max-w-md shadow-xl"
>

<h3 className="text-lg font-semibold text-[#1e8fd3] mb-4">
Book Session to: {sessionLead.name}
</h3>

<input
type="date"
value={preferredDate}
onChange={(e)=>setPreferredDate(e.target.value)}
className="w-full border rounded-md px-3 py-2 mb-3"
/>

<input
type="time"
value={preferredTime}
onChange={(e)=>setPreferredTime(e.target.value)}
className="w-full border rounded-md px-3 py-2"
/>

<div className="flex justify-end gap-2 mt-5">

<button
onClick={closeSessionModal}
className="border px-4 py-2 rounded"
>
Cancel
</button>

<button
onClick={bookSession}
className="px-4 py-2 text-white rounded"
style={{
background:"linear-gradient(90deg,#1e8fd3 0%,#40d3b6 100%)"
}}
>
Create Session
</button>

</div>

</div>

</div>

)}

</div>

);

};

export default OplivaAppointments;