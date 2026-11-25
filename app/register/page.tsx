"use client"

import { Button, Form, Link } from "@heroui/react";
import { CGUInput, GenericInput } from "../components/FormElement";
import { register } from "../actions/auth";
import { useActionState } from "react";

export default function Login() {
    const [result, action, pending] = useActionState(register, { error: "" });
    return (
        <div className="flex flex-col w-auto md:w-185.5 mx-4 md:mx-auto my-10 xl:my-auto px-8 py-8 md:py-20 gap-9.5 bg-white border border-kasa-gris-light rounded-lg">
            <div className="flex-col gap-2">
                <h1 className="text-[24px] sm:text-[32px] font-bold text-center text-kasa-main-red">Rejoignez la communauté Kasa</h1>
                <p className="text-sm text-center text-black sm:w-122 m-auto">
                    Créez votre compte et commencez à voyager autrement : réservez des logements uniques, découvrez de nouvelles destinations et partagez vos propres lieux avec d’autres voyageurs.
                </p>
            </div>
            <div className="flex flex-col gap-5.5 w-full sm:w-90 sm:mx-auto">
                <Form id="register-form" aria-label="Formulaire d'inscription" action={action} className="flex flex-col gap-5.5">
                    <GenericInput type="text" name="lastname" label="Nom" placeholder="Doe" isRequired className="gap-1" minLength={2} />

                    <GenericInput type="text" name="firstname" label="Prénom" placeholder="John" isRequired className="gap-1" minLength={2} />

                    <GenericInput type="email" name="email" label="Adresse email" placeholder="john@example.com" isRequired className="gap-1" />

                    <GenericInput name="password" label="Mot de passe" placeholder="Entrez un mot de passe" isRequired minLength={8} type="password" className="gap-1"
                        validate={(value) => {
                            if (value.length < 8) return "Le mot de passe doit contenir au moins 8 caractères";
                            if (!/[A-Z]/.test(value)) return "Le mot de passe doit contenir au moins une majuscule";
                            if (!/[0-9]/.test(value)) return "Le mot de passe doit contenir au moins un nombre";
                            return null;
                        }} />

                    <CGUInput name="accept" isRequired className="flex flex-row gap-1" />
                </Form>
            </div>
            <div className="flex flex-col gap-5.5 items-center">
                <Button form="register-form" className="w-full max-w-57.5">S’inscrire</Button>
                <Link href="/login" className="text-sm font-normal text-center no-underline">Déjà membre ? Se connecter</Link>
            </div>
        </div>
    )
}