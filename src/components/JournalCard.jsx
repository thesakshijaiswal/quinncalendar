import StarRating from "./StarRating";
import { formatDateForDisplay } from "../utils/dateUtils";

const JournalCard = ({ entry, type = "main", onClick, style, className }) => {
  const renderMainCard = () => (
    <div className="relative h-full w-full overflow-hidden rounded-3xl bg-white shadow-2xl">
      <div className="relative h-3/5 overflow-hidden">
        <img
          src={entry.imgUrl}
          alt="Current journal entry"
          className="h-full w-full object-cover object-top"
          loading="lazy"
        />
        <div className="absolute bottom-4 left-4 rounded-full bg-black/70 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
          {formatDateForDisplay(entry.date)}
        </div>
      </div>
      <div className="flex h-2/5 flex-col items-center justify-center p-2">
        <div className="mb-4 flex items-center justify-center space-x-3">
          <StarRating rating={entry.rating} size="w-4 h-4 sm:w-6 sm:h-6 " />
          <span className="text-lg font-semibold text-gray-800">
            {entry.rating}
          </span>
        </div>
        <div className="mb-4 flex flex-wrap justify-center gap-2">
          {entry.categories.slice(0, 3).map((category, categoryIndex) => (
            <span
              key={categoryIndex}
              className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-600"
            >
              {category}
            </span>
          ))}
          {entry.categories.length > 3 && (
            <span className="rounded-full bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-600">
              +{entry.categories.length - 3}
            </span>
          )}
        </div>
        <div className="line-clamp-3 text-center text-sm leading-relaxed text-gray-600">
          {entry.description}
        </div>
        <div>
          <button className="mt-4 bg-indigo-500 px-5 py-1 text-center text-white">
            View Full Post
          </button>
        </div>
      </div>
    </div>
  );

  const renderSideCard = () => (
    <div className="relative h-full w-full overflow-hidden rounded-3xl bg-white shadow-xl">
      <div className="relative h-3/5 overflow-hidden">
        <img
          src={entry.imgUrl}
          alt={`${type === "previous" ? "Previous" : "Next"} journal entry`}
          className="h-full w-full object-cover object-top"
          loading="lazy"
        />
      </div>
      <div className="flex h-2/5 flex-col items-center justify-center p-4">
        <div className="line-clamp-4 text-center text-sm text-gray-600">
          {entry.description}
        </div>
        <div>
          <button className="mt-4 bg-indigo-500 px-5 py-1 text-center text-white">
            View Full Post
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className={className} style={style} onClick={onClick}>
      {type === "main" ? renderMainCard() : renderSideCard()}
    </div>
  );
};

export default JournalCard;
