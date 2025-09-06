import { Link } from "react-router";
import Button from "../components/Button/button";
import Icon from "@/components/Icon/Icon";
import Footer from "@/components/Footer/Footer";
import CreateActivityForm from "@/components/CreateActivityForm/CreateActivityForm";

/**
 * Componente di pagina per l'onboarding degli utenti.
 * Introduce l'applicazione Outly, evidenziando i suoi vantaggi e
 * fornendo link per il login e la registrazione.
 */
export default function Onboarding() {

    const handleClick = () => {
        
    }

    return (
        <div className="flex flex-col w-full min-h-screen bg-white text-gray-800">
            {/* Navbar fissa placeholder */}
            <div className="w-full h-[74px] bg-gray-200 text-center flex items-center justify-center text-sm text-gray-600 fixed top-0 left-0 z-50">
                Navbar Placeholder
            </div>

            {/* Hero */}
            <section className="relative h-[60vh] w-full bg-cover bg-center" style={{ backgroundImage: "url('/images/hero-outly.jpg')" }}>
                <div className="absolute inset-0 bg-black opacity-30"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4 text-center">
                    <h1 className="text-4xl font-semibold leading-tight mb-6 ">Trova compagni per<br />la tua prossima avventura.</h1>
                    <div className="flex flex-col gap-4 w-full max-w-sm">
                        <Link to={"/login"}>
                            <Button label="Accedi" variant={"primary"} onClick={handleClick} className="w-80"/>
                        </Link>
                        <Link to={"/signup"}>
                            <Button label="Registrati" variant={"secondary"} onClick={handleClick} className="w-80"/>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Intro + Categorie */}
            <section className="px-4 py-6 bg-white text-center">
                <h2 className="text-lg font-bold mb-2">Non sei mai solo. Esplora, condividi, vivi!</h2>
                <p className="text-sm text-gray-600 mb-4">
                    L’avventura è più bella in due (o in dieci!). Con Outly bastano pochi tap per scoprire chi, vicino a te, è pronto a trasformare un’idea in un’esperienza indimenticabile.
                </p>

                <div className="grid grid-cols-2 gap-2">
                    {[
                        { title: "Trekking", img: "/images/trekking.jpg" },
                        { title: "Corsa", img: "/images/corsa.jpg" },
                        { title: "Arrampicata", img: "/images/arrampicata.jpg" },
                        { title: "Ciclismo", img: "/images/ciclismo.jpg" },
                    ].map((item) => (
                        <div key={item.title} className="relative rounded-md overflow-hidden">
                            <img src={item.img} alt={item.title} className="object-cover h-24 w-full" />
                            <div className="absolute inset-0  bg-opacity-30 flex items-center justify-center">
                                <span className="text-white font-semibold">{item.title}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Perché scegliere Outly */}
            <section className="relative w-full bg-cover bg-center text-white px-6 py-10" style={{ backgroundImage: "url('/images/background.jpg')" }}>
                <div className="absolute inset-0 bg-black opacity-60"></div>
                <div className="relative z-10 max-w-xl mx-auto text-center flex flex-col items-center">
                    <h2 className="text-2xl font-bold mb-6">Perché scegliere Outly</h2>
                    <ul className="text-base space-y-4">
                        <li className="flex items-start gap-3">
                            <Icon className="text-green-400 mt-1" name="compass" />
                            <span>Trova compagni per le tue avventure, ovunque tu sia</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <Icon className="text-yellow-300 mt-1" name="handshake" />
                            <span>Unisciti a chi ha già scelto di partecipare, vicino a te</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <Icon className="text-blue-400 mt-1" name="smartphone" />
                            <span>Organizza e condividi tutto in un'app semplice e veloce</span>
                        </li>
                    </ul>
                    <div className="mt-8 w-90">
                        <Link to={"/signup"}>
                            <Button label="Inizia ora ad esplorare" variant="secondary" onClick={handleClick} className="w-full" />
                        </Link>
                    </div>
                </div>
            </section>
           
        </div>
    )
}