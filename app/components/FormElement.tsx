import { Checkbox, CheckboxProps, FieldError, Input, Label, TextField, TextFieldProps } from "@heroui/react";
import Link from "next/link";
import { HTMLInputTypeAttribute } from "react";

export function GenericInput({ type, label, placeholder, ...props }: { type: HTMLInputTypeAttribute, label: string, placeholder?: string } & TextFieldProps) {
    return (
        <TextField {...props}>
            <Label>{label}</Label>
            <Input type={type} placeholder={placeholder} />
            <FieldError />
        </TextField>
    )
}

export function CGUInput({ ...props }: CheckboxProps) {
    return (
        <Checkbox
            {...props}
            validate={(isChecked) => isChecked ? null : "Vous devez accepter les conditions générales d'utilisation"}
        >
            <Checkbox.Content className="flex flex-row items-center gap-2 px-2.5 py-1">
                <Checkbox.Control className="rounded-[2px] border border-kasa-gris-dark shadow-none size-3">
                    <Checkbox.Indicator />
                </Checkbox.Control>
                <Label className="text-kasa-gris-dark text-xs">
                    J’accepte les <Link href="/cgu" className="underline">conditions générales d’utilisation</Link>
                </Label>
            </Checkbox.Content>
            <FieldError />
        </Checkbox>
    )
}