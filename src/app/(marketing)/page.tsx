import Hero from '@/components/organisms/Hero';

export default function HomePage() {
  return (
    <main>
      <Hero
        title="Experience the Ultimate Safari"
        subtitle="Opening December 2025"
        description="Discover luxury accommodations with breathtaking Mount Kilimanjaro views and unforgettable wildlife encounters in the heart of Amboseli National Park"
        backgroundImage="/images/hero/hero mockup.png"
        backgroundImageAlt="Amboseli Safari Club with Mount Kilimanjaro backdrop"
        mobileBackgroundImage="/images/hero/single leading bull silhouette.jpg"
        logo="/images/hero/logos/mainLOGOAmboseli.svg"
        logoAlt="Amboseli Safari Club"
        primaryCTA={{
          text: "Book Your Stay",
          href: "/contact"
        }}
        secondaryCTA={{
          text: "Explore Accommodations",
          href: "/accommodations"
        }}
        height="full"
        overlay="medium"
        priority={true}
      />
    </main>
  );
}
