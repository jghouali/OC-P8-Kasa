import { afterEach } from "vitest"
import { cleanup } from "@testing-library/react"

// retire du DOM les composants affichés par le test précédent
afterEach(() => {
    cleanup()
})