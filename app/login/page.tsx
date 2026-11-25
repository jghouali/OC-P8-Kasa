"use client"

import { Button, Form, Link } from "@heroui/react";
import { GenericInput } from "../components/FormElement";
import { login } from "../actions/auth";
import { useActionState } from "react";

export default function Login() {
    const [result, action, pending] = useActionState(login, { error: "" });

    return (
        <div className="flex flex-col w-auto md:w-185.5 mx-4 md:mx-auto my-auto px-4 py-8 md:py-20 gap-9.5 bg-white border border-kasa-gris-light rounded-lg">
            <div className="flex-col gap-2">
                <h1 className="text-[24px] sm:text-[32px] font-bold text-center text-kasa-main-red">Heureux de vous revoir</h1>
                <p className="text-sm text-center text-black sm:w-97.5 m-auto">Connectez-vous pour retrouver vos réservations, vos annonces et tout ce qui rend vos séjours uniques.</p>
            </div>

            <div className="flex flex-col gap-5.5 w-full sm:w-90 sm:mx-auto">
                <Form id="login-form" aria-label="Formulaire de connexion" action={action} className="flex flex-col gap-5.5">
                    <GenericInput type="email" name="email" label="Adresse email" placeholder="john@example.com" isRequired className="gap-1"
                        validate={(value) => {
                            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) return "Entrez une adresse email valide";
                            return null;
                        }}
                    />

                    <GenericInput type="password" name="password" label="Mot de passe" placeholder="Entrez un mot de passe" isRequired className="gap-1" />
                    {result.error &&
                        <div>
                            {result.error}
                        </div>
                    }
                </Form>
            </div>

            <div className="flex flex-col gap-5.5 items-center">
                <Button form="login-form" type="submit" className="w-full max-w-57.5">Se connecter</Button>
                <div className="flex flex-col gap-3 items-center">
                    <Link href="/recover" className="text-sm font-normal text-center no-underline">Mot de passe oublié</Link>
                    <Link href="/register" className="text-sm font-normal text-center no-underline">Pas encore de compte ? <span className="font-medium">&nbsp; Inscrivez-vous</span></Link>
                </div>
            </div>
        </div >
    )
}