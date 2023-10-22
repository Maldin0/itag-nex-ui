export default function SesLayout({
                                          children,
                                      }: {
    children: React.ReactNode;
}) {
    return (
        <section className="">
            <div className="text-center">
                {children}
            </div>
        </section>
    );
}