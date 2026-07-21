import { Hero } from "@/components/home/Hero";
import { FeatureStrip } from "@/components/home/FeatureStrip";
import { ShopByCategory } from "@/components/home/ShopByCategory";
import { NewArrivals } from "@/components/home/NewArrivals";
import { SpecialOffer } from "@/components/home/SpecialOffer";
import { WhyShopWithUs } from "@/components/home/WhyShopWithUs";
import { PopularCollections } from "@/components/home/PopularCollections";
import { listPublicCategories } from "@/modules/user/category/category.service";
import { listPublicProducts } from "@/modules/user/products/product.service";

export default async function Home() {
  const [categories, newArrivalsResult] = await Promise.all([
    listPublicCategories(),
    listPublicProducts({ page: 1, limit: 6, sort: "newest" }),
  ]);

  const offerTargetDate = new Date();
  offerTargetDate.setDate(offerTargetDate.getDate() + 2); // 2-day countdown, adjust as needed

  return (
    <>
      <Hero />
      <FeatureStrip />
      <ShopByCategory categories={categories} />
      <NewArrivals products={newArrivalsResult.products} />
      <SpecialOffer targetDate={offerTargetDate} />
      <WhyShopWithUs />
      <PopularCollections />
    </>
  );
}