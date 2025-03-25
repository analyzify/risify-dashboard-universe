
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface RenameDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  renamedValue: string;
  setRenamedValue: (value: string) => void;
  onRename: () => void;
}

export const RenameDialog: React.FC<RenameDialogProps> = ({
  isOpen,
  onOpenChange,
  renamedValue,
  setRenamedValue,
  onRename,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename Collection</DialogTitle>
          <DialogDescription>
            Enter a new name for this collection.
          </DialogDescription>
        </DialogHeader>
        <Input 
          value={renamedValue}
          onChange={(e) => setRenamedValue(e.target.value)}
          placeholder="Collection name"
          className="mt-4"
        />
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onRename}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

interface AddDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  newNodeName: string;
  setNewNodeName: (value: string) => void;
  onAdd: () => void;
}

export const AddDialog: React.FC<AddDialogProps> = ({
  isOpen,
  onOpenChange,
  newNodeName,
  setNewNodeName,
  onAdd,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Collection</DialogTitle>
          <DialogDescription>
            Enter a name for the new collection.
          </DialogDescription>
        </DialogHeader>
        <Input 
          value={newNodeName}
          onChange={(e) => setNewNodeName(e.target.value)}
          placeholder="Collection name"
          className="mt-4"
        />
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onAdd}>
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
