import { TreeItem, addNodeUnderParent, removeNodeAtPath, changeNodeAtPath } from "react-sortable-tree";

// Function to get a node at a specific path
export const getNodeAtPath = (data: TreeItem[], path: number[]) => {
  let currentNode = null;
  let currentTreeData = data;
  
  for (let i = 0; i < path.length; i++) {
    const index = path[i];
    currentNode = currentTreeData[index];
    if (currentNode && currentNode.children) {
      currentTreeData = currentNode.children;
    }
  }
  
  return { node: currentNode, treeData: currentTreeData };
};

// Export collections as JSON
export const exportCollections = (treeData: TreeItem[], onSuccess: () => void) => {
  const dataStr = JSON.stringify(treeData, null, 2);
  const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
  
  const exportFileDefaultName = 'collections.json';
  
  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
  
  onSuccess();
};

// Add a collection
export const addCollection = (treeData: TreeItem[], newNodeName: string, selectedNodePath: number[]) => {
  // If no selected node, add to root
  if (selectedNodePath.length === 0) {
    return [
      ...treeData,
      { title: newNodeName, children: [] }
    ];
  } else {
    // Otherwise add as a child to the selected node
    const { treeData: newTree } = addNodeUnderParent({
      treeData,
      parentKey: selectedNodePath[selectedNodePath.length - 1],
      expandParent: true,
      getNodeKey: ({ treeIndex }) => treeIndex,
      newNode: { title: newNodeName, children: [] }
    });
    return newTree;
  }
};

// Rename a collection
export const renameCollection = (treeData: TreeItem[], selectedNodePath: number[], renamedValue: string) => {
  return changeNodeAtPath({
    treeData,
    path: selectedNodePath,
    getNodeKey: ({ treeIndex }) => treeIndex,
    newNode: { 
      ...getNodeAtPath(treeData, selectedNodePath).node,
      title: renamedValue 
    }
  });
};

// Delete a collection
export const deleteCollection = (treeData: TreeItem[], path: number[]) => {
  return removeNodeAtPath({
    treeData,
    path,
    getNodeKey: ({ treeIndex }) => treeIndex
  });
};
