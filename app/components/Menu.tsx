"use client"

import Logo from "./Logo";
import Icon from "./Icon";
import { Button, Disclosure, DisclosureBody, DisclosureContent, DisclosureTrigger, Link, Separator } from "@heroui/react";
import { useState } from "react";


export default function Menu() {
    const [menuExpanded, setMenuExpanded] = useState(false)
    return (
        <header className="w-full lg:max-w-195.5 bg-white lg:mx-auto p-4 lg:rounded-normal shadow-[0px_4px_4px_0px_rgba(182,182,182,0.05)]">
            <Logo variant="picto" className="block lg:hidden relative" />
            <div className="flex flex-row w-full justify-between items-center lg:hidden">
                <Disclosure isExpanded={menuExpanded} onExpandedChange={setMenuExpanded} className="w-full">
                    <DisclosureTrigger aria-label={menuExpanded ? "Fermer le menu" : "Ouvrir le menu"} className="absolute right-0 -top-12 z-10">
                        <Icon name="menu" className={`size-11.25 text-kasa-gris-dark ${menuExpanded ? "hidden" : ""}`} />
                        <Icon name="close" className={`size-11.25 text-kasa-gris-dark ${!menuExpanded ? "hidden" : ""}`} />
                    </DisclosureTrigger>
                    <DisclosureContent>
                        <DisclosureBody>
                            <nav aria-label="Menu principal" className="flex flex-col gap-7 pt-10">
                                <Link href="/" className="text-2xl font-normal text-foreground">
                                    Accueil
                                </Link>
                                <Separator />
                                <Link href="/a-propos" className="text-2xl font-normal text-foreground">
                                    À propos
                                </Link>
                                <Separator />
                                <Link href="/message" className="text-2xl font-normal text-foreground">
                                    Messagerie
                                </Link>
                                <Separator />
                                <Link href="/favoris" className="text-2xl font-normal text-foreground">
                                    Favoris
                                </Link>
                                <Link href="/add" className="button button--primary text-white h-9 w-50 mt-3 ">
                                    Ajouter un logement
                                </Link>
                            </nav>
                        </DisclosureBody>
                    </DisclosureContent>
                </Disclosure>
            </div>

            <nav aria-label="Menu principal" className="hidden lg:flex lg:px-25 flex-row justify-between items-center">

                {/* Menu de Gauche */}
                <div className="flex gap-7">
                    <Link href="/" className="text-sm font-normal text-foreground">Accueil</Link>
                    <Link href="/a-propos" className="text-sm font-normal text-foreground">À propos</Link>
                </div>

                {/* Bouton Logo */}
                <div className="relative group h-10">
                    <Link href="/" aria-label="Kasa, accueil">
                        <Logo />
                    </Link>

                    <div className="absolute top-15 left-1/2 -translate-x-1/2 pt-2
                    invisible opacity-0 -translate-y-8
                    group-hover:visible group-hover:opacity-100 group-hover:translate-y-0
                    group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-0
                    transition-all duration-300 ease-out motion-reduce:transition-none">
                        <button
                            type="button"
                            aria-label="Rechercher un logement"
                            className="flex items-center gap-2 px-8 py-2 rounded-full bg-white shadow-md text-sm text-kasa-main-red whitespace-nowrap cursor-pointer hover:bg-kasa-gris-light"
                        >
                            <Icon name="search" className="size-8" />
                        </button>
                    </div>
                </div>

                <Link href="/add" className="text-sm font-normal text-kasa-main-red">+ Ajouter un logement</Link>
                <div className="flex gap-2 items-center">
                    <Link href="/favoris" aria-label="Favoris">
                        <Icon name="favoris" className="text-kasa-main-red" />
                    </Link>
                    <span aria-hidden="true">
                        <Icon name="separator" className="text-kasa-main-red h-1.75 w-1" />
                    </span>
                    <Link href="/message" aria-label="Messagerie">
                        <Icon name="messages" className="text-kasa-main-red" />
                    </Link>
                </div>
            </nav>
        </header>
    )
}