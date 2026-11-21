"use client"

import Link from "next/link"

export default function Error({ retry }: { error: unknown, retry: () => void }) {
    return (

        <div className="flex flex-col m-auto w-auto px-6 sm:w-95 gap-10">
            <div className="flex-col">
                <h1 className="text-[100px] font-black text-kasa-main-red">Oups ! </h1>
                <div className="text-sm text-center text-black">Une erreur est survenue. Veuillez réessayer dans quelques instants.
                </div>
            </div>
            <div className="flex flex-col gap-3.5 items-center">
                <button onClick={() => retry()} className="button button--primary w-50">Réessayer</button>
                <Link href="/" className="button button--primary w-50">Accueil</Link>
            </div>
        </div>
    )
}