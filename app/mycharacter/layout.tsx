import profileStyle from "./profileStyle.module.css";
export default function MycharacterLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section className="">
			<div className="">
				{children}
			</div>
		</section>
	);
}