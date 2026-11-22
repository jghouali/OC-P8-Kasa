"use client"

import { Button } from "@heroui/react"
import { useRouter } from "next/navigation"
import Icon from "./Icon"

export default function BackButton({ label }: { label: string }) {
    const router = useRouter()
    return (
        <Button variant="secondary" type="button" onClick={() => router.back()} className="self-start">
            <Icon name="back" /> {label}
        </Button>
    )
}