import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import SchoolPage from "./pages/SchoolPage";
import { getSchool } from "./data";
import { useHashRoute } from "./hooks/useHashRoute";

export default function App() {
  const route = useHashRoute();
  const school = getSchool(route);

  return (
    <div className="min-h-screen bg-paper text-ink antialiased selection:bg-ink selection:text-paper">
      <Header route={school ? school.id : "home"} />
      <main key={route}>{school ? <SchoolPage school={school} /> : <Home />}</main>
      <Footer />
    </div>
  );
}
