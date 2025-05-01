'use client';
import { Rating as ReactRating } from 'react-simple-star-rating';

type MyRatingProps = {
  rating: number;
  readonly?: boolean;
  iconsCount?: number;
  starClasses?: string;
  allowFraction?: boolean;
  setRating?: (rate: number) => void;
};

const MyRating = ({
  rating = 0,
  setRating,
  readonly,
  starClasses,
  iconsCount = 5,
  allowFraction = true,
}: MyRatingProps) => {
  const handleRating = (rate: number) => (setRating ? setRating(rate) : null);

  return (
    <ReactRating
      transition
      readonly={readonly}
      initialValue={rating}
      onClick={handleRating}
      iconsCount={iconsCount}
      allowFraction={allowFraction}
      SVGclassName={`w-4 h-4 inline ${starClasses}`} /* Optional */
    />
  );
};

export default MyRating;
