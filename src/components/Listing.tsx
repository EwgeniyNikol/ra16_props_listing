import type { FC } from 'react';

interface MainImage {
  url_570xN: string;
}

export interface ListingItem {
  listing_id: number;
  url: string;
  MainImage?: MainImage;
  title?: string | null;
  currency_code?: string;
  price?: string;
  quantity?: number;
}

interface ListingProps {
  items: ListingItem[];
}

const formatPrice = (currency: string = '', price: string = ''): string => {
  const numPrice = parseFloat(price);
  if (isNaN(numPrice)) return price;

  switch (currency) {
    case 'USD':
      return `$${numPrice.toFixed(2)}`;
    case 'EUR':
      return `€${numPrice.toFixed(2)}`;
    case 'GBP':
      return `£${numPrice.toFixed(2)}`;
    default:
      return `${currency} ${numPrice.toFixed(2)}`;
  }
};

const getStockClass = (quantity: number): string => {
  if (quantity <= 10) return 'stock-low';
  if (quantity <= 20) return 'stock-medium';
  return 'stock-high';
};

const truncateTitle = (title?: string | null): string => {
  if (!title) return '';
  if (title.length > 50) {
    return title.slice(0, 50) + '…';
  }
  return title;
};

const Listing: FC<ListingProps> = ({ items = [] }) => {
  const validItems = items.filter(
    (item) => item.title && item.quantity != null
  );

  return (
    <div className="product-list">
      {validItems.map((item) => (
        <div className="product-card" key={item.listing_id}>
          <img
            src={item.MainImage?.url_570xN}
            alt={item.title ?? ''}
            className="product-image"
          />
          <div className="product-info">
            <h3 className="product-title">{truncateTitle(item.title)}</h3>
            <div className="price-container">
              <div className="product-price">
                {formatPrice(item.currency_code, item.price)}
              </div>
              <span className={`stock-badge ${getStockClass(item.quantity!)}`}>
                {item.quantity} left
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Listing;