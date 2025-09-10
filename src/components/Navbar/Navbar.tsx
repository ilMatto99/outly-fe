import { Link, useNavigate } from "react-router";
import IconButton from "../IconButton/IconButton";
import './navbar.css'
import logo from '/images/logo-outly.png'

/**
 * Props per il componente Navbar.
 * @param variant - La variante della navbar: 'default' o 'secondary'.
 * @param onBack - Funzione da chiamare quando viene premuto il pulsante 'indietro'.
 * Solo per la variante 'settings'.
 */
interface NavbarProps {
    variant?: 'default' | 'primary' | 'secondary';
    onBack?: () => void;
}

/**
 * Componente Navbar riutilizzabile con diverse varianti.
 * Gestisce sia la navbar della pagina di ricerca (con logo e chat) che quella
 * delle impostazioni (con solo il pulsante 'indietro').
 */
function Navbar({ variant = 'default', onBack }: NavbarProps) {
    const navigate = useNavigate();
    const isDefaultVariant = variant === 'default';
    const isPrimaryVariant = variant === 'primary';

    const handleClick = () => {
        navigate("/chat-list")
    }

    return (
        <>
            {isDefaultVariant ? (
                <div className="navbar-container-default">
                    <div className="navbar-content">
                        <div className="navbar-logo">
                            <img src={logo} alt="Logo Outly" className="navbar-logo-img" />
                        </div>
                        <div className="navbar-actions">
                            <IconButton iconName="message" label="Chat" size={"medium"} />
                        </div>
                    </div>
                </div>
            ) : isPrimaryVariant ? (
                <div className="navbar-container">
                    <div className="navbar-content">
                        <Link to="/home">
                            <div className="navbar-logo">
                                <img src={logo} alt="Logo Outly" className="navbar-logo-img" />
                            </div>
                        </Link>
                        <div className="navbar-actions">
                            <IconButton iconName="message" label="Chat" size={"medium"} onClick={handleClick} />
                        </div>
                    </div>
                </div>
            ) : (
                <div className="navbar-container">
                    <div className="navbar-content">
                        <IconButton iconName="arrow-left" label="Torna indietro" size={"medium"} onClick={onBack} />
                    </div>
                </div>
            )}
        </>
    )

}

export default Navbar;