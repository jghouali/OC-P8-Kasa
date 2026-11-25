import Icon from "./Icon";

export default function FavoriteButton({ title, id }) {
    return (
        <button
            type="button"
            aria-label={`Ajouter ${title} aux favoris`}
            className="absolute top-3 right-3 z-10 grid place-items-center size-7 rounded-md bg-white/90 hover:bg-white cursor-pointer"
        >
            <Icon name="favoris" className="size-3.5 text-kasa-gris-dark fill-current" />
        </button>
    )
}