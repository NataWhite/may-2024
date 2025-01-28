import { extname } from 'path';

export const PATH_TO_IMAGE = '/upload';

export const editFileName = (req, file, callback) => {
    const fileExtName = extname(file.originalname);
    const randomName = Array(16)
        .fill(null)
        .map(() => Math.round(Math.random() * 10).toString(10))
        .join('');
    callback(null, `${randomName}${fileExtName}`);
}