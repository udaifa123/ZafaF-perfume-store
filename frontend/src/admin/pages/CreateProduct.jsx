// import { useState } from "react";
// import API from "../../api/axios";

// export default function CreateProduct() {
//   const [form, setForm] = useState({});
//   const [image, setImage] = useState(null);

//   const submitHandler = async e => {
//     e.preventDefault();
//     const data = new FormData();
//     Object.keys(form).forEach(key => data.append(key, form[key]));
//     if (image) data.append("image", image);

//     await API.post("/admin/products", data);
//     alert("Product created");
//   };

//   return (
//     <form onSubmit={submitHandler} className="p-6 max-w-md">
//       <input placeholder="Name" onChange={e => setForm({...form, name:e.target.value})} />
//       <input placeholder="Price" onChange={e => setForm({...form, price:e.target.value})} />
//       <input placeholder="Category" onChange={e => setForm({...form, category:e.target.value})} />
//       <input placeholder="Stock" onChange={e => setForm({...form, stock:e.target.value})} />
//       <input placeholder="Description" onChange={e => setForm({...form, description:e.target.value})} />
//       <input type="file" onChange={e => setImage(e.target.files[0])} />
//       <button className="bg-black text-white px-4 py-2 mt-3">Create</button>
//     </form>
//   );
// }
