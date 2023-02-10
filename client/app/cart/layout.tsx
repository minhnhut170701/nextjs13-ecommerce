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
         <main>
            {children}
        </main>
       <Footer /> 
    </section>
  );
}