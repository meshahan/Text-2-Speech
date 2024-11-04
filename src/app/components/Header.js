import Image from "next/image";
import Link from "next/link";

export default function Header(){
    return (
        <header className="fixed top-0 left-0 w-full z-50 p-4 flex justify-center items-center">
            <Link href="/">
                <Image src="/logo.png" width={720} height={96} alt="logo"/>
            </Link>
        </header>
    )
}