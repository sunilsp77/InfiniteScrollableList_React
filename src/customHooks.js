import { useEffect, useCallback } from "react";

// make API calls and pass the returned data via dispatch
export const useFetch = (data, dispatch) => {
  useEffect(() => {
    dispatch({ type: "FETCHING_POSTS", fetching: true });
    fetch(
      `http://jsonplaceholder.typicode.com/posts?_start=${data.page}&_limit=10`
    )
      .then((data) => data.json())
      .then((posts) => {
        console.log(posts);
        dispatch({ type: "STORE_POSTS", posts });
        dispatch({ type: "FETCHING_POSTS", fetching: false });
      })
      .catch((e) => {
        // handle error
        dispatch({ type: "FETCHING_POSTS", fetching: false });
        return e;
      });
  }, [dispatch, data.page]);
};

// infinite scrolling with intersection observer
export const useInfiniteScroll = (scrollRef, dispatch) => {
  const scrollObserver = useCallback(
    (node) => {
      new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (en.intersectionRatio > 0) {
            dispatch({ type: "ADVANCE_PAGE" });
          }
        });
      }).observe(node);
    },
    [dispatch]
  );

  useEffect(() => {
    if (scrollRef.current) {
      scrollObserver(scrollRef.current);
    }
  }, [scrollObserver, scrollRef]);
};
