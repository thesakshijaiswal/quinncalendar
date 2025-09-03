import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const StarRating = ({ rating, maxStars = 5 }) => {
  const normalizedRating = Math.max(0, Math.min(maxStars, rating || 0));

  const fullStars = Math.floor(normalizedRating);
  const hasHalfStar = normalizedRating % 1 !== 0;
  const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0);

  const responsiveSize = "w-1.5 h-1.5 sm:w-3 sm:h-3 md:w-4 md:h-4";

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: fullStars }, (_, index) => (
        <FaStar
          key={`full-${index}`}
          className={`${responsiveSize} text-indigo-500`}
        />
      ))}

      {hasHalfStar && (
        <FaStarHalfAlt className={`${responsiveSize} text-indigo-500`} />
      )}

      {Array.from({ length: emptyStars }, (_, index) => (
        <FaRegStar
          key={`empty-${index}`}
          className={`${responsiveSize} text-indigo-500`}
        />
      ))}
    </div>
  );
};

export default StarRating;
