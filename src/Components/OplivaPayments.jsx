import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";

const OplivaPayments = () => {

const backendURL =
import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

const [payments,setPayments] = useState([]);
const [filtered,setFiltered] = useState([]);
const [loading,setLoading] = useState(true);

const [search,setSearch] = useState("");

useEffect(()=>{

loadPayments();

},[]);

const loadPayments = async ()=>{

try{

const res = await axios.get(`${backendURL}/api/opliva/payments`);

const rows = res.data.payments.map(p=>({

id:p.id,
name:p.name,
phone:p.phone,
email:p.email,
planName:p.planName,
amount:p.amount,
currency:p.currency,
paymentStatus:p.paymentStatus,
paymentLink:p.paymentLink,
createdAt:p.createdAt

}));

setPayments(rows);
setFiltered(rows);

}
catch(err){

console.error("Payment fetch error",err);

}
finally{

setLoading(false);

}

};

useEffect(()=>{

if(!search){

setFiltered(payments);
return;

}

const q = search.toLowerCase();

const f = payments.filter(p=>

p.name.toLowerCase().includes(q) ||
p.phone.includes(q) ||
p.email.toLowerCase().includes(q)

);

setFiltered(f);

},[search,payments]);

const columns = useMemo(()=>[

{
name:"S.No",
selector:(row,i)=>i+1,
width:"80px"
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
name:"Email",
selector:(row)=>row.email,
wrap:true,
width: "220px"

},

{
name:"Plan",
selector:(row)=>row.planName,
sortable:true,
width: "230px"

},

{
name:"Amount",
cell:(row)=>(

<span>

{row.currency==="USD" ? `$${row.amount}` : `₹${row.amount}`}

</span>

)

},

{
    name: "Payment Link",
    selector: (row) => row.paymentLink,
    sortable: true,
    width: "200px"
  },

{
name:"Payment Status",
cell:(row)=>(

<span
className={`px-3 py-1 rounded-full text-xs font-semibold
${row.paymentStatus==="pending"
? "bg-yellow-100 text-yellow-700"
: row.paymentStatus==="paid"
? "bg-green-100 text-green-700"
: "bg-red-100 text-red-700"
}`}

>

{row.paymentStatus}

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

Opliva Payments

</h2>

<div className="flex gap-3 mb-4">

<input
value={search}
onChange={(e)=>setSearch(e.target.value)}
placeholder="Search name, phone, email..."
className="border rounded-md px-3 py-2 min-w-[220px]"
/>

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

</div>

);

};

export default OplivaPayments;