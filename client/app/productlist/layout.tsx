import "../../styles/globals.css"
import ToolBar from "../components/ToolBar";
import Footer from "../Footer";
import Header from "../Header";

export default function ProductListLayout({ children }: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Header />
        <main className="flex justify-between w-[90%] mx-auto pt-12">
          <section className="w-[20%]">
              <ToolBar />
          </section>
          <section className="w-[65%]">
              {children}
          </section>
        </main>
       <Footer /> 
    </section>
  );
}