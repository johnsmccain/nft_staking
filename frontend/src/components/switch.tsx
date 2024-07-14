export const Switch = ({ isSwitch, setIsSwitch }: any) => {
	return (
		<div
			onClick={() => setIsSwitch(!isSwitch)}
			className="bg-white w-11 rounded-2xl cursor-pointer">
			<div
				className={`w-6 h-6 rounded-full bg-green-500 ${
					isSwitch ? "translate-x-6" : "translate-x-0"
				}`}></div>
		</div>
	);
};
