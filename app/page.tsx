import { Suspense } from "react";
import { getProperties } from "./lib/properties";
import { Avatar, AvatarImage, Card, CardContent, CardDescription, CardHeader, Link, Spinner } from "@heroui/react";
import Image from 'next/image'
import BannerTopImage from '../public/images/banner-top-home.jpg'

async function Properties() {
  const properties = await getProperties()


  if ("error" in properties) {
    return (
      <div>error : {properties.error}</div>
    )
  };

  return (
    <ul className="flex flex-row flex-wrap gap-6 justify-center">
      {
        properties.map((property, key) =>
          <Card key={key} className="p-0 gap-4 w-88.75 rounded-md overflow-hidden">
            <Avatar className="rounded-none w-full h-94 border-0 ring-0">
              <AvatarImage src={property.cover} width="auto" height="auto" />
            </Avatar>
            <div className="p-6 pt-0">
              <CardHeader>
                <Link href={`/property/${property.id}`}>
                  {property.title}
                </Link>
              </CardHeader>
              <CardDescription>
                {property.location}
              </CardDescription>
              <CardContent className="pt-16">
                <div>{property.price_per_night}€ par nuit</div>
              </CardContent>
            </div>
          </Card>)
      }
    </ul>
  )

}

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center gap-10 py-10">
      <h1>Chez vous, partout et ailleurs</h1>
      <p>Avec Kasa, vivez des séjours uniques dans des hébergements chaleureux, sélectionnés avec soin par nos hôtes.</p>
      <Image width={1115} height={572} src={BannerTopImage} alt="Maison en bois sombre au milieu des herbes hautes" className="rounded-xl" />
      <Suspense fallback={<Spinner />}>
        <Properties />
      </Suspense>
      <div className="flex flex-col items-center bg-white rounded-md m-auto p-10 gap-10">
        <div className="flex flex-col gap-4 items-center ">
          <h2>Comment ça marche ?</h2>
          <p className="max-w-190 text-center">Que vous partiez pour un week-end improvisé, des vacances en famille ou un voyage professionnel,
            Kasa vous aide à trouver un lieu qui vous ressemble.</p>
        </div>
        <div className="flex flex-row gap-4 justify-center">
          <Card className="w-67.5 h-49.75 bg-kasa-main-red rounded-md gap-4">
            <CardHeader className="text-white">Recherchez</CardHeader>
            <CardContent className="text-white">Entrez votre destination, vos dates et laissez Kasa faire le reste</CardContent>
          </Card>
          <Card className="w-67.5 h-49.75 bg-kasa-main-red rounded-md">
            <CardHeader className="text-white">Réservez</CardHeader>
            <CardContent className="text-white">Profitez d’une plateforme sécurisée
              et de profils d’hôtes vérifiés.</CardContent>
          </Card>
          <Card className="w-67.5 h-49.75 bg-kasa-main-red rounded-md">
            <CardHeader className="text-white">Vivez l’expérience</CardHeader>
            <CardContent className="text-white">Installez-vous, profitez de votre séjour,
              et sentez-vous chez vous, partout.</CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
