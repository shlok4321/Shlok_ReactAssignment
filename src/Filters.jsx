import { Button, Checkbox } from "antd";

export default function Filters(props) {
  const { categories, setFilters, filters, clearFilter } = props;
  const checkCategory = (item) => {
    if (filters["category"] && filters["category"].includes(item)) {
      const updateCat = filters["category"].filter((cat) => cat != item);
      let updateFilter = { ...filters };
      if (updateCat.length == 0) delete updateFilter.category;
      else updateFilter = { ...filters, category: updateCat };
      setFilters(updateFilter);
    } else {
      const data = filters["category"] || [];
      data.push(item);
      const updateFilter = { ...filters, category: data };
      setFilters(updateFilter);
    }
  };

  const checkRating = (item) => {
    let updateFilter = { ...filters };
    if (filters["rating"] && filters["rating"] == item) {
      delete updateFilter.rating;
    } else updateFilter = { ...filters, rating: item };
    setFilters(updateFilter);
  };

  const checkPricing = (item) => {
    let updateFilter = { ...filters };
    if (filters["pricing"] && filters["pricing"] == item) {
      delete updateFilter.pricing;
    } else updateFilter = { ...filters, pricing: item };
    setFilters(updateFilter);
  };

  return (
    <div>
      <h5>All Categories</h5>
      <div className="filter-flex">
        {categories.map((item, index) => {
          return (
            <Checkbox
              onChange={() => checkCategory(item)}
              key={index}
              checked={filters?.category?.includes(item)}
            >
              {item}
            </Checkbox>
          );
        })}
      </div>

      <h5>Pricing</h5>
      <div className="filter-flex">
        {["0-100", "100-200", "200-300", "300-500", "500-1000"].map(
          (item, index) => {
            return (
              <Checkbox
                onChange={() => checkPricing(item)}
                key={index}
                checked={filters?.pricing == item}
              >
                $ {item}
              </Checkbox>
            );
          }
        )}
      </div>

      <h5>Rating</h5>
      <div className="filter-flex">
        {[1, 2, 3, 4, 5].map((item, index) => {
          return (
            <Checkbox
              onChange={() => checkRating(item)}
              key={index}
              checked={filters?.rating == item}
            >
              {item}
            </Checkbox>
          );
        })}
      </div>

      <Button onClick={clearFilter}>Clear Filters</Button>
    </div>
  );
}
