import * as React from "react";

interface FileData {
    name: string;
    directory: boolean;
}

interface DirectoryData extends FileData {
    children: (FileData | DirectoryData)[];
}

const FileNode : React.FC<{ file: FileData }> = ({ file }) => {
    const [renaming, setRenaming] = React.useState<boolean>(false);
    const [updatedName, setUpdatedName] = React.useState<string>(file.name);
    return renaming ? (
        <>
            <input value={updatedName} onChange={e => setUpdatedName(e.target.value)} onSubmit={_ => {
                file.name = updatedName;
                setRenaming(false)
            }}/>
            <button onClick={_ => {
                file.name = updatedName;
                setRenaming(false);
            }}>Save</button>
            <button onClick={_ => {
                setUpdatedName(file.name);
                setRenaming(false);
            }}>Cancel</button>
        </>
    ) : (
        <button onClick={_ => setRenaming(!renaming)}>{file.name}</button>
    );
};

const DirectoryNode : React.FC<{ directory: DirectoryData }> = ({ directory }) => {
    const [expanded, setExpanded] = React.useState(false);

    return (
        <>
            <button onClick={_ => setExpanded(!expanded)}>{directory.name} {expanded ? '-' : '+'}</button>
            {expanded ? (
                <ul>{
                    directory.children.map(file =>
                        <li>{file.directory ? <DirectoryNode directory={file as DirectoryData}/> : <FileNode file={file}/>}</li>
                    )
                }</ul>
            ) : <></>}
        </>
    );
}

export const FileExplorer : React.FC<{ files: (FileData | DirectoryData)[] }> = ({ files }) =>
    (<ul>
        {
            files.map(file =>
                <li>{file.directory ? <DirectoryNode directory={file as DirectoryData}/> : <FileNode file={file}/>}</li>
            )
        }
    </ul>);

