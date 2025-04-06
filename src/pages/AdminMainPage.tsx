// // src/pages/AdminMainPage.tsx
// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";  // For routing
// import useAdminSession from "../hooks/useAdminSession";  // Custom hook for admin song search logic
// import InputField from "../components/InputField";  // Reusable input component
// import Button from "../components/Button";  // Reusable button component
// import useSession from "../hooks/useSession";  // Import the new session hook
// import "../assets/styles/components/App.css";  // Importing the CSS for styling

// const AdminMainPage = () => {
//   const [query, setQuery] = useState("");
//   const [error, setError] = useState<string | null>(null);
//   const navigate = useNavigate();
//   const { error: searchError, sessionUrl, createSession, searchSong } = useAdminSession();
//   const { error: sessionError, logout } = useSession();  // Using logout from useSession

//   const sessionCreatedRef = useRef(false);

//   useEffect(() => {
//     if (!sessionCreatedRef.current) {
//       console.log("enter to  if not sessionCreatedRef");  // Log the session creation action
//       createSession();
//       sessionCreatedRef.current = true;
//     }
//   }, []);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!query.trim()) {
//       setError("Please enter a valid search query.");
//       return;
//     }

//     try {
//       await searchSong(query);
//       navigate("/admin/results");
//     } catch (err) {
//       setError("Error occurred while searching for the song. Please try again.");
//     }
//   };

//   const handleCopyClick = () => {
//     if (sessionUrl) {
//       const tempInput = document.createElement("input");
//       tempInput.value = sessionUrl;
//       document.body.appendChild(tempInput);
//       tempInput.select();
//       document.execCommand("copy");
//       document.body.removeChild(tempInput);
//       alert("Session URL copied to clipboard!");
//     }
//   };

//   const handleLogout = async () => {
//     console.log("enter handleLogout");  // Log the logout action
//     const success = await logout();  // Call the logout function from the hook

//     if (success) {
//       localStorage.clear();  
//       navigate("/login");  // Redirect to login page
//     } else {
//       alert("Logout failed. Please try again.");
//     }
//   };

//   return (
//     <div className="admin-main-page">
//       <h2>Search any song...</h2>
//       {error && <div className="error">{error}</div>}
//       {searchError && <div className="error">{searchError}</div>}
      
//       <form onSubmit={handleSubmit}>
//         <InputField
//           type="text"
//           label="Enter song name"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//         />
//         <Button type="submit" label="Search" />
//       </form>

//       {sessionUrl && (
//         <div>
//           <p>Session created successfully! Here is your session URL:</p>
//           <div className="session-url">
//             <span>{sessionUrl}</span>
//             <Button type="button" label="Copy URL" onClick={handleCopyClick} />
//           </div>
//         </div>
//       )}

//       <Button type="button" label="Logout" onClick={handleLogout} />  {/* Logout button */}
//     </div>
//   );
// };

// export default AdminMainPage;
// src/pages/AdminMainPage.tsx
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useAdminSession from "../hooks/useAdminSession";  // Custom hook for admin session logic
import InputField from "../components/InputField";  // Reusable input component
import Button from "../components/Button";  // Reusable button component
import useSession from "../hooks/useSession";  // Import the new session hook
import "../assets/styles/components/App.css";  // Importing the CSS for styling

const AdminMainPage = () => {
  const [query, setQuery] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { error: searchError, sessionUrl, createSession, searchSong } = useAdminSession();
  const { error: sessionError, logout } = useSession();  // Using logout from useSession

  const sessionCreatedRef = useRef(false);

  useEffect(() => {
    if (!sessionCreatedRef.current) {
      createSession();
      sessionCreatedRef.current = true;
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      setError("Please enter a valid search query.");
      return;
    }

    try {
      await searchSong(query);
      navigate("/admin/results");
    } catch (err) {
      setError("Error occurred while searching for the song. Please try again.");
    }
  };

  const handleCopyClick = () => {
    if (sessionUrl) {
      const tempInput = document.createElement("input");
      tempInput.value = sessionUrl;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand("copy");
      document.body.removeChild(tempInput);
      alert("Session URL copied to clipboard!");
    }
  };

  const handleLogout = async () => {
    const success = await logout();  // Call the logout function from the hook

    if (success) {
      localStorage.clear();  
      navigate("/login");  // Redirect to login page
    } else {
      alert("Logout failed. Please try again.");
    }
  };

  return (
    <div className="admin-main-page">
      <h2>Search any song...</h2>
      {error && <div className="error">{error}</div>}
      {searchError && <div className="error">{searchError}</div>}

      <form onSubmit={handleSubmit}>
        <InputField
          type="text"
          label="Enter song name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button type="submit" label="Search" />
      </form>

      {sessionUrl && (
        <div>
          <p>Session created successfully! Here is your session URL:</p>
          <div className="session-url">
            <span>{sessionUrl}</span>
            <Button type="button" label="Copy URL" onClick={handleCopyClick} />
          </div>
        </div>
      )}

      <Button type="button" label="Logout" onClick={handleLogout} />  {/* Logout button */}
    </div>
  );
};

export default AdminMainPage;
