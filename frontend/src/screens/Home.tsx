import { useState } from "react";
import { Cards } from "../components/cards";
import { Switch } from "../components/switch";

export const Home = () => {
	const [isSwitch, setIsSwitch] = useState(false);
	return (
		<div>
			<div className="">
				<div className="">
					<h1 className="text-xl font-bold ">My NFTs</h1>
				</div>
				<div className="flex justify-between">
					<span className="">Current Block 1232342</span>
					<div className="">
						<Switch isSwitch={isSwitch} setIsSwitch={setIsSwitch} />
					</div>
				</div>
			</div>
			<Cards/>
		</div>
	);
};
