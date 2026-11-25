import { Skeleton } from "@heroui/react";

export default function PropertiesSkeleton() {
    return (
        <ul aria-hidden="true" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 w-full">
            {Array.from({ length: 6 }, (_, i) => (
                <li key={i} className="w-full max-w-88.75 h-138 mx-auto">
                    <Skeleton className="flex flex-col h-full rounded-[10px] bg-white">
                        <Skeleton className="h-94 rounded-none" />
                        <div className="flex flex-col gap-3 p-6 pt-4">
                            <Skeleton className="h-5 w-3/4 rounded" />
                            <Skeleton className="h-4 w-1/2 rounded" />
                        </div>
                    </Skeleton>
                </li>
            ))}
        </ul>
    )
}

export function PropertyDetailSkeleton() {
    return (
        <div aria-hidden="true" className="grid grid-cols-1 lg:grid-cols-3 gap-2.5 items-start">

            {/* Photos : même grille que le Carroussel */}
            <div className="grid grid-cols-4 gap-2.5 lg:col-span-2 lg:grid-rows-2 lg:h-89.5">
                <Skeleton className="col-span-4 aspect-6/7 rounded-md lg:col-span-2 lg:row-span-2 lg:aspect-auto" />
                {Array.from({ length: 4 }, (_, i) => (
                    <Skeleton key={i} className="aspect-4/5 rounded-md lg:aspect-auto" />
                ))}
            </div>

            {/* Description */}
            <Skeleton className="h-96 rounded-xl lg:col-span-2" />

            {/* Hôte */}
            <Skeleton className="h-64 rounded-md lg:col-start-3 lg:row-start-1" />
        </div>
    )
}