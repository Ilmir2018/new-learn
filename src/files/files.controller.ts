import { Controller, HttpCode, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { FileResponseElement } from './dto/file-element.responce';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {

	constructor(private readonly filesService: FilesService) { }

	@Post('upload')
	@HttpCode(200)
	@UseGuards(JwtAuthGuard)
	@UseInterceptors(FileInterceptor('file'))
	async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<FileResponseElement[]> {
		return await this.filesService.uploadFile([file]);
	}
}
