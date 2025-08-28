import Hero from "@/components/Hero";
import Container from "@/components/layout/Container";
import SupportSection from "@/components/SupportSection";
import BoxTopsSection from "@/components/BoxTopsSection";

export default function Home() {
  return (
    <>
      <Hero />
      <SupportSection />
      <BoxTopsSection />
      <Container>
      </Container>
    </>
  );
}