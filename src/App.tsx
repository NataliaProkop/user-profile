import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./views/profile";
import Form from "./views/user-form";
import "./global.scss";
import { Layout } from "@components";
import { ROUTES } from "./routes";
import { ProfileProvider } from "./context/user-profile.context";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <ProfileProvider>
          <Routes>
            <Route path={ROUTES.home} index element={<Form />} />
            <Route path={ROUTES.profile} element={<Profile />} />
          </Routes>
        </ProfileProvider>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
