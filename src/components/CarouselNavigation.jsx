import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";

const CarouselNavigation = ({ activeIndex, total, onChange }) => {
  return (
    <div className="mt-6 flex items-center justify-center gap-6">
      <button
        onClick={() => onChange(activeIndex - 1)}
        disabled={activeIndex === 0}
        className="rounded-full border border-white/20 bg-black/30 p-3 text-white transition-colors hover:bg-black/50 focus:outline-none disabled:cursor-not-allowed disabled:opacity-30"
      >
        <MdOutlineKeyboardArrowLeft size={35} />
      </button>

      <div className="flex items-center gap-2 rounded-full bg-black/30 px-4 py-2 backdrop-blur-sm">
        {Array.from({ length: total }).map((_, index) => (
          <button
            key={index}
            onClick={() => onChange(index)}
            className={`rounded-full transition-all duration-300 focus:outline-none ${
              activeIndex === index
                ? "h-2 w-8 bg-white"
                : "h-2 w-2 bg-white/50 hover:bg-white/75"
            }`}
          />
        ))}
      </div>

      <button
        onClick={() => onChange(activeIndex + 1)}
        disabled={activeIndex === total - 1}
        className="rounded-full border border-white/20 bg-black/30 p-3 text-white transition-colors hover:bg-black/50 focus:outline-none disabled:cursor-not-allowed disabled:opacity-30"
      >
        <MdOutlineKeyboardArrowRight size={35} />
      </button>
    </div>
  );
};

export default CarouselNavigation;
