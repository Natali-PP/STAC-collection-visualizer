import { formatDate } from "@/utils";
import useCollectionStore from "@/store/collectionsStore";

const CollectionItemCard = ({ obj, key }) => {
  const toggleShowAsset = useCollectionStore((store) => store.toggleShowAsset);
  const updateActiveCollection = useCollectionStore(
    (store) => store.updateActiveCollection
  );
  const handleItemClick = (obj) => {
    updateActiveCollection(obj);
    toggleShowAsset(true);
  };
  return (
    <div
      className="p-4 border-slate-200 border-2 rounded hover:bg-slate-100 hover:cursor-pointer "
      onClick={() => handleItemClick(obj)}
      key={key}
    >
      <p className="text-lg">{obj.id}</p>
      <div className="flex flex-row items-center justify-between">
        <p>Created</p>
        <p>{formatDate(obj.properties.created)}</p>
      </div>
      <div className="flex flex-row items-center justify-between">
        <p>Datetime</p>
        <p>{formatDate(obj.properties.datetime)}</p>
      </div>
      <div className="flex flex-row items-center justify-between">
        <p>Assets</p>
        <p>{Object.keys(obj.assets).length}</p>
      </div>
      <p></p>
    </div>
  );
};

export default CollectionItemCard;
