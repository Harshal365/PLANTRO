import { ProductGallery } from '@/components/features/products/product-gallery';
import { ProductSpecs } from '@/components/features/products/product-specs';
import { CareInstructionsComponent } from '@/components/features/products/care-instructions';
import { AddToCartSection } from '@/components/features/products/add-to-cart-section';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Product } from '@/types';
import { plantsData, toolsData, potsData, seedsData, careData, giftingData } from '@/constants/products';
import { notFound } from 'next/navigation';

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // Get all products from all categories
  const allProducts = [...plantsData, ...toolsData, ...potsData, ...seedsData, ...careData, ...giftingData];
  const product = allProducts.find(p => p.slug === slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Gallery */}
        <ProductGallery images={product.images} productName={product.name} />

        {/* Product Info */}
        <div className="space-y-8">
          <AddToCartSection product={product} />

          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specs">Specifications</TabsTrigger>
              <TabsTrigger value="care">Care Guide</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="mt-6">
              <div className="prose prose-sm max-w-none">
                <p>{product.description}</p>
              </div>
            </TabsContent>
            <TabsContent value="specs" className="mt-6">
              <ProductSpecs specifications={product.specifications} />
            </TabsContent>
            <TabsContent value="care" className="mt-6">
              <CareInstructionsComponent care={product.careInstructions} />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Separator className="my-12" />

      {/* Additional sections would go here */}
      {/* - Related Products */}
      {/* - Reviews */}
      {/* - Recently Viewed */}
    </div>
  );
}
