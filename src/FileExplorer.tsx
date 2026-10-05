import * as React from "react";

interface FileData {
    name: string;
    directory: boolean;
}

interface DirectoryData extends FileData {
    children: (FileData | DirectoryData)[];
}

const FileNode : React.FC<{ file: FileData }> = ({ file }) => {
    return <button>{file.name}</button>;
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

