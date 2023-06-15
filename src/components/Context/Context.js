import React, { createContext, useState } from 'react';

export const GlobalContext = createContext();

const MainContext = ({ children }) => {
  const [backdropOpen, setOpen] = useState(false);
  const [blogDetail, setBlogDetail] = useState([])
  const [blogsToShow, setBlogsToShow] = useState(0);
  const [productBlog, setProductBlog] = useState(null)
  const [faqDisplay, setDisplay] = useState("one");

  const faqDisplayChangeFunc = (view) => {
    setDisplay(view);
  }
  return (
    <GlobalContext.Provider
      value={{
        blogDetail,
        setBlogDetail,
        blogsToShow,
        setBlogsToShow,
        productBlog,
        setProductBlog,
        faqDisplay,
        faqDisplayChangeFunc,
        backdropOpen,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export default MainContext