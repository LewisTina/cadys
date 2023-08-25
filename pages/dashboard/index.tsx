import ConnectedUserLayout from "@/src/ConnectedUserLayout";
import SideBar from "@/src/components/backOffice/SideBar";

export default function Dashboard(props: any) {
    return (
        <ConnectedUserLayout title="dashboard">
            <main className="min-h-screen w-full relative">
                <SideBar/>
            </main>
        </ConnectedUserLayout>
    )
}