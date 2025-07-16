import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Auth/LoginPage";
import SignupPage from "./pages/Auth/SignupPage";
import ChatPage from "./components/Chat/ChatPage";
import DashboardLayout from "./pages/Dashboard/Dashboard";
import SearchPage from "./components/Chat/SearchPage";
import WelcomePage from "./pages/Dashboard/WelcomePage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<WelcomePage />} />
          <Route path=":chatId" element={<ChatPage />} />
          <Route path="search" element={<SearchPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
