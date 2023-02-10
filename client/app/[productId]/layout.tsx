
import "../../styles/globals.css"
import Footer from "../Footer";
import Header from "../Header";

export default function ProductLayout({ children }: {
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