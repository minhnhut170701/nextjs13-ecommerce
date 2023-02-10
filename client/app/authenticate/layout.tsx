
import "../../styles/globals.css"
import { Providers } from "../components/provider";
import BannerLogin from "./components/BannerLogin";


export default function LoginLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode,
}) {
  return (
    <section className="flex h-screen w-full">
      <div className="w-[50%] p-10">
        {children}  
      </div>
      <BannerLogin />
    </section>
  );
}