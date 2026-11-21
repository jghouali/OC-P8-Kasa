import Icon from "@/app/components/Icon";
import { getPropertiesDetail } from "@/app/lib/properties";
import { Avatar, AvatarImage, Button, Chip, Spinner } from "@heroui/react";
import { ReactNode, Suspense } from "react";

type PropertyPageParams = { id: string }

async function PropertyDetail({ params }: { params: Promise<PropertyPageParams> }): Promise<ReactNode> {
    const { id } = await params;
    const propertyDetail = await getPropertiesDetail(id)

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2.5 items-start">

            {/* Photos */}
            <div className="grid grid-cols-4 gap-2.5 lg:col-span-2 lg:grid-rows-2 lg:h-89.5">
                {propertyDetail.pictures.slice(0, 5).map((src, i) => (
                    <img
                        key={src}
                        src={src}
                        alt={`Photo ${i + 1} du logement`}
                        className={
                            "w-full rounded-md object-cover lg:h-full lg:min-h-0 lg:aspect-auto " +
                            (i === 0
                                ? "col-span-4 aspect-6/7 lg:col-span-2 lg:row-span-2"
                                : "aspect-4/5")
                        }
                    />
                ))}
            </div>

            {/* Description */}
            <div className="flex flex-col gap-10 p-6 bg-white rounded-xl lg:col-span-2">
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-4">
                        <h1 className="text-black font-medium text-[24px]">{propertyDetail.title}</h1>
                        <div className="flex flex-row gap-2 items-center">
                            <Icon name="localisation" className="text-kasa-gris-dark" />
                            <p className="text-kasa-gris-dark text-[14px]">{propertyDetail.location}</p>
                        </div>
                    </div>
                    <p>{propertyDetail.description}</p>
                </div>

                <div className="flex flex-col gap-4">
                    <h2>Équipements</h2>
                    <div className="flex flex-wrap gap-2">
                        {propertyDetail.equipments.map((equipment) => (
                            <Chip key={equipment} variant="secondary" className="justify-center min-w-30 h-8 rounded-md">
                                <span className="text-[12px] text-kasa-gris-dark">{equipment}</span>
                            </Chip>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <h2>Catégorie</h2>
                    <div className="flex flex-wrap gap-2">
                        {propertyDetail.tags.map((tag) => (
                            <Chip key={tag} variant="secondary" className="justify-center min-w-30 h-8 rounded-md">
                                <span className="text-[12px] text-kasa-gris-dark">{tag}</span>
                            </Chip>
                        ))}
                    </div>
                </div>
            </div>

            {/* Votre hôte */}
            <div className="flex flex-col gap-2 p-4 bg-white rounded-md lg:col-start-3 lg:row-start-1">
                <p className="font-medium">Votre hôte</p>
                <div className="flex flex-row justify-between items-center py-4">
                    <Avatar className="rounded-lg size-20.5">
                        <AvatarImage src={propertyDetail.host.picture} />
                    </Avatar>
                    <p className="text-black font-normal">{propertyDetail.host.name}</p>
                    <div className="flex flex-row items-center gap-1 p-2 px-3 bg-kasa-gris-light rounded-lg">
                        <Icon name="star" className="text-kasa-main-red" />
                        {propertyDetail.rating_avg}
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <Button className="w-full">Contacter l’hôte</Button>
                    <Button className="w-full">Envoyer un message</Button>
                </div>
            </div>
        </div>
    )
}

export default function PropertyPage({ params }: PageProps<"/property/[id]">) {
    return (
        <div className="flex flex-col gap-5 p-4 lg:p-35">
            <Button variant="secondary" type="button" className="self-start">
                <Icon name="back" />Retour aux annonces
            </Button>
            <Suspense fallback={<Spinner />}>
                <PropertyDetail params={params} />
            </Suspense>
        </div>
    )
}
