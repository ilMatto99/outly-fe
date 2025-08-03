import ChatHeader from "@/components/Chat/ChatHeader/ChatHeader";
import { Link, useNavigate } from "react-router";

const ChatPage = () => {

    const navigate = useNavigate();

    const onBackClick = () => {
        navigate("/chat-list");
    }

    const onOptionsClick = () => {
        console.log("opzioni");
    }

    return(<>
        <ChatHeader onBackClick={onBackClick} onOptionsClick={onOptionsClick} type="individual"  />
    </>)
}

export default ChatPage;