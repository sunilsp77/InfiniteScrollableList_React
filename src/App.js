import React, { useReducer, useRef } from "react";
import { useFetch, useInfiniteScroll } from "./customHooks";
import { pageReducer, postsReducer } from "./postsReducer";
import "./index.css";

function App() {
  const [pager, pagerDispatch] = useReducer(pageReducer, { page: 0 });
  const [postsData, postsDispatch] = useReducer(postsReducer, {
    posts: [],
    fetching: false,
  });

  let bottomBoundaryRef = useRef(null);
  useFetch(pager, postsDispatch);
  useInfiniteScroll(bottomBoundaryRef, pagerDispatch);

  return (
    <>
      <div id="posts" className="container">
        <div className="row">
          {postsData?.posts?.map((post) => {
            const { id, title, body } = post;
            return (
              <div key={id} className="card text-capitalize">
                <div className="card-header">{title}</div>
                <div className="card-body ">{body}</div>
              </div>
            );
          })}
        </div>
      </div>

      {postsData.fetching && (
        <div className="text-center bg-secondary m-auto p-3">
          <p className="m-0 text-white">Loading Posts...</p>
        </div>
      )}
      <div
        id="page-bottom-boundary"
        style={{ border: "1px solid red" }}
        ref={bottomBoundaryRef}
      ></div>
    </>
  );
}

export default App;
