import { reviewsData } from "../../utils/constants";

const Reviews = () => {
  const { heading, subHead, reviews } = reviewsData;
  return (
    <div className="flex flex-col items-center w-full gap-4">
      <div className="flex flex-col items-center">
        <h1 className="text-[32px] font-medium md:text-hero md:font-semibold text-center">
          {heading}
        </h1>
        <p className="text-center md:text-2xl text-subHead">{subHead}</p>
      </div>

      <div className="grid w-full h-auto grid-cols-1 gap-4 md:grid-cols-4">
        {reviews.map(({ userImage, username, id, name, review }) => (
          <div
            key={id}
            className="flex flex-col gap-3 p-3 rounded-lg bg-reviewCard"
          >
            <div className="flex items-center gap-3">
              <img
                src={userImage}
                alt={name}
                className="size-[54px] rounded-full"
              />
              <div className="flex flex-col">
                <h3 className="text-lg">{name}</h3>
                <p className="text-sm text-subHead">{username}</p>
              </div>
            </div>
            <p className="text-lg font-extralight">{review}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
