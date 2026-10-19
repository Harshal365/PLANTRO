import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function ShopPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Shop Our Collection</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Browse our wide selection of plants, seeds, pots, and gardening essentials
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link href="/shop/plants">
            <div className="p-6 border rounded-lg hover:border-forest transition-colors group">
              <h3 className="text-xl font-semibold mb-2 group-hover:text-forest transition-colors">Plants</h3>
              <p className="text-muted-foreground">Indoor & outdoor plants</p>
            </div>
          </Link>
          
          <Link href="/shop/seeds">
            <div className="p-6 border rounded-lg hover:border-forest transition-colors group">
              <h3 className="text-xl font-semibold mb-2 group-hover:text-forest transition-colors">Seeds</h3>
              <p className="text-muted-foreground">Flower & vegetable seeds</p>
            </div>
          </Link>
          
          <Link href="/shop/pots">
            <div className="p-6 border rounded-lg hover:border-forest transition-colors group">
              <h3 className="text-xl font-semibold mb-2 group-hover:text-forest transition-colors">Pots & Planters</h3>
              <p className="text-muted-foreground">Ceramic & decorative pots</p>
            </div>
          </Link>
          
          <Link href="/shop/tools">
            <div className="p-6 border rounded-lg hover:border-forest transition-colors group">
              <h3 className="text-xl font-semibold mb-2 group-hover:text-forest transition-colors">Gardening Tools</h3>
              <p className="text-muted-foreground">Essential gardening supplies</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
