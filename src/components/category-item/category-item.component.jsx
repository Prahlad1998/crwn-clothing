import './category-item.styles.scss';

const CategoryItem=({category})=>{
    const {imageUrl,title,id}=category;
    return( 
        <div key={id} className="category-container">
        <div className="background-image" style={{
          backgroundImage:`url(${imageUrl})`
          //React allow us to add extra style property through passing as a object with the specific style property
        }}/>
          <div className="category-body-container">
            <h2>{title}</h2>
            <p>Shop Now</p>
          </div>
        </div>
    );

}

export default CategoryItem;