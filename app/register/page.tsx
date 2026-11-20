"use client"

import { Button, Form, Link } from "@heroui/react";
import { GenericInput } from "../components/FormElement";
import { register } from "../actions/auth";
import { useActionState } from "react";

export default function Login() {
    const [result, action, pending] = useActionState(register, { error: "" });
    return (
        <div className="flex flex-col py-8 md:py-20 w-auto mx-4 md:mx-auto my-auto px-8 md:w-185.5 gap-9.5 bg-white border border-kasa-gris-light rounded-lg">
            <div className="flex-col gap-2">
                <div className="text-[24px] sm:text-[32px] font-bold text-center text-kasa-main-red">
                    Rejoignez la communauté Kasa
                </div>
                <div className="text-sm text-center text-black sm:w-122 m-auto">
                    Créez votre compte et commencez à voyager autrement : réservez des logements uniques, découvrez de nouvelles destinations et partagez vos propres lieux avec d’autres voyageurs.
                </div>
            </div>
            <div className="flex flex-col gap-5.5 w-full sm:w-90 sm:mx-auto">
                <Form action="" className="flex flex-col gap-5.5">
                    <GenericInput type="text" name="lastname" label="Nom" placeholder="Doe" isRequired className="gap-1" minLength={2} />

                    <GenericInput type="text" name="firstname" label="Prénom" placeholder="John" isRequired className="gap-1" minLength={2} />

                    <GenericInput type="email" name="email" label="Adresse email" placeholder="john@example.com" isRequired className="gap-1" />

                    <GenericInput name="password" label="Mot de passe" placeholder="Entrez un mot de passe" isRequired minLength={8} type="password" className="gap-1"
                        validate={(value) => {
                            if (value.length < 8) return "Password must be at least 8 characters";
                            if (!/[A-Z]/.test(value)) return "Password must contain at least one uppercase letter";
                            if (!/[0-9]/.test(value)) return "Password must contain at least one number";
                            return null;
                        }} />
                </Form>
            </div>
            <div className="flex flex-col gap-5.5 items-center">
                <Button className="w-full max-w-57.5">S’inscrire</Button>
                <div className="flex flex-col gap-3 items-center">
                    <Link href="/login" className="text-center">Déjà membre ? Se connecter</Link>
                </div>
            </div>
        </div>
    )
}