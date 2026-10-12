// components/landing/PlayButton.tsx
import Link from "next/link";

export default function PlayButton() {
  return (
    <Link
      href="/play"
      className="rounded-full bg-green-600 px-8 py-3 text-lg font-medium text-white"
    >
      Play
    </Link>
  );
}