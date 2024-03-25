const ActiveAssetInfo = ({ title, info }) => {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-sm underline">{title}</p>
      <h1 className="text-lg">{info}</h1>
    </div>
  );
};

export default ActiveAssetInfo;
