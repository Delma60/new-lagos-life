import Link from "next/link";
import PlayButton from "@/components/landing/PlayButton";

export default function Home() {
  return (
    <main className="landing">
      <nav className="landing__nav" aria-label="Main navigation">
        <Link className="landing__brand" href="/">
          NEW LAGOS <span>•</span> LIFE
        </Link>
        <a className="landing__nav-link" href="#about">
          ABOUT THE GAME
        </a>
      </nav>

      <section className="landing__hero" aria-labelledby="hero-title">
        <p className="landing__eyebrow">A CITY THAT NEVER STANDS STILL</p>
        <h1 id="hero-title">
          YOUR STORY.
          <br />
          <span>YOUR LAGOS.</span>
        </h1>
        <p className="landing__intro">
          Find your feet, make your moves, and build a life in a city full of
          possibility.
        </p>
        <PlayButton />
        <p className="landing__status">EARLY ACCESS · MORE CITY COMING SOON</p>
      </section>

      <section className="landing__about" id="about">
        <span className="landing__about-number">01 / THE CITY</span>
        <p>
          A new beginning is waiting around every corner. Explore the streets
          and make this city your own.
        </p>
        <span className="landing__about-mark" aria-hidden="true">
          NL
        </span>
      </section>
    </main>
  );
}
