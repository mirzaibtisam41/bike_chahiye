import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBrandsApi, serverURL } from '../../common/api'
import { setAllProducts } from '../../redux/reducers/productSlice'
import BrandPoster from '../body/brandPoster/brandPoster'
import MostRelatedProduct from '../body/FeaturedProduct/FeaturedProduct'
import SucessStory from "../sucessStory/index"
import Carousel from './CarouselGallery/Carousel'
import { SearchBar } from './SearchBar/SearchBar'
import TopSeller from './TopSeller/TopSeller'

const Index = () => {
  const dispatch = useDispatch();
  const storeProducts = useSelector((state) => state.products.products);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getBrands();
  }, []);

  const getBrands = async () => {
    setLoading(true);
    const { data } = await axios.get(getBrandsApi);
    if (data) {
      dispatch(setAllProducts(data));
      setLoading(false);
    }
  };

  return (
    <div>
      <Carousel />
      {/* <SearchBar /> */}
      <MostRelatedProduct
        storeProducts={storeProducts}
        serverURL={serverURL}
        loading={loading}
      />
      <TopSeller />
      <SucessStory />
      <BrandPoster />
    </div>
  )
}

export default Index
