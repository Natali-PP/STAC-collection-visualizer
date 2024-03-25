import { motion } from "framer-motion";
import useCollectionStore from "@/store/collectionsStore";
import { getTag, getTagStyles, isEmpty } from "@/utils";
import { Check, CircleX, X } from "lucide-react";
import ActiveAssetInfo from "@/components/ActiveAssetInfo/ActiveAssetInfo";

const ActiveAsset = () => {
  const toggleShowAsset = useCollectionStore((store) => store.toggleShowAsset);
  const activeCollection = useCollectionStore(
    (store) => store.activeCollection
  );
  return (
    <motion.div
      className="absolute drop-shadow-2xl shadow-xl top-0 right-0 bg-white border-slate-200 border-2 flex w-1/2 flex-col gap-4 pt-4 pb-12 h-full overflow-auto grow px-6"
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{
        duration: 0.3,
        type: "spring",
        stiffness: 120,
        damping: 20,
      }}
    >
      <button className="ml-auto" onClick={() => toggleShowAsset(false)}>
        <X />
      </button>
      <h1 className="text-2xl">{activeCollection.id}</h1>

      <div className="grid grid-cols-3 gap-4 justify-between">
        <ActiveAssetInfo
          title="Colecction Name"
          info={activeCollection.properties["aac:collection_display_name"]}
        />
        <ActiveAssetInfo
          title="Collection Atribution"
          info={activeCollection.properties["aac:collection_attribution"]}
        />
        <ActiveAssetInfo
          title="Collection family"
          info={
            activeCollection.properties["aac:collection_family_display_name"]
          }
        />
        <ActiveAssetInfo
          title="Item family"
          info={activeCollection.properties["aac:item_family"]}
        />
        <ActiveAssetInfo
          title="Item atribution"
          info={activeCollection.properties["aac:item_attribution"]}
        />
        <ActiveAssetInfo
          title="Constelation"
          info={activeCollection.properties.constellation}
        />
        <ActiveAssetInfo
          title="Licence"
          info={activeCollection.properties.license}
        />
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-sm underline">Providers</p>
        {activeCollection.properties.providers.map((elem) => (
          <a className="text-blue-500 text-xs" key={elem.url} href={elem.url}>
            {elem.attribution}{" "}
          </a>
        ))}
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-sm underline">Links</p>
        <div className="grid grid-cols-3 gap-2 ">
          {activeCollection.links.map((elem) => (
            <a
              href={elem.href}
              key={elem.title}
              className="text-blue-500 text-xs "
            >
              {elem.title}
            </a>
          ))}
        </div>
      </div>

      <h1 className="underline">Assets</h1>
      <div className="gap-2 grid grid-cols-2">
        {Object.keys(activeCollection.assets).map((key) => (
          <div
            key={activeCollection.assets[key].title}
            className="p-4 border-slate-200 border-2 rounded flex flex-col gap-2"
          >
            <p>{activeCollection.assets[key].title}</p>
            <p className="text-sm flex items-center justify-between ">
              Type{" "}
              <span
                className={`p-1 rounded ${getTagStyles(
                  activeCollection.assets[key].type
                )}`}
              >
                {getTag(activeCollection.assets[key].type)}
              </span>
            </p>
            <p className="text-sm flex items-center justify-between ">
              Bundleable
              {activeCollection.assets[key].bundleable ? (
                <Check className="text-sm" width={16} />
              ) : (
                <CircleX width={16} />
              )}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default ActiveAsset;
