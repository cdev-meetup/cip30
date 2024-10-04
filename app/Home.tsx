import { useEffect, useState } from "react";
import { Button } from "@nextui-org/button";

import { Wallet } from "@/types/cip30";
import { bech32 } from "bech32";

export default function Home() {
  const [wallets, setWallets] = useState<Wallet[]>();
  const [address, setAddress] = useState(""); // addr_...

  useEffect(() => {
    const wallets: Wallet[] = [];

    const { cardano } = window;
    for (const c in cardano) {
      const wallet = cardano[c];
      if (!wallet.apiVersion) continue;
      wallets.push(wallet);
    }

    wallets.sort((l, r) => {
      return l.name.toUpperCase() < r.name.toUpperCase() ? -1 : 1;
    });
    setWallets(wallets);
  }, []);

  async function connectWallet({ enable }: Wallet) {
    const api = await enable();

    const network = await api.getNetworkId();
    const address = await api.getChangeAddress();

    const bytes = Buffer.from(address, "hex");
    const words = bech32.toWords(bytes);

    const addr = bech32.encode(network ? "addr" : "addr_test", words, address.length);
    setAddress(addr);
  }

  if (address) return <div className="flex justify-center font-mono">{address}</div>;

  if (!wallets) return <div className="flex justify-center uppercase">Browsing Cardano Wallets</div>;

  if (!wallets.length) return <div className="flex justify-center uppercase">No Cardano Wallet</div>;

  return (
    <div className="flex flex-wrap justify-center gap-2">
      {wallets.map((wallet, w) => (
        <Button
          key={`wallet.${w}`}
          onClick={() => connectWallet(wallet)}
          className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg capitalize"
          radius="full"
        >
          {wallet.name}
        </Button>
      ))}
    </div>
  );
}
