import Logo from "./Logo";

export default function Footer() {
    return (
        <footer className="flex flex-row justify-between items-center bg-white border border-kasa-gris-light px-10 py-2">
            <Logo variant="picto" /><span className="text-kasa-gris-dark text-[12px] font-medium">© 2020 Kasa. All rights reserved</span>
        </footer>
    )
}