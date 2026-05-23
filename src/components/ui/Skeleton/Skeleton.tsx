const Skeleton = ({
  className = " w-full h-[20px] ",
}: {
  className: string;
}) => {
  return (
    <div
      className={`
        rounded-[8px]
        animate-pulse
     bg-gray-800
        ${className}
      `}
    />
  );
};

export default Skeleton;
