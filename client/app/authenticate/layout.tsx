import "../../styles/globals.css";
import BannerLogin from "./components/BannerLogin";
import { Suspense } from "react";
import Loading from "./loading";

export default function LoginLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex h-screen w-full">
      <Suspense fallback={<Loading />}>
        <div className="w-[50%] p-10">{children}</div>
      </Suspense>
      <BannerLogin />
    </section>
  );
}
