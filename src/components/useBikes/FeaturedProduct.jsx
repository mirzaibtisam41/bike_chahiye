// import React, { useContext } from "react";
// import Carousel from "react-elastic-carousel";
// import { GlobalContext } from "../Context/Context";
// import { useHistory } from "react-router-dom";

// export default function FeaturedProduct() {
//   const {
//     featuredProductsState: { products },
//     setProductDetail,
//     setCartData,
//   } = useContext(GlobalContext);
//   const breakPoints = [
//     { width: 1, itemsToShow: 1 },
//     { width: 550, itemsToShow: 3 },
//     { width: 768, itemsToShow: 3 },
//     { width: 1200, itemsToShow: 5 },
//   ];

//   const history = useHistory();

//   const AddDetailFunc = (item) => {
//     setProductDetail(item);
//     history.push(`/detailpage?name=${item.title}&feature=1`);
//   };

//   const addToCart = (item) => {
//     let cartItems = JSON.parse(localStorage.getItem("cart"));
//     const selectiveItems = {
//       id: item.id,
//       name: item.title,
//       price: item.price,
//       count: 1,
//       image: item.images && item.images,
//     };
//     if (cartItems === null) {
//       let cartArray = [];
//       cartArray.push(selectiveItems);
//       setCartData(cartArray);
//       localStorage.setItem("cart", JSON.stringify(cartArray));
//     } else if (cartItems) {
//       cartItems.push(selectiveItems);
//       setCartData(cartItems);
//       localStorage.setItem("cart", JSON.stringify(cartItems));
//     }
//   };

//   return (
//     <div className="container mb-5">
//       <section className="text-center bygga-parent equip-parent py-5">
//         <span className="back-border bygga-text-heading fs-4 fw-bold text-muted text-capitalize">
//           featured products
//         </span>
//       </section>
//       <section className="container services-page card-page shadow-sm py-4">
//         <Carousel breakPoints={breakPoints} pagination={false}>
//           {products?.map((item, index) => {
//             return (
//               <section
//                 key={index}
//                 className="bg-white mb-3 mx-2 shadow px-3"
//                 style={{ borderRadius: "15px" }}
//               >
//                 <div
//                   onClick={(e) => AddDetailFunc(item)}
//                   className="d-flex brand-img-div-map justify-content-center align-items-center pt-3"
//                 >
//                   <img
//                     className="brand-img-map"
//                     src={item.images.length > 0 && item.images[0].src}
//                     alt=""
//                   />
//                 </div>

//                 <hr style={{ border: "1px solid red" }} />
//                 <div className="pb-3">
//                   <section className="d-flex brand-map-name justify-content-between align-items-center">
//                     <span className="text-capitalize fw-bold">
//                       {item.title}
//                     </span>
//                     <i className="fa fa-heart text-muted fa-lg"></i>
//                   </section>
//                   <section>
//                     <span className="fw-bold text-danger">{item.price} kR</span>
//                     <span className="font-size-small mx-2 yellowtxt">
//                       Excluding VAT
//                     </span>
//                   </section>
//                   <button
//                     onClick={() => addToCart(item)}
//                     className="btn btn-primary mt-3 btn-size"
//                   >
//                     <i
//                       className="fa fa-shopping-cart me-2"
//                       aria-hidden="true"
//                     ></i>
//                     Add To cart
//                   </button>
//                 </div>
//               </section>
//             );
//           })}
//         </Carousel>
//       </section>
//     </div>
//   );
// }
