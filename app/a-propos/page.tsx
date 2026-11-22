import Image from 'next/image'
import BannerTopImage from '../../public/images/banner-top-apropos.jpg'
import ImageApropos from '../../public/images/image-apropos.jpg'
import { ViewTransition } from 'react'

export default function APropos() {
    return (
        <ViewTransition enter="page-enter" exit="page-exit" default="none">
            <div className="flex flex-col gap-10 w-full max-w-278.75 2xl:max-w-4/5 mx-auto px-6 py-10">

                <section className="flex flex-col items-center gap-6 text-center">
                    <h1 className="text-[32px] font-bold text-kasa-main-red">À propos</h1>
                    <p className="text-sm max-w-120">
                        Chez Kasa, nous croyons que chaque voyage mérite un lieu unique où se sentir bien.
                    </p>
                    <p className="text-sm max-w-120">
                        Depuis notre création, nous mettons en relation des voyageurs en quête d’authenticité avec des hôtes passionnés qui aiment partager leur région et leurs bonnes adresses.
                    </p>
                    <Image
                        src={BannerTopImage}
                        alt="Maison en bois avec terrasse, au cœur d'un jardin arboré"
                        loading="eager"
                        sizes="(min-width: 1115px) 1115px, 100vw"
                        className="w-full aspect-3/4 md:aspect-auto object-cover rounded-xl"
                    />
                </section>

                <section className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-x-10 md:items-center">
                    <div className="flex flex-col gap-4 md:self-end">
                        <h2 className="text-[18px] font-bold text-kasa-main-red">Notre mission est simple :</h2>
                        <ol className="flex flex-col gap-4 text-[14px] list-decimal list-inside">
                            <li>Offrir une plateforme fiable et simple d’utilisation</li>
                            <li>Proposer des hébergements variés et de qualité</li>
                            <li>Favoriser des échanges humains et chaleureux entre hôtes et voyageurs</li>
                        </ol>
                    </div>

                    <Image
                        src={ImageApropos}
                        alt="Chalet en bois à grande façade vitrée, illuminé au crépuscule."
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className="w-full aspect-4/5 md:aspect-auto object-cover rounded-xl md:col-start-2 md:row-start-1 md:row-span-2"
                    />

                    <p className="text-[18px] font-medium text-kasa-main-red md:self-start">
                        Que vous cherchiez un appartement cosy en centre-ville, une maison en bord de mer ou un chalet à la montagne, Kasa vous accompagne pour que chaque séjour devienne un souvenir inoubliable.
                    </p>
                </section>
            </div>
        </ViewTransition>
    )
}