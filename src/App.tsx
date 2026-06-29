import Listing from './components/Listing';
import type { ListingItem } from './components/Listing';
import etsyData from './data/etsy.json';

const items = etsyData as ListingItem[];

const App = () => {
  return <Listing items={items} />;
};

export default App;