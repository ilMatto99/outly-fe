import SearchBar from "@/components/SearchBar/SeachBar";
import { useNavigate } from "react-router";

export const HomePageProv = () => {
    const navigate = useNavigate();
    
    const handleClick = () => {
        navigate("/search");
    };

    return (
        <div className="relative min-h-screen flex flex-col">
            {/* Navbar + Hero */}
            <div className="fixed top-0 left-0 w-full z-50">
                <div className="h-[74px] bg-gray-200 flex items-center justify-center text-sm text-gray-600">
                    Navbar Placeholder
                </div>
                <div className="bg-white px-4 py-4 shadow-md flex items-center justify-center" onClick={handleClick}>
                    <SearchBar />
                </div>
            </div>

            {/* Contenuto scrollabile */}
            <div className="flex-1 overflow-y-auto pt-[74px] pb-[101px] mt-[100px]">
                <div className="p-4 space-y-4">
                    {Array.from({ length: 10 }).map((_, i) => (
                        <div
                            key={i}
                            className="w-full h-24 bg-gray-100 rounded shadow-sm flex items-center justify-center"
                        >
                            Contenuto {i + 1}
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer fisso */}
            <div className="w-full h-[101px] bg-gray-300 text-center fixed bottom-0 left-0 z-50 flex items-center justify-center text-sm text-gray-700">
                Footer Placeholder
            </div>
        </div>
    );
};
