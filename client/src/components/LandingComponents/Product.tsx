import BG from "../../assets/product-bg.png";
const Product = () => {
  return (
    <section
      className="relative w-full bg-center bg-cover h-[260px] md:h-[540px]"
      style={{ backgroundImage: `url(${BG})` }}
    >
      {/* <img src={BG} alt="bg image" className="object-contain" /> */}
    </section>
  );
};

export default Product;
