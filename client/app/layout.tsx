import Footer from "./Footer";
import Header from "./Header";
import "../styles/globals.css"
import { Providers } from "./components/provider";
import "react-toastify/dist/ReactToastify.css";

export default function RootLayout({ children }: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Lucas Shop</title>
      </head>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}