export default function CreatecharacterLayout({
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
