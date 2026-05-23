
const MovieDetailsSkeleton = () => {
  return (
    <div className="flex flex-col flex-1 gap-[48px]">
      <div className="relative w-full h-[700px] bg-gray-900 animate-pulse rounded-[8px] overflow-hidden px-[64px]">
        <div className="absolute left-[50px] bottom-[48px] z-10 flex justify-start  items-start gap-[32px] w-full">
          <div className="min-w-[288px] min-h-[288px] rounded-[8px] pb-[48px] bg-gray-800"></div>
          <div className="w-[50%] h-auto flex flex-col gap-[12px] min-h-[288px] rounded-[8px] mt-[48px] bg-red-">
            <div className="flex items-center gap-[12px]">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="w-[80px] h-[26px] flex justify-center items-center px-[12px] py-[4px] 
                  bg-gray-800
                  rounded-full"
                />
              ))}
            </div>

            <div className="w-[200px] min-h-[20px] bg-gray-800 rounded-[8px]" />
            <div className="w-[400px] min-h-[20px] bg-gray-800 rounded-[8px]" />
            <div className="w-[400px] min-h-[20px] bg-gray-800 rounded-[8px]" />

            <div className="flex items-center gap-[8px]">
              {Array.from({ length: 3 }).map((_, index) => (
                <>
                  <div
                    key={index}
                    className="w-[80px] h-[26px] flex justify-center items-center px-[12px] py-[4px] 
                  bg-gray-800
                  rounded-full"
                  />
                  <div className="min-w-[2px] h-[20px] bg-gray-800" />
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsSkeleton;
