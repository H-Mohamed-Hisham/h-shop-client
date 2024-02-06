import { useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Container, Row, Col } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import { useLocation } from "react-router-dom";

// Components
import Loader from "components/common/Loader";
import Message from "components/common/Message";
import ProductCard from "components/product/ProductCard";

// API
import { getAllProductsByLimit } from "api";

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

const Home = () => {
  // Query Params
  let query = useQuery();
  let searchKeyword = query.get("search");

  // Query
  const { data, fetchNextPage, hasNextPage, isFetched, isError, error }: any =
    useInfiniteQuery({
      queryKey: ["get_all_products_by_limit"],
      queryFn: ({ pageParam = 0 }) => {
        return getAllProductsByLimit([
          "get_all_products_by_limit",
          {
            skip: pageParam,
            ...(searchKeyword && {
              productKeyword: searchKeyword,
            }),
          },
        ]);
      },
      getNextPageParam: (lastPage: any) => {
        if (lastPage.data.prevOffset > lastPage.data.productCount) {
          return false;
        }

        return lastPage.data.prevOffset;
      },
    });

  const products = data?.pages.reduce((acc: any, page: any) => {
    return [...acc, ...page?.data.products];
  }, []);

  return (
    <Container fluid className="home">
      <Row>
        <Col md={12} className="mt-2">
          {!isFetched && <Loader />}
        </Col>

        <Col md={12} className="mt-2">
          {isError && <Message message={error?.message} />}
        </Col>

        <Col md={12} className="mt-2">
          <InfiniteScroll
            dataLength={products ? products.length : 0}
            next={() => fetchNextPage()}
            hasMore={hasNextPage}
            loader={<Loader />}
          >
            <div>
              <Row>
                {products &&
                  products.map((product: any, index: number) => (
                    <Col key={index} sm={12} md={6} lg={4} xl={4}>
                      <ProductCard product={product} />
                    </Col>
                  ))}
              </Row>
            </div>
          </InfiniteScroll>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
