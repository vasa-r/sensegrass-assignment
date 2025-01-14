import BG from "../../assets/product-bg.png";
import Hero from "../../assets/Hero.jpeg";
const Product = () => {
  return (
    <section
      className="relative w-full bg-center bg-cover h-[260px] md:h-[540px]"
      style={{ backgroundImage: `url(${BG})` }}
    >
      <img
        src={Hero}
        alt="bg image"
        className="h-[250px] md:h-[530px] w-full"
      />
    </section>
  );
};

export default Product;
