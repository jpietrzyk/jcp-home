import { PageTransition } from "../components/PageTransition";
import { HomeHeroSection } from "../components/home/HomeHeroSection";
import { HomeAboutSection } from "../components/home/HomeAboutSection";
import { HomeBlogSection } from "../components/home/HomeBlogSection";
import { HomeMusicSection } from "../components/home/HomeMusicSection";
import { HomeProjectsSection } from "../components/home/HomeProjectsSection";

export function HomePage() {
  return (
    <PageTransition>
      <section className="space-y-12">
        <HomeHeroSection />
        <HomeAboutSection />
        <HomeBlogSection />
        <HomeMusicSection />
        <HomeProjectsSection />
      </section>
    </PageTransition>
  );
}
