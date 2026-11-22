"use client"

import Image, { getImageProps } from "next/image"
import { ReactNode, useEffect, useState } from "react"
import Icon from "@/app/components/Icon"
import { withTransition } from "../lib/transition"

const ZOOM_SIZES = "(min-width: 1024px) 60vw, 90vw"

// on fait la même chose que <Image> de Next mais sans l'affiché pour précharger
function preloadZoomImage(src: string) {
    const { props } = getImageProps({ src, alt: "", width: 1600, height: 1200, sizes: ZOOM_SIZES })

    const img = new window.Image()
    img.fetchPriority = "low"
    img.sizes = props.sizes ?? ""
    img.srcset = props.srcSet ?? ""
    img.src = props.src
}

export default function Carroussel({ pictures }: { pictures: Array<string> }): ReactNode {
    const [position, setPosition] = useState(0)
    const [zoomed, setZoomed] = useState(false)
    const [direction, setDirection] = useState<"previous" | "next" | null>(null)

    const showPrevious = () => {
        setDirection("previous")
        setPosition((prev) => prev === 0 ? pictures.length - 1 : prev - 1)
    }
    const showNext = () => {
        setDirection("next")
        setPosition((prev) => prev === pictures.length - 1 ? 0 : prev + 1)
    }

    // Contrôle clavier
    useEffect(() => {
        if (!zoomed) return
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setZoomed(false)
            if (e.key === "ArrowLeft") showPrevious()
            if (e.key === "ArrowRight") showNext()
        }
        window.addEventListener("keydown", onKeyDown)
        return () => window.removeEventListener("keydown", onKeyDown)
    }, [zoomed, pictures.length])

    // Rotation automatique
    useEffect(() => {
        if (pictures.length <= 1 || zoomed) return
        const timer = setInterval(() => withTransition(showNext), 5000)
        return () => clearInterval(timer)
    }, [pictures.length, zoomed])

    // une fois la page affichée : précharge toutes les photos à la taille du zoom, sans gêner le reste
    useEffect(() => {
        pictures.forEach(preloadZoomImage)
    }, [pictures])

    const visible = [
        (pictures.length >= 1 ? (position + 0) % pictures.length : null),
        (pictures.length >= 2 ? (position + 1) % pictures.length : null),
        (pictures.length >= 3 ? (position + 2) % pictures.length : null),
        (pictures.length >= 4 ? (position + 3) % pictures.length : null),
        (pictures.length >= 5 ? (position + 4) % pictures.length : null),
    ]

    return (
        <>
            <div className="grid grid-cols-4 gap-2.5 lg:col-span-2 lg:grid-rows-2 lg:h-89.5">
                {visible.map((pictureIndex, i) => {
                    if (pictureIndex === null) return null

                    const image = (
                        <Image
                            src={pictures[pictureIndex]}
                            alt={`Photo ${pictureIndex + 1} du logement`}
                            width={800}
                            height={600}
                            sizes={i === 0
                                ? "(min-width: 1024px) 33vw, 100vw"
                                : "(min-width: 1024px) 17vw, 25vw"}
                            loading={i === 0 ? "eager" : "lazy"}
                            fetchPriority={i === 0 ? "high" : "auto"}
                            className="size-full object-cover"
                        />
                    )

                    // On passe { viewTransitionName: "photo-1(...2,3,4,5)" , viewTransitionClass: "carousel-photo" }
                    // <ViewTransition> s'occupe des transitions 
                    return (
                        <div
                            key={pictureIndex}
                            style={{ viewTransitionName: `photo-${pictureIndex}`, viewTransitionClass: "carousel-photo" }}
                            className={
                                "overflow-hidden rounded-md lg:min-h-0 lg:aspect-auto " +
                                (i === 0
                                    ? "col-span-4 aspect-6/7 lg:col-span-2 lg:row-span-2"
                                    : "aspect-4/5")
                            }
                        >
                            {i === 0 ? (
                                <button
                                    type="button"
                                    onClick={() => { setDirection(null); setZoomed(true) }}
                                    aria-label="Agrandir la photo"
                                    className="size-full cursor-zoom-in"
                                >
                                    {image}
                                </button>
                            ) : image}
                        </div>
                    )
                })}
            </div>

            {/* Photo agrandie */}
            {zoomed && (
                <div
                    // ferme seulement si on clique sur le fond, pas sur la photo ou les boutons
                    onClick={(e) => { if (e.target === e.currentTarget) setZoomed(false) }}
                    className="fixed inset-0 z-50 flex justify-center items-center bg-black/60 cursor-zoom-out transition-opacity duration-500 starting:opacity-0"
                >
                    {/* Tailwind s'occupe des transitions gauche, droite, on lui passe juste la bonne classe correspondant à la direction */}
                    <Image
                        key={position}
                        src={pictures[position]}
                        alt={`Photo ${position + 1} du logement, agrandie`}
                        width={1600}
                        height={1200}
                        sizes={ZOOM_SIZES}
                        className={
                            "w-auto h-auto max-w-[90vw] lg:max-w-[60vw] max-h-[85vh] rounded-lg shadow-2xl cursor-default " +
                            (direction === "next" ? "animate-page-next" : direction === "previous" ? "animate-page-previous" : "")
                        }
                    />

                    {pictures.length > 1 && (
                        <>
                            <button
                                type="button"
                                onClick={showPrevious}
                                aria-label="Photo précédente"
                                className="flex justify-center items-center absolute left-1/4 top-1/2 -translate-y-1/2 size-12 rounded-full bg-kasa-main-red/30 hover:bg-kasa-main-red/80 transition duration-300 shadow cursor-pointer text-white"
                            >
                                <Icon name="back" className="size-10" />
                            </button>
                            <button
                                type="button"
                                onClick={showNext}
                                aria-label="Photo suivante"
                                className="flex justify-center items-center absolute right-1/4 top-1/2 -translate-y-1/2 size-12 rounded-full bg-kasa-main-red/30 hover:bg-kasa-main-red/80 transition duration-300 shadow cursor-pointer text-white"
                            >
                                <Icon name="back" className="rotate-180 size-10" />
                            </button>
                            <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm">
                                {position + 1} / {pictures.length}
                            </p>
                        </>
                    )}

                    <button
                        type="button"
                        onClick={() => setZoomed(false)}
                        aria-label="Fermer"
                        className="flex justify-center items-center absolute top-4 right-4 size-10 rounded-full bg-kasa-main-red/30 hover:bg-kasa-main-red/80 transition duration-300 shadow cursor-pointer text-white"
                    >
                        <Icon name="close" className="size-5" />
                    </button>
                </div>
            )}
        </>
    )
}