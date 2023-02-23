import "../../styles/globals.css";
import Footer from "../Footer";
import Header from "../Header";

export default function ProductListLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="bg-[#f8f8f8] w-full">
      <Header />
      <main>{children}</main>
      <Footer />
    </section>
  );
}
