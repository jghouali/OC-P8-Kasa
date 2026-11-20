import { FieldError, Input, Label, TextField, TextFieldProps } from "@heroui/react";
import { HTMLInputTypeAttribute } from "react";

export function GenericInput({ type, label, placeholder, ...props }: { type: HTMLInputTypeAttribute, label: string, placeholder: string } & TextFieldProps) {
    return (
        <TextField {...props}>
            <Label>{label}</Label>
            <Input type={type} placeholder={placeholder} />
            <FieldError />
        </TextField>
    )
}

export default function TextInput({ label, placeholder, ...props }: { label: string, placeholder: string } & TextFieldProps) {
    return (
        <TextField {...props}>
            <Label>{label}</Label>
            <Input type="text" placeholder={placeholder} />
            <FieldError />
        </TextField>
    )
}

export function EmailInput({ label, placeholder, ...props }: { label: string, placeholder: string } & TextFieldProps) {
    const validateFunction = props.validate ? props.validate : (value: string) => {
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
            return "Entrez une adresse email valide";
        }

        return null;
    }

    return (
        <TextField {...props} validate={validateFunction} >
            <Label>{label}</Label>
            <Input type="email" placeholder={placeholder} />
            <FieldError />
        </TextField>
    )
}