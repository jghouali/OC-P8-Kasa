"use client"

import { Button } from "@heroui/react";
import Logo from "./components/Logo";
import Icon from "./components/Icon";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center gap-4">
      Hello
      <Logo variant="picto" />
      <Logo />
      <div className="flex flex-row gap-4">
        <Button>bouton</Button>
        <Button isDisabled>bouton</Button>
        <Button><Icon name="messages" className="text-white" /> bouton</Button>
        <Button isDisabled><Icon name="messages" className="text-kasa-gris-dark" /> bouton</Button>
        <Button isIconOnly><Icon name="messages" className="text-white" /></Button>
        <Button isIconOnly isDisabled><Icon name="messages" className="text-kasa-gris-dark" /></Button>
      </div>
      <div className="flex flex-row gap-4">
        <Icon name="messages" className="text-pink-600" />
        <Icon name="favoris" className="text-blue-600" />
        <Icon name="close" className="text-blue-600" />
        <Icon name="back" className="text-blue-600" />
        <Icon name="localisation" className="text-blue-600" />
        <Icon name="delete" className="text-blue-600" />
        <Icon name="plus" className="text-blue-600" />
        <Icon name="menu" className="text-blue-600" />
        <Icon name="send" className="text-blue-600" />
      </div>
    </div>
  );
}
