export interface TreeItem {
   id: string
   name: string
   parent_id: string | null
}

export interface TreeNode extends TreeItem {
   children: TreeNode[]
}

export interface DragState {
   dragging: boolean
   draggedId: string | null
   overTarget: string | null
   position: 'before' | 'inside' | 'after' | 'root' | null
}
