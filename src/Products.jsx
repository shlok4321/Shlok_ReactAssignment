import { Button } from "antd";

export default function Products(props) {
  const { products, searchProduct, searchText } = props;
  return (
    <div>
      <div style={{ width: "300px", marginBottom: "10px" }}>
        <input
          type="text"
          value={searchText}
          style={{ width: "inherit", padding: "5px" }}
          placeholder="Search Products"
          onChange={(e) => searchProduct(e.target.value)}
        ></input>
      </div>
      <div className="card-container">
        {products?.length
          ? products.map((product) => {
              return (
                <div className="card" key={product.id}>
                  <img src={product.image} height={100} width={100} />
                  <h3>{product.title}</h3>
                  <p>
                    {product.rating.rate} {`(${product.rating.count})`}
                  </p>
                  <p>{product.category}</p>
                  <p style={{ textWrap: "wrap" }}>{product.description}</p>
                  <h4>$ {product.price}</h4>
                  <div>
                    <Button type="primary">Buy Now</Button>
                    <Button type="secondary">Add to cart</Button>
                  </div>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
}
