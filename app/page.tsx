import { Suspense, ViewTransition } from "react";
import { cachedGetProperties } from "./lib/properties";
import { Card, CardContent, CardHeader, Spinner } from "@heroui/react";
import Link from "next/link";
import Image from 'next/image'
import BannerTopImage from '../public/images/banner-top-home.jpg'
import FavoriteButton from "./components/FavoriteButton";

async function Properties() {
  const properties = await cachedGetProperties()

  if ("error" in properties) return <div>error : {properties.error}</div>;

  return (
    <ul aria-label="Liste des hébergements disponibles" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 w-full">
      {properties.map((property, i) => (
        <li key={property.id} className="flex flex-col w-full mx-auto max-w-88.75 h-138">
          <Card className="flex flex-col relative p-0 gap-0 rounded-[10px] overflow-hidden shadow-none">
            <div className="flex flex-col relative h-94">
              <Image
                src={property.cover}
                alt={`Photo de ${property.title}`}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                loading={i < 3 ? "eager" : "lazy"}
                className="object-cover"
              />
            </div>

            <CardHeader className="flex flex-col h-44 justify-between p-6 pt-4 ">
              <div className="flex flex-col gap-2">
                <h2 className="text-[18px] font-medium">
                  {/* after:absolute after:inset-0 : le lien couvre toute la carte */}
                  <Link href={`/property/${property.slug}`} className="no-underline text-kasa-noir after:absolute after:inset-0">
                    {property.title}
                  </Link>
                </h2>
                <p className="text-kasa-gris-dark">{property.location}</p>
              </div>
              <div className="flex flex-col">
                <span className="sr-only">{`${property.price_per_night} euros par nuit`} </span>
                <p aria-hidden className="text-kasa-gris-dark">
                  <strong className="font-medium text-kasa-noir">{property.price_per_night}€</strong> par nuit
                </p>
              </div>
            </CardHeader>

            <FavoriteButton id={property.id} title={property.title} />
          </Card>
        </li>
      ))
      }
    </ul >
  )
}

export default function Home() {
  return (
    <ViewTransition enter="page-enter" exit="page-exit" default="none">
      <div className="flex flex-col gap-10 w-full max-w-290.25 2xl:max-w-4/5 mx-auto px-4 lg:px-6 pt-15 pb-12.75 lg:py-10">

        {/* Intro */}
        <section className="flex flex-col items-center gap-10 text-center">
          <div className="flex flex-col gap-2 justify-center items-center">
            <h1 className="text-[32px] font-bold text-center text-kasa-main-red max-w-70 md:max-w-full">
              Chez vous, partout et ailleurs
            </h1>
            <p className="text-sm max-w-186.5">
              Avec Kasa, vivez des séjours uniques dans des hébergements chaleureux, sélectionnés avec soin par nos hôtes.
            </p>
          </div>
          <Image
            src={BannerTopImage}
            alt="Maison en bois sombre au milieu des herbes hautes"
            loading="eager"
            sizes="(min-width: 1115px) 1115px, 100vw"
            className="w-full aspect-3/4 md:aspect-auto object-cover rounded-xl"
          />
        </section>

        {/* Logements */}
        <Suspense fallback={<Spinner className="self-center" />}>
          <Properties />
        </Suspense>

        {/* Comment ça marche */}
        <section className="flex flex-col items-center bg-white rounded-md px-4 py-10 gap-10">
          <div className="flex flex-col gap-4 items-center text-center">
            <h2 className="text-[24px] font-semibold text-kasa-noir">Comment ça marche ?</h2>
            <p className="max-w-190 text-[14px] font-normal">
              Que vous partiez pour un week-end improvisé, des vacances en famille ou un voyage professionnel,
              Kasa vous aide à trouver un lieu qui vous ressemble.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-215">
            <Card className="min-h-49.75 bg-kasa-dark-orange rounded-md gap-4 px-5.5 py-11">
              <CardHeader className="text-white text-[18px] font-medium">Recherchez</CardHeader>
              <CardContent className="text-white text-[12px] font-normal">
                Entrez votre destination, vos dates et laissez Kasa faire le reste
              </CardContent>
            </Card>
            <Card className="min-h-49.75 bg-kasa-dark-orange rounded-md gap-4 px-5.5 py-11">
              <CardHeader className="text-white text-[18px] font-medium">Réservez</CardHeader>
              <CardContent className="text-white text-[12px] font-normal">
                Profitez d’une plateforme sécurisée et de profils d’hôtes vérifiés.
              </CardContent>
            </Card>
            <Card className="min-h-49.75 bg-kasa-dark-orange rounded-md gap-4 px-5.5 py-11">
              <CardHeader className="text-white text-[18px] font-medium">Vivez l’expérience</CardHeader>
              <CardContent className="text-white text-[12px] font-normal">
                Installez-vous, profitez de votre séjour, et sentez-vous chez vous, partout.
              </CardContent>
            </Card>
          </div>
        </section>

      </div>
    </ViewTransition>
  );
}