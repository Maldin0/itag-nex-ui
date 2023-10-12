import profileStyle from "./profileStyle.module.css";
export default function MycharacterLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section className="">
			<div style={{backgroundColor:"#dbb794"}}>
				{children}
			</div>
		</section>
	);
}