import ChatPage from "../components/chat";
import Contacts from "../components/contacts";
import NavBar from "../components/NavBar";

export default function Main() {
    
    return (
        <div className="h-screen w-screen bg-gray-900 text-gray-100 flex flex-col md:flex-row">

            <div className="hidden md:flex w-16 min-w-[60px] bg-gray-800 border-r border-gray-700 flex-col">
                <NavBar />
            </div >

             <div className="flex md:hidden w-full bg-gray-800 p-4 border-b border-gray-700">
                <NavBar />
            </div >

            <div className="w-1/5 min-w-[250px] bg-gray-800 border-r border-gray-700 overflow-y-auto">
                <Contacts />
            </div>

            <div className="flex-1 bg-gray-900 flex flex-col">
                <ChatPage />
            </div>
        </div>
    )
}