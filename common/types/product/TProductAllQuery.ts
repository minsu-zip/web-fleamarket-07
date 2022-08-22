import TLocation from '../TLocation';
import TCategory from '../TCategory';

type TProductAllQuery = {
  locationId: TLocation['id'];
  categoryId?: TCategory['id'];
};

export default TProductAllQuery;
