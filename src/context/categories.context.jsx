import { createContext, useState, useEffect } from "react";

import { getCategoriesAndDocuments } from "../utills/firebase/firebase.utills.js";

export const CategoriesContext = createContext({
  CategoriesMap: {}, //want to store an array of products
});

export const CategoriesProvider = ({ children }) => {
  const [CategoriesMap, setCategoriesMap] = useState({});

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      setCategoriesMap(categoryMap);  
    };
    getCategoriesMap();
  }, []);
  

  const value = { CategoriesMap };
  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
