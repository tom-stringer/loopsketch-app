import React, { FunctionComponent, useState } from "react";
import FileTransformer from "../../transformers/FileTransformer";

const headers = new Headers();
headers.append("Content-Type", "multipart/form-data");

const TestFileUploadForm: FunctionComponent = () => {
    const [file, setFile] = useState<File>();

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        if (file) {
            fetch("/api/tracks/audio", {
                method: "POST",
                body: FileTransformer.toFormData(file),
            });
        }
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const files = event.target.files;

        if (files) {
            setFile(files[0]);
        }
    }

    return (
        <form onSubmit={(event) => handleSubmit(event)}>
            <input type="file" onChange={(event) => handleChange(event)} />
            <button type="submit">Hello</button>
        </form>
    );
};

export default TestFileUploadForm;
