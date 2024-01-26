import Link from "next/link";
import Image from "next/image";

const BodyLogo = "/assets/body_logo.png";

export default function Logo() {
  return (
    <Link href="/">
      <Image
        priority
        src={BodyLogo}
        alt="Student Body Logo"
        width={180}
        height={180}
      />
    </Link>
  );
}
