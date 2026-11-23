import { Suspense, ViewTransition } from "react";
import { cachedGetProperties } from "./lib/properties";
import { Card, CardContent, CardHeader, Link, Spinner } from "@heroui/react";
import Image from 'next/image'
import BannerTopImage from '../public/images/banner-top-home.jpg'
import Icon from "./components/Icon";

async function Properties() {
  const properties = await cachedGetProperties()

  if ("error" in properties) return <div>error : {properties.error}</div>;

  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5 w-full">
      {properties.map((property, i) => (
        <li key={property.id}>
          <Card className="relative h-full p-0 gap-0 rounded-md overflow-hidden">
            <div className="relative aspect-4/3">
              <Image
                src={property.cover}
                alt=""
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                loading={i < 3 ? "eager" : "lazy"}
                className="object-cover"
              />
            </div>

            <CardHeader className="p-4 pb-0 gap-1">
              <h3 className="text-sm text-black">
                {/* after:absolute after:inset-0 : le lien couvre toute la carte */}
                <Link href={`/property/${property.slug}`} className="text-black no-underline after:absolute after:inset-0">
                  {property.title}
                </Link>
              </h3>
              <p className="text-xs text-kasa-gris-dark">{property.location}</p>
            </CardHeader>

            <CardContent className="mt-auto p-4 pt-6">
              <p className="text-xs text-kasa-gris-dark">
                <strong className="font-medium text-black">{property.price_per_night}€</strong> par nuit
              </p>
            </CardContent>

            {/* z-10 : au-dessus du lien étiré, pour rester cliquable séparément */}
            <button
              type="button"
              aria-label={`Ajouter ${property.title} aux favoris`}
              className="absolute top-3 right-3 z-10 grid place-items-center size-7 rounded-md bg-white/90 hover:bg-white cursor-pointer"
            >
              <Icon name="favoris" className="size-3.5 text-kasa-gris-dark" />
            </button>
          </Card>
        </li>
      ))}
    </ul>
  )
}

export default function Home() {
  return (
    <ViewTransition enter="page-enter" exit="page-exit" default="none">
      <div className="flex flex-col gap-10 w-full max-w-278.75 2xl:max-w-4/5 mx-auto px-6 py-10">

        {/* Intro */}
        <section className="flex flex-col items-center gap-6 text-center">
          <h1 className="text-[32px] font-bold text-kasa-main-red max-w-80 md:max-w-none">
            Chez vous, partout et ailleurs
          </h1>
          <p className="text-sm max-w-120">
            Avec Kasa, vivez des séjours uniques dans des hébergements chaleureux, sélectionnés avec soin par nos hôtes.
          </p>
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
            <h2>Comment ça marche ?</h2>
            <p className="max-w-190">
              Que vous partiez pour un week-end improvisé, des vacances en famille ou un voyage professionnel,
              Kasa vous aide à trouver un lieu qui vous ressemble.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-215">
            <Card className="min-h-49.75 bg-kasa-main-red rounded-md gap-4">
              <CardHeader className="text-white">Recherchez</CardHeader>
              <CardContent className="text-white">
                Entrez votre destination, vos dates et laissez Kasa faire le reste
              </CardContent>
            </Card>
            <Card className="min-h-49.75 bg-kasa-main-red rounded-md gap-4">
              <CardHeader className="text-white">Réservez</CardHeader>
              <CardContent className="text-white">
                Profitez d’une plateforme sécurisée et de profils d’hôtes vérifiés.
              </CardContent>
            </Card>
            <Card className="min-h-49.75 bg-kasa-main-red rounded-md gap-4">
              <CardHeader className="text-white">Vivez l’expérience</CardHeader>
              <CardContent className="text-white">
                Installez-vous, profitez de votre séjour, et sentez-vous chez vous, partout.
              </CardContent>
            </Card>
          </div>
        </section>

      </div>
    </ViewTransition>
  );
}