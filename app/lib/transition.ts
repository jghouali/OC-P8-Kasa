import { flushSync } from "react-dom"

export const withTransition = (update: () => void) => {
    if (!document.startViewTransition) {
        update()
        return
    }
    document.startViewTransition(() => flushSync(update))
}