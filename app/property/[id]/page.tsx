import Icon from "@/app/components/Icon";
import { getPropertiesDetail } from "@/app/lib/properties";
import { Avatar, AvatarImage, Button, Chip, Spinner } from "@heroui/react";
import Image from "next/image";
import { ReactNode, Suspense } from "react";

type PropertyPageParams = { id: string }

async function PropertyDetail({ params }: { params: Promise<PropertyPageParams> }): Promise<ReactNode> {
    const paramsData = await params;
    const propertyDetail = await getPropertiesDetail(paramsData.id)

    console.log("PropertyDetail propertyDetail : ", propertyDetail)

    return (
        <div className="flex flex-col gap-20 p-35">
            <div className="flex flex-row gap-2.5">
                <div className="flex flex-row w-2/3 gap-2.5">
                    <img src={propertyDetail.pictures[0]} alt="Photo1" className="w-1/2 h-auto rounded-md" />
                    <div className="flex flex-col w-1/2 gap-2.5">
                        <div className="flex flex-row w-1/2 gap-2.5">
                            <img src={propertyDetail.pictures[1]} alt="Photo2" className="w-auto h-auto rounded-md" />
                            <img src={propertyDetail.pictures[2]} alt="Photo3" className="w-auto h-auto rounded-md" />
                        </div>
                        <div className="flex flex-row w-1/2 gap-2.5">
                            <img src={propertyDetail.pictures[3]} alt="Photo4" className="w-auto h-auto rounded-md" />
                            <img src={propertyDetail.pictures[4]} alt="Photo5" className="w-auto h-auto rounded-md" />
                        </div>
                    </div>
                </div>
                <div></div>
                <div className="flex flex-col w-1/3 p-6 bg-white rounded-md gap-2">
                    <p className="font-medium">Votre hôte</p>
                    <div className="flex flex-row justify-between items-center py-4">
                        <Avatar className="rounded-lg size-20.5" >
                            <AvatarImage src={propertyDetail.host.picture} />
                        </Avatar>
                        <p className="text-black font-normal">{propertyDetail.host.name}</p>
                        <div className="flex flex-row items-center gap-1 p-2 px-3 bg-kasa-gris-light rounded-lg">
                            <svg width="15" height="17" viewBox="0 0 15 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.41993 0.740832C6.68503 -0.246854 8.08645 -0.246854 8.35156 0.740831L9.3198 4.34812C9.43709 4.7851 9.83316 5.08888 10.2856 5.08888H13.7696C14.6917 5.08888 15.1224 6.23081 14.43 6.83978L11.3032 9.58975C11.0176 9.84097 10.8992 10.2325 10.9978 10.5999L12.1123 14.7517C12.3689 15.7077 11.2293 16.4156 10.486 15.7619L8.04616 13.616C7.66852 13.2839 7.10297 13.2839 6.72533 13.616L4.28546 15.7619C3.5422 16.4156 2.40263 15.7077 2.65923 14.7517L3.77364 10.5999C3.87225 10.2325 3.75388 9.84097 3.46824 9.58975L0.341498 6.83978C-0.350916 6.23081 0.0798023 5.08888 1.00191 5.08888H4.48588C4.93832 5.08888 5.3344 4.7851 5.45169 4.34812L6.41993 0.740832Z" fill="#99331A" />
                            </svg>
                            {propertyDetail.rating_avg}
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Button className="w-full">Contacter l’hôte</Button>
                        <Button className="w-full">Envoyer un message</Button>
                    </div>
                </div>
            </div>

            <div className="flex flex-col w-2/3 p-6 bg-white rounded-xl gap-10">
                <div className="flex flex-col gap-8 ">
                    <div className="flex flex-col gap-4">
                        <h1 className="text-black font-medium text-[24px]">{propertyDetail.title}</h1>
                        <div className="flex flex-row gap-2 items-center">
                            <Icon name="localisation" className="text-kasa-gris-dark" />
                            <p className="text-kasa-gris-dark text-[14px]" >{propertyDetail.location}</p>
                        </div>
                    </div>
                    <div>
                        <p>
                            {propertyDetail.description}
                        </p>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <h2>Équipements</h2>
                    <div className="grid grid-cols-3 grid-rows-3 w-100 gap-2">
                        {propertyDetail.equipments.map((equipment, key) =>
                            <Chip key={key} variant="secondary" className="flex justify-center w-30 h-8 rounded-md w">
                                <span className="text-[12px] text-kasa-gris-dark">{equipment}</span>
                            </Chip>
                        )}
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <h2>Catégorie</h2>
                    <div className="grid grid-cols-3 grid-rows-3 w-100 gap-2">
                        {propertyDetail.tags.map((tag, key) =>
                            <Chip key={key} variant="secondary" className="flex justify-center w-30 h-8 rounded-md w">
                                <span className="text-[12px] text-kasa-gris-dark">{tag}</span>
                            </Chip>
                        )}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default function PropertyPage({ params }: any) {
    return (
        <div className="flex flex-col flex-1">
            <Button variant="secondary" type="button"><Icon name="back" />Retour aux annonces</Button>
            <Suspense fallback={<Spinner />}>
                <PropertyDetail params={params} />
            </Suspense>
        </div>
    )
}