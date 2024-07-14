import { Navbar } from "./components/navbar";
import { Dashboard } from "./components/dashboard";
import { Route, Routes } from "react-router-dom";
import { Home } from "./screens/Home";
import { CreateNFT } from "./screens/CreateNFT";

function App() {
	return (
		<div className="bg-gradient-to-tr from-teal-950 ">
			<Navbar />
			<Dashboard />
			<main className=" container mx-auto text-white">
				<Routes>
					<Route path="*" element={<Home />} />
					<Route path="/create" element={<CreateNFT />} />
				</Routes>
			</main>
			<footer className="container mx-auto w-full bg-black h-20"></footer>
		</div>
	);
}

export default App;
