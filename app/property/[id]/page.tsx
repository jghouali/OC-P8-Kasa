import BackButton from "@/app/components/BackButton";
import Carroussel from "@/app/components/Caroussel";
import Icon from "@/app/components/Icon";
import { getPropertiesDetail } from "@/app/lib/properties";
import { Avatar, AvatarImage, Button, Chip, Spinner } from "@heroui/react";
import { notFound } from "next/navigation";
import { ReactNode, Suspense, ViewTransition } from "react";

type PropertyPageParams = { id: string }

async function PropertyDetail({ params }: { params: Promise<PropertyPageParams> }): Promise<ReactNode> {
    const { id } = await params;
    const propertyDetail = await getPropertiesDetail(id)

    if ("error" in propertyDetail) {
        if (propertyDetail.status === 404) notFound()
        throw new Error(`Impossible de récupérer la propriété ${id} : ${propertyDetail.error}`)
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2.5 items-start">

            {/* Photos */}
            <Carroussel pictures={propertyDetail.pictures} />

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
        <ViewTransition enter="page-enter" exit="page-exit" default="none">
            <div className="flex flex-col max-w-278.75 2xl:max-w-4/5 mx-auto pt-2.5 lg:pt-25 px-4 lg:px-35 gap-10">
                <BackButton label="Retour aux annonces" />
                <Suspense fallback={<Spinner />}>
                    <PropertyDetail params={params} />
                </Suspense>
            </div>
        </ViewTransition>
    )
}
