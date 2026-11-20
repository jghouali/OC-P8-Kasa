import Logo from "./Logo";

export default function Footer() {
    return (
        <footer className="flex flex-row justify-between items-center px-10 py-2 text-[12px]">
            <Logo variant="picto" />© 2020 Kasa. All rights reserved
        </footer>
    )
}