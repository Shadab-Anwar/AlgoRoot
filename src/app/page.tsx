import Details from "./components/Details";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
export default function Home() {
  return (
    <div>
      <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
      <Navbar/>
      <Details/>
      <Footer/>
      </main>
      </div>
    </div>
  );
}



