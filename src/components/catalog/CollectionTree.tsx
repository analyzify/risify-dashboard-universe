
import React, { useCallback } from "react";
import SortableTree, { TreeItem } from "react-sortable-tree";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import "react-sortable-tree/style.css";
import "@/styles/SortableTree.css";
import ErrorBoundary from "./ErrorBoundary";
import CollectionNode from "./CollectionNode";

interface CollectionTreeProps {
  treeData: TreeItem[];
  setTreeData: (data: TreeItem[]) => void;
  searchString: string;
  treeReady: boolean;
  isMounted: React.MutableRefObject<boolean>;
  onRename: (path: number[], title: string) => void;
  onAddChild: (path: number[]) => void;
  onDelete: (path: number[]) => void;
}

const CollectionTree: React.FC<CollectionTreeProps> = ({
  treeData,
  setTreeData,
  searchString,
  treeReady,
  isMounted,
  onRename,
  onAddChild,
  onDelete,
}) => {
  // Custom node render to add action buttons
  const renderNode = useCallback(({ node, path }: { node: TreeItem, path: number[] }) => {
    return (
      <CollectionNode
        node={node}
        path={path}
        onRename={onRename}
        onAddChild={onAddChild}
        onDelete={onDelete}
      />
    );
  }, [onRename, onAddChild, onDelete]);

  if (!treeReady) {
    return (
      <div className="flex justify-center items-center h-[500px]">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Loading collections...</p>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <DndProvider backend={HTML5Backend}>
        <div style={{ height: 500 }} className="tree-wrapper">
          <SortableTree
            treeData={treeData}
            onChange={setTreeData}
            searchQuery={searchString}
            searchFocusOffset={0}
            searchFinishCallback={(matches) => {
              if (isMounted.current) {
                console.log(`${matches.length} nodes found`);
              }
            }}
            canDrag={true}
            generateNodeProps={({ node, path }) => ({
              title: renderNode({ node, path: path as number[] })
            })}
            style={{ width: '100%' }}
            innerStyle={{ padding: '15px' }}
          />
        </div>
      </DndProvider>
    </ErrorBoundary>
  );
};

export default CollectionTree;
