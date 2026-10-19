import { HeroSection } from '@/components/features/home/hero-section';
import { CategoriesSection } from '@/components/features/home/categories-section';
import { BestSellersSection } from '@/components/features/home/best-sellers-section';
import { BenefitsSection } from '@/components/features/home/benefits-section';
import { FeaturedCollections } from '@/components/features/home/featured-collections';
import { PlantCareEducation } from '@/components/features/home/plant-care-education';
import { PlantCareEssential } from '@/components/features/home/plant-care-essential';
import { PotsPlantersSection } from '@/components/features/home/pots-planters-section';
import { SeedsSection } from '@/components/features/home/seeds-section';
import { WhyChooseUs } from '@/components/features/home/why-choose-us';
import { InspirationSection } from '@/components/features/home/inspiration-section';
import { CustomerReviews } from '@/components/features/home/customer-reviews';
import { InstagramGallery } from '@/components/features/home/instagram-gallery';
import { NewsletterSection } from '@/components/features/home/newsletter-section';

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <BenefitsSection />
      <CategoriesSection />
      <FeaturedCollections />
      <BestSellersSection />
      <PlantCareEducation />
      <PlantCareEssential />
      <PotsPlantersSection />
      <SeedsSection />
      <WhyChooseUs />
      <InspirationSection />
      <CustomerReviews />
      <InstagramGallery />
      <NewsletterSection />
    </div>
  );
}
