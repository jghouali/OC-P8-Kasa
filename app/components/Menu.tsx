"use client"

import Logo from "./Logo";
import Icon from "./Icon";
import { Button, Disclosure, DisclosureBody, DisclosureContent, DisclosureTrigger, Link, Separator } from "@heroui/react";
import { useState } from "react";


export default function Menu() {
    const [menuExpanded, setMenuExpanded] = useState(false)
    return (
        <header className="kasa-header">
            <nav >
                <Logo variant="picto" className="block md:hidden relative" />
                <div className="flex flex-row w-full justify-between items-center md:hidden">
                    <Disclosure isExpanded={menuExpanded} onExpandedChange={setMenuExpanded} className="w-full">
                        <DisclosureTrigger className="absolute right-2 -top-12 z-10" onClick={() => setMenuExpanded(!menuExpanded)}>
                            <Icon name="menu" className={`size-11.25 text-kasa-gris-dark ${menuExpanded && "hidden"}`} />
                            <Icon name="close" className={`size-11.25 text-kasa-gris-dark ${!menuExpanded && "hidden"}`} />
                        </DisclosureTrigger>
                        <DisclosureContent>
                            <DisclosureBody>
                                <nav className="flex flex-col gap-7 pt-7">
                                    <Link href="/" className="text-foreground">
                                        Accueil
                                    </Link>
                                    <Separator className="opacity-50" />
                                    <Link href="/a-propos" className="text-foreground">
                                        À propos
                                    </Link>
                                    <Separator className="opacity-50" />
                                    <Link href="/message" className="text-foreground">
                                        Messagerie
                                    </Link>
                                    <Separator className="opacity-50" />
                                    <Link href="/favoris" className="text-foreground">
                                        Favoris
                                    </Link>
                                    <Link href="/add" className="pt-3 text-accent">
                                        <Button>Ajouter un logement</Button>
                                    </Link>
                                </nav>
                            </DisclosureBody>
                        </DisclosureContent>
                    </Disclosure>
                </div>

                <div className="hidden md:flex lg:px-25 flex-row justify-between items-center">

                    {/* Menu de Gauche */}
                    <div className="flex gap-7">
                        <Link href="/" className="text-foreground">Accueil</Link>
                        <Link href="/a-propos" className="text-foreground">À propos</Link>
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
                                className="flex items-center gap-2 px-8 py-2 rounded-full bg-white shadow-md text-sm text-kasa-main-red whitespace-nowrap cursor-pointer hover:bg-kasa-gris-light"
                            >
                                <Icon name="search" className="size-8" />
                            </button>
                        </div>
                    </div>

                    <Link href="/add" className="text-kasa-main-red">+ Ajouter un logement</Link>
                    <div className="flex gap-2 items-center">
                        <Icon name="favoris" className="text-kasa-main-red" />
                        <Icon name="separator" className="text-kasa-main-red h-1.75 w-1" />
                        <Icon name="messages" className="text-kasa-main-red" />
                    </div>
                </div>
            </nav>
        </header>
    )
}