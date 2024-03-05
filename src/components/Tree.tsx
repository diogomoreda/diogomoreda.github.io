import TreeBranch from "./TreeBranch";

interface TreeData {
    type: 0 | 1;
    id: string;
    name: string;
    extension?: string;
    created: string;
    modified: string;
    hidden: boolean;
    disabled: boolean;
    selected: boolean;
    highlighted: boolean;
    open: boolean;
    edit: boolean;
    parent?: string;
    children: string[]
}

interface Props {
    treeData: TreeData[] | undefined | null;
}

export default function Tree(props:Props): JSX.Element {

    return (
        <div className="tree">

        </div>
    )
}