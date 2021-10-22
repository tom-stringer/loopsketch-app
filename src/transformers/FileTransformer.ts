export default class FileTransformer {
    static toFormData = (file: File): FormData => {
        const formData = new FormData();
        formData.append("file", file);
        return formData;
    };
}
