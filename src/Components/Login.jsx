  // src/Components/Login.jsx
  import React, { useState } from "react";
  import axios from "axios";
  import { ToastContainer, toast } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";
  import { useNavigate } from "react-router-dom";

  export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Vite env (must start with VITE_)
    const API_BASE = import.meta?.env?.VITE_BACKEND_URL || "";
    console.log("API_BASE from .env 👉", import.meta.env.VITE_BACKEND_URL);

    // async function submit(e) {
    //   e.preventDefault();
    //   if (!username.trim() || !password) {
    //     toast.error("Enter username and password", { position: "top-right" });
    //     return;
    //   }

    //   setLoading(true);
    //   try {
    //     // debug log
    //     console.log("Login -> calling API:", `${API_BASE}/api/admin/login`, { username });

    //     const res = await axios.post(
    //       `${API_BASE}/api/admin/login`,
    //       { username: username.trim(), password },
    //       { headers: { "Content-Type": "application/json" }, timeout: 10000 }
    //     );

    //     console.log("Login response:", res?.data);
    //     if (res.data?.success) {
    //       toast.success("Login successful 🎉", { position: "top-right" });

    //       // store user metadata only
    //       if (res.data.user) localStorage.setItem("user", JSON.stringify(res.data.user));

    //       const userObj = res.data.user || {};
    //       const uname = userObj.username || userObj.user || userObj.user_name || "doctor";
    //       const id = userObj._id || userObj.id;

    //       if (uname && id) {
    //         // /patients/admin/:username/:doctorId
    //         setTimeout(() => navigate(`/patients/admin/${encodeURIComponent(uname)}/${id}`), 400);
    //       } else {
    //         setTimeout(() => navigate("/admin/dashboard"), 400);
    //       }
    //     } else {
    //       toast.error(res.data?.message || "Login failed", { position: "top-right" });
    //     }
    //   } catch (err) {
    //     console.error("Login error:", err);
    //     const msg = err?.response?.data?.message || err?.message || "Server or network error";
    //     toast.error(msg, { position: "top-right" });
    //   } finally {
    //     setLoading(false);
    //   }
    // }


    async function submit(e) {
      e.preventDefault();
    
      if (!username.trim() || !password) {
        toast.error("Enter username and password", { position: "top-right" });
        return;
      }
    
      setLoading(true);
      try {
        console.log("Login -> calling API:", `${API_BASE}/api/admin/login`, { username });
    
        const res = await axios.post(
          `${API_BASE}/api/admin/login`,
          { username: username.trim(), password },
          {
            headers: { "Content-Type": "application/json" }
            // ✅ timeout REMOVED
          }
        );
    
        console.log("Login response:", res?.data);
    
        if (res.data?.success) {
          toast.success("Login successful 🎉", { position: "top-right" });
    
          if (res.data.user) {
            localStorage.setItem("user", JSON.stringify(res.data.user));
          }
    
          const userObj = res.data.user || {};
          const uname =
            userObj.username ||
            userObj.user ||
            userObj.user_name ||
            "doctor";
    
          const id = userObj._id || userObj.id;
    
          setTimeout(() => {
            if (uname && id) {
              navigate(`/patients/admin/${encodeURIComponent(uname)}/${id}`);
            } else {
              navigate("/admin/dashboard");
            }
          }, 400);
        } else {
          toast.error(res.data?.message || "Login failed", {
            position: "top-right",
          });
        }
      } catch (err) {
        console.error("Login error:", err);
        const msg =
          err?.response?.data?.message ||
          err?.message ||
          "Server or network error";
        toast.error(msg, { position: "top-right" });
      } finally {
        setLoading(false);
      }
    }

    
    
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-blue-50 p-6">
        <ToastContainer />
        <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Doctor / Admin Login</h2>
          <p className="text-sm text-gray-500 mb-6">Sign in to manage bookings, patients and consultations</p>

          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username or Mobile</label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="Enter your username"
                autoComplete="username"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="Enter your password"
                autoComplete="current-password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-2 rounded-xl bg-gradient-to-r from-[#1e8fd3] to-[#40d3b6] text-white font-semibold hover:opacity-95 transition"
            >
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>

          <div className="mt-4 text-center text-sm text-gray-500">
            Forgot password? Contact super admin.
          </div>
        </div>
      </div>
    );
  }
