'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ProductCard } from '@/components/features/products/product-card';
import { plantsData, potsData, seedsData, toolsData, careData, giftingData } from '@/constants/products';

// Simple fuzzy search function
function fuzzyMatch(text: string, query: string): boolean {
  const textLower = text.toLowerCase();
  const queryLower = query.toLowerCase();
  
  // Exact match
  if (textLower.includes(queryLower)) return true;
  
  // Check if query is a substring of text (partial match)
  if (queryLower.length > 2) {
    let queryIndex = 0;
    for (let i = 0; i < textLower.length && queryIndex < queryLower.length; i++) {
      if (textLower[i] === queryLower[queryIndex]) {
        queryIndex++;
      }
    }
    // If 70% of query characters match in order
    if (queryIndex / queryLower.length >= 0.7) return true;
  }
  
  // Check for similar words (Levenshtein distance simplified)
  const words = textLower.split(' ');
  for (const word of words) {
    if (word.length >= queryLower.length - 2 && word.length <= queryLower.length + 2) {
      let matches = 0;
      for (let i = 0; i < Math.min(word.length, queryLower.length); i++) {
        if (word[i] === queryLower[i]) matches++;
      }
      if (matches / Math.min(word.length, queryLower.length) >= 0.6) return true;
    }
  }
  
  return false;
}

function SearchPageInner() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  // Get all products
  const allProducts = [...plantsData, ...potsData, ...seedsData, ...toolsData, ...careData, ...giftingData];

  // Filter products based on search query with fuzzy matching
  const filteredProducts = query
    ? allProducts.filter(product =>
        fuzzyMatch(product.name, query) ||
        fuzzyMatch(product.description, query) ||
        fuzzyMatch(product.category.name, query)
      )
    : [];

  // If no fuzzy matches, show all products with a message
  const displayProducts = query && filteredProducts.length === 0 ? allProducts : filteredProducts;

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">
          {query ? `Search results for "${query}"` : 'Search'}
        </h1>

        {query && filteredProducts.length === 0 && (
          <div className="mb-6 md:mb-8 p-4 bg-cream/30 rounded-lg">
            <p className="text-sm md:text-base text-muted-foreground">
              No exact matches found for "{query}". Showing all products instead.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {displayProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {!query && (
          <div className="text-center py-8 md:py-12">
            <p className="text-muted-foreground text-base md:text-lg">
              Enter a search term to find products
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function SearchContent() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-8 md:py-12 lg:py-16"><div className="max-w-6xl mx-auto">Loading...</div></div>}>
      <SearchPageInner />
    </Suspense>
  );
}

export default SearchContent;
