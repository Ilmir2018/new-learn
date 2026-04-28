import { Injectable } from '@nestjs/common';
import { path } from 'app-root-path';
import { format } from 'date-fns/format';
import { ensureDir, writeFile } from 'fs-extra';
import { FileResponseElement } from './dto/file-element.responce';
import { MFile } from './mfile-class';
import sharp from 'sharp';

@Injectable()
export class FilesService {

	async uploadFile(files: MFile[]): Promise<FileResponseElement[]> {
		const dateFolder = format(new Date(), 'yyyy-MM-dd');
		const uploadFolder = `${path}/uploads/${dateFolder}`;
		await ensureDir(uploadFolder);
		const res: FileResponseElement[] = [];
		for (const file of files) {
			await writeFile(`${uploadFolder}/${file.originalname}`, file.buffer);
			res.push({
				url: `${dateFolder}/${file.originalname}`,
				name: file.originalname
			});
		}
		return res;
	}

	convertToWebP(file: Buffer): Promise<Buffer> {
		return sharp(file)
			.webp()
			.toBuffer();
	}
}
