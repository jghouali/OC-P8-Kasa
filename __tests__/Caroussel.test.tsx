import { afterEach, beforeEach, describe, expect, test, vi } from "vitest"
import { act, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Carroussel from "@/app/components/Caroussel"

let user: ReturnType<typeof userEvent.setup>

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

    test("sans photos, affiche le div en grid et ne plante pas", () => {
        const container = render(
            <Carroussel pictures={[]} />
        )

        expect(
            container.container.firstElementChild
        ).not.toBeNull()
        expect(
            container.container.firstElementChild?.children
        ).toHaveLength(0)
        expect(
            container.container.innerHTML
        ).toMatchInlineSnapshot(`"<div class="grid grid-cols-4 gap-2.5 lg:col-span-2 lg:grid-rows-2 lg:h-89.5"></div>"`)
    })
})

describe("Carroussel : rotation automatique", () => {
    beforeEach(() => {
        vi.useFakeTimers({ toFake: ["setInterval", "clearInterval"] })
        user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
    })
    afterEach(() => vi.useRealTimers())

    test("passe à la photo suivante toutes les 5 secondes", () => {
        render(<Carroussel pictures={makePictures(3)} />)

        act(() => vi.advanceTimersByTime(5000))
        expect(
            screen.getAllByRole("img")[0].getAttribute("alt")
        ).toBe("Photo 2 du logement")

        act(() => vi.advanceTimersByTime(5000))
        expect(
            screen.getAllByRole("img")[0].getAttribute("alt")
        ).toBe("Photo 3 du logement")
    })

    test("revient à la première photo après la dernière", () => {
        render(
            <Carroussel pictures={makePictures(3)} />
        )

        act(() => vi.advanceTimersByTime(15000))
        expect(
            screen.getAllByRole("img")[0].getAttribute("alt")
        ).toBe("Photo 1 du logement")
    })

    test("reste sur la Photo 1 avec une seule photo", () => {
        render(
            <Carroussel pictures={makePictures(1)} />
        )

        act(() => vi.advanceTimersByTime(5000))
        expect(
            screen.getAllByRole("img")[0].getAttribute("alt")
        ).toBe("Photo 1 du logement")

        act(() => vi.advanceTimersByTime(5000))
        expect(
            screen.getAllByRole("img")[0].getAttribute("alt")
        ).toBe("Photo 1 du logement")

        act(() => vi.advanceTimersByTime(5000))
        expect(
            screen.getAllByRole("img")[0].getAttribute("alt")
        ).toBe("Photo 1 du logement")
    })

    test("se met en pause pendant le zoom", async () => {
        render(
            <Carroussel pictures={makePictures(3)} />
        )

        await user.click(screen.getByRole("button", { name: "Agrandir la photo" }))
        act(() => vi.advanceTimersByTime(5000))
        expect(
            screen.getAllByRole("img")[0].getAttribute("alt")
        ).toBe("Photo 1 du logement")

        act(() => vi.advanceTimersByTime(5000))
        expect(
            screen.getAllByRole("img")[0].getAttribute("alt")
        ).toBe("Photo 1 du logement")
    })
})

