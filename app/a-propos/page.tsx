import Image from 'next/image'
import BannerTopImage from '../../public/images/banner-top-apropos.jpg'
import ImageApropos from '../../public/images/image-apropos.jpg'


export default function APropos() {
    return (
        <div className="flex flex-col m-auto">
            <div className="flex flex-col flex-1 items-center justify-center gap-10 py-10">
                <h1>À propos</h1>
                <p>Chez Kasa, nous croyons que chaque voyage mérite un lieu unique où se sentir bien.</p>
                <p>Depuis notre création, nous mettons en relation des voyageurs en quête d’authenticité avec des hôtes passionnés qui aiment partager leur région et leurs bonnes adresses.</p>
                <Image width={1115} height={572} src={BannerTopImage} alt="Maison en bois avec terrasse, au cœur d'un jardin arboré" className="rounded-xl" />
            </div>
            <div className='flex flex-row items-center justify-center gap-4'>
                <div className='flex flex-col gap-4'>
                    <h2 className="text-[18px] font-bold">Notre mission est simple :</h2>
                    <p className='text-[14px]'>
                        1. Offrir une plateforme fiable et simple d’utilisation
                    </p>
                    <p className='text-[14px]'>
                        2. Proposer des hébergements variés et de qualité
                    </p>
                    <p className='text-[14px]'>
                        3. Favoriser des échanges humains et chaleureux entre hôtes et voyageurs
                    </p>
                    <p className='w-100 text-[18px] text-kasa-main-red font-medium'>Que vous cherchiez un appartement cosy en centre-ville, une maison en bord de mer ou un chalet à la montagne, Kasa vous accompagne pour que chaque séjour devienne un souvenir inoubliable.</p>
                </div>
                <div className="w-123.5 h-114.5">
                    <Image src={ImageApropos} width={814} height={458} alt='Chalet en bois à grande façade vitrée, illuminé au crépuscule.' />
                </div>

            </div>
        </div>
    )
}