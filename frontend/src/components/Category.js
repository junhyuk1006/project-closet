export default function Category() {
  return (
    <>
      <div className="flex-w flex-l-m filter-tope-group m-tb-10">
        <button
          className="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5 how-active1"
          data-filter="*"
        >
          All Products
        </button>

        <button
          className="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5"
          data-filter=".women"
        >
          Women
        </button>

        <button
          className="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5"
          data-filter=".men"
        >
          Men
        </button>

        <button
          className="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5"
          data-filter=".bag"
        >
          Bag
        </button>

        <button
          className="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5"
          data-filter=".shoes"
        >
          Shoes
        </button>

        <button
          className="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5"
          data-filter=".watches"
        >
          Watches
        </button>
      </div>
    </>
  );
}