describe("Carroussel : zoom", () => {
    beforeEach(() => {
        vi.useFakeTimers({ toFake: ["setInterval", "clearInterval"] })
        user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
    })
    afterEach(() => vi.useRealTimers())

    test("n'affiche pas le zoom au départ", () => {
        render(
            <Carroussel pictures={makePictures(3)} />
        )

        expect(
            screen.queryByAltText(/agrandie/)
        ).toBeNull()
    })

    test("ouvre le zoom sur la grande photo", async () => {
        render(
            <Carroussel pictures={makePictures(3)} />
        )

        await user.click(screen.getByRole("button", { name: "Agrandir la photo" }))
        expect(
            screen.getByAltText("Photo 1 du logement, agrandie")
        ).toBeDefined()
        expect(
            screen.getByText("1 / 3")
        ).toBeDefined()
    })

    test("suivant et précédent changent de photo", async () => {
        render(
            <Carroussel pictures={makePictures(3)} />
        )

        await user.click(screen.getByRole("button", { name: "Agrandir la photo" }))
        await user.click(screen.getByRole("button", { name: "Photo suivante" }))
        expect(
            screen.getByAltText("Photo 2 du logement, agrandie")
        ).toBeDefined()

        await user.click(screen.getByRole("button", { name: "Photo précédente" }))
        expect(
            screen.getByAltText("Photo 1 du logement, agrandie")
        ).toBeDefined()
    })

    test("suivant : L'animation animate-page-next est positionné dans className", async () => {
        render(
            <Carroussel pictures={makePictures(3)} />
        )

        await user.click(screen.getByRole("button", { name: "Agrandir la photo" }))
        await user.click(screen.getByRole("button", { name: "Photo suivante" }))
        expect(
            screen.getByAltText(/agrandie/).className
        ).toMatch(/animate-page-next/)
    })

    test("précédent : L'animation animate-page-previous est positionné dans className", async () => {
        render(
            <Carroussel pictures={makePictures(3)} />
        )

        await user.click(screen.getByRole("button", { name: "Agrandir la photo" }))
        await user.click(screen.getByRole("button", { name: "Photo précédente" }))
        expect(
            screen.getByAltText(/agrandie/).className
        ).toMatch(/animate-page-previous/)
    })

    test("précédent sur la première photo va à la dernière", async () => {
        render(
            <Carroussel pictures={makePictures(3)} />
        )

        await user.click(screen.getByRole("button", { name: "Agrandir la photo" }))
        await user.click(screen.getByRole("button", { name: "Photo précédente" }))
        expect(
            screen.getByText("3 / 3")
        ).toBeDefined()
        expect(
            screen.getByAltText("Photo 3 du logement, agrandie")
        ).toBeDefined()
    })

    test("suivant sur la dernière photo revient à la première", async () => {
        render(
            <Carroussel pictures={makePictures(3)} />
        )

        await user.click(screen.getByRole("button", { name: "Agrandir la photo" }))
        await user.click(screen.getByRole("button", { name: "Photo précédente" }))
        await user.click(screen.getByRole("button", { name: "Photo suivante" }))
        expect(
            screen.getByText("1 / 3")
        ).toBeDefined()
        expect(
            screen.getByAltText("Photo 1 du logement, agrandie")
        ).toBeDefined()
    })

    test("pas de boutons précédent / suivant avec une seule photo", async () => {
        render(
            <Carroussel pictures={makePictures(1)} />
        )

        await user.click(screen.getByRole("button", { name: "Agrandir la photo" }))
        expect(
            screen.queryByRole("button", { name: "Photo suivante" })
        ).toBeNull()
        expect(
            screen.queryByRole("button", { name: "Photo précédente" })
        ).toBeNull()
    })

    test("le bouton Fermer ferme le zoom", async () => {
        render(
            <Carroussel pictures={makePictures(3)} />
        )

        await user.click(screen.getByRole("button", { name: "Agrandir la photo" }))
        await user.click(screen.getByRole("button", { name: "Fermer" }))
        expect(
            screen.queryByAltText(/agrandie/)
        ).toBeNull()
    })

    test("un clic sur le fond ferme le zoom", async () => {
        render(
            <Carroussel pictures={makePictures(3)} />
        )

        await user.click(screen.getByRole("button", { name: "Agrandir la photo" }))
        await user.click(screen.getByAltText(/agrandie/).parentElement!
        )
        expect(
            screen.queryByAltText(/agrandie/)
        ).toBeNull()
    })

    test("un clic sur la photo agrandie ne ferme pas le zoom", async () => {
        render(
            <Carroussel pictures={makePictures(3)} />
        )

        await user.click(screen.getByRole("button", { name: "Agrandir la photo" }))
        await user.click(screen.getByAltText(/agrandie/))
        expect(
            screen.getByAltText(/agrandie/)
        ).toBeDefined()
    })
})

describe("Carroussel : clavier", () => {
    beforeEach(() => {
        vi.useFakeTimers({ toFake: ["setInterval", "clearInterval"] })
        user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
    })
    afterEach(() => vi.useRealTimers())

    test("les flèches changent de photo dans le zoom", async () => {
        render(
            <Carroussel pictures={makePictures(3)} />
        )

        await user.click(screen.getByRole("button", { name: "Agrandir la photo" }))
        await user.keyboard("{ArrowRight}")
        expect(
            screen.getByText("2 / 3")
        ).toBeDefined()

        await user.keyboard("{ArrowLeft}")
        expect(
            screen.getByText("1 / 3")
        ).toBeDefined()
    })

    test("Échap ferme le zoom", async () => {
        render(
            <Carroussel pictures={makePictures(3)} />
        )

        await user.click(screen.getByRole("button", { name: "Agrandir la photo" }))
        await user.keyboard("{Escape}")
        expect(
            screen.queryByAltText(/agrandie/)
        ).toBeNull()
    })

    test("les flèches ne font rien quand le zoom est fermé", async () => {
        render(
            <Carroussel pictures={makePictures(3)} />
        )

        await user.keyboard("{ArrowRight}")
        expect(
            screen.getAllByRole("img")[0].getAttribute("alt")
        ).toBe("Photo 1 du logement")
    })
})
