import { useContext, useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import { CategoriesContext } from "../../context/categories.context";
import ProductCard from "../../components/product-card/product-card.component";
import "./category.styles.scss";

const Category = () => {
  const { category} = useParams();
  const { CategoriesMap } = useContext(CategoriesContext);
  const [products, setproducts] = useState(CategoriesMap[category]);

  useEffect(() => {
    setproducts(CategoriesMap[category]);
  }, [category, CategoriesMap]);
  return (
    <Fragment>
      <h2 className="category-title">{category.toUpperCase()}</h2>
      <div className="category-container">
        {
          //put safegaurd
          products &&
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
        }
      </div>
    </Fragment>
  );
};

export default Category;
