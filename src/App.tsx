import { Routes, Route, Navigate } from "react-router-dom";
import UsersPage from "./pages/UsersPage";
import EditUserPage from "./pages/EditUserPage";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<UsersPage />} />
        <Route path="/users/:userId/edit" element={<EditUserPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
