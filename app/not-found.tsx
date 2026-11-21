import { Button, Link } from "@heroui/react";

export default function NotFound() {
    return (
        <div className="flex flex-col m-auto w-auto px-6 sm:w-85.75 gap-10">
            <div className="flex-col">
                <h1 className="text-[100px] font-black">404</h1>
                <div className="text-sm text-center text-black">Il semble que la page que vous cherchez ait pris des vacances… ou n’ait jamais existé.</div>
            </div>
            <div className="flex flex-col gap-3.5 items-center">
                <Link href="/" className="button button--primary w-50">Accueil</Link>
                <Link href="/logements" className="button button--primary w-50">Logements</Link>
            </div>
        </div>
    )
}