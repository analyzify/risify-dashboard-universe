
import React from "react";
import CollectionTree from "@/components/catalog/CollectionTree";
import { TreeItem } from "react-sortable-tree";

interface CollectionsContainerProps {
  treeData: TreeItem[];
  setTreeData: (data: TreeItem[]) => void;
  searchString: string;
  treeReady: boolean;
  isMounted: React.MutableRefObject<boolean>;
  onRename: (path: number[], title: string) => void;
  onAddChild: (path: number[]) => void;
  onDelete: (path: number[]) => void;
}

const CollectionsContainer: React.FC<CollectionsContainerProps> = ({
  treeData,
  setTreeData,
  searchString,
  treeReady,
  isMounted,
  onRename,
  onAddChild,
  onDelete
}) => {
  return (
    <div className="border rounded-md p-4 min-h-[500px] bg-white shadow-sm">
      <CollectionTree
        treeData={treeData}
        setTreeData={setTreeData}
        searchString={searchString}
        treeReady={treeReady}
        isMounted={isMounted}
        onRename={onRename}
        onAddChild={onAddChild}
        onDelete={onDelete}
      />
    </div>
  );
};

export default CollectionsContainer;
