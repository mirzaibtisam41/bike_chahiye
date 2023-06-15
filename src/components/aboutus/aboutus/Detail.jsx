import React from "react";
import "./style.css";
import MapItems from "./MapItems";

const Detail = () => {
  const array = [1, 2, 3, 4, 5];
  return (
    <>
      <section className="container bg-dark section-main-items-resources px-5 pt-1 pb-5">
        {array.map((item, index) => {
          return <MapItems key={index} />;
        })}
      </section>
    </>
  );
};

export default Detail;
