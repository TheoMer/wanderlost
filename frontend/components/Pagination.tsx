import { useQuery, gql } from '@apollo/client';
import Head from 'next/head';
import Link from 'next/link';
import PaginationStyles from './styles/PaginationStyles';
import Error from './ErrorMessage';

const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    items {
      total
    }
  }
`;

function Pagination({ page }) {
  const perPage = process.env.perPage
  const { error, loading, data } = useQuery(PAGINATION_QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return <Error error={error} />;
  const { total } = data.items;
  const pages = Math.ceil(total / perPage);
  return (
    <PaginationStyles data-testid="pagination">
      <Head>
        <title>
          Sick Fits! — Page {page} of {pages}
        </title>
      </Head>
      <Link
        href={{
          pathname: 'items',
          query: { page: page - 1 },
        }}
      >
        <a href="items" className="prev" aria-disabled={page <= 1}>
          ← Prev
        </a>
      </Link>
      <p>
        Page {page} of{' '}
        <span className="totalPages" data-testid="totalPages">
          {pages}
        </span>
      </p>
      <p>{total} Items Total</p>
      <Link
        href={{
          pathname: 'items',
          query: { page: page + 1 },
        }}
      >
        <a href="items" className="next" aria-disabled={page >= pages}>
          Next →
        </a>
      </Link>
    </PaginationStyles>
  );
}

export default Pagination;
export { PAGINATION_QUERY };