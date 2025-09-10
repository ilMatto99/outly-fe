import CreateActivityForm from "@/components/CreateActivityForm/CreateActivityForm"
import Footer from "@/components/Footer/Footer"
import Navbar from "@/components/Navbar/Navbar"

export const CreateActivity = () => {
    return (
        <div className="relative min-h-screen flex flex-col">
            <div className="fixed top-0 left-0 w-full z-50">
                <Navbar variant="primary"/>
            </div>
            <section style={{marginTop: "100px", marginBottom: "100px"}}>
                <CreateActivityForm />
            </section>
            <Footer/>
        </div>
    )
}