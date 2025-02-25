export const Note = ({
  title,
  content,
}: {
  title: string;
  content: string;
}) => {
  return (
    <div className="relative bg-yellow-100 border rounded-lg p-4 shadow-lg w-full">
      {/* Pin at the top */}
      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-red-500 rounded-full border-2 border-black" />
      <p className="text-black text-base font-chalk">{content}</p>
    </div>
  );
};
