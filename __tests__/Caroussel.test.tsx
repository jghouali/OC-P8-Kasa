import { describe, expect, test } from "vitest"
import { render, screen } from "@testing-library/react"
import Carroussel from "@/app/components/Caroussel"

// génère N fausses URLs de photos
const makePictures = (count: number) =>
    Array.from({ length: count }, (_, i) => `https://example.com/photo-${i + 1}.jpg`)

describe("Carroussel : affichage", () => {
    test("affiche au maximum 5 photos", () => {
        render(
            <Carroussel pictures={makePictures(7)} />
        )
        expect(
            screen.getAllByRole("img")
        ).toHaveLength(5)
    })

    test("affiche toutes les photos quand il y en a moins de 5", () => {
        render(
            <Carroussel pictures={makePictures(3)} />
        )
        expect(
            screen.getAllByRole("img")
        ).toHaveLength(3)
    })

    test("commence par la première photo", () => {
        render(
            <Carroussel pictures={makePictures(3)} />
        )
        expect(
            screen.getAllByRole("img")[0].getAttribute("alt")
        ).toBe("Photo 1 du logement")
    })
})

