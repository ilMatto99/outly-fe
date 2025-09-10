import ActivitiesList from "@/components/ActivitiesList/ActivitiesList";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import SearchBar from "@/components/SearchBar/SeachBar";
import { useNavigate } from "react-router";

export const HomePage = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/search");
    };

    return (
        <div className="relative min-h-screen flex flex-col">
            <div className="fixed top-0 left-0 w-full z-50">
                <Navbar variant="primary" />
            </div>
            <div className="bg-white px-4 py-4  flex flex-col items-center justify-center searchbar" onClick={handleClick} style={{ marginTop: "100px" }}>
                <SearchBar />
            </div>
            <div style={{ marginBottom: "120px" }}>
                <ActivitiesList />
            </div>
            <Footer />
        </div>
    );
};
