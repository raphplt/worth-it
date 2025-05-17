import React from "react";
import NewProject from "./NewProject";
import { Settings } from "lucide-react";
import { useRefresh } from "@/context/RefreshContext";
import Link from "next/link";

const Header = () => {
	const { triggerRefresh } = useRefresh();

	const handleProjectCreated = () => {
		triggerRefresh();
	};

	return (
		<div className=" mb-8 fixed top-0 left-0 right-0 z-50 bg-white p-4">
			<div className="container mx-auto flex justify-between items-center">
				<Link href="/">
					<h1 className="text-3xl font-bold">Worth It</h1>
				</Link>
				<div className="flex items-center gap-4">
					<NewProject onProjectCreated={handleProjectCreated} />
					<Link href="/settings" className="text-gray-600 hover:text-gray-900">
						<Settings className="w-6 h-6" />
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Header;
