import PropTypes from 'prop-types';
import Items from '../components/Items';
import { useQuery } from '@apollo/client';
import { PAGINATION_QUERY } from '../components/Pagination';

function Home ({ query }) {
  const { data, loading } = useQuery(PAGINATION_QUERY)
  if (loading) return 'Loading...';
  return (
  <div>
    <Items
      page={parseFloat(query.page) || 1}
      // count={data.itemsConnection.aggregate.count}
    />
  </div>
)};

Home.propTypes = {
  query: PropTypes.shape({
    page: PropTypes.string,
    count: PropTypes.number,
  }).isRequired,
};

export default Home;
