import { Test, TestingModule } from '@nestjs/testing';
import { disconnect, Types } from 'mongoose';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { CreateReviewDto } from 'src/reviews/dto/create-review.dto';
import { AppModule } from '../src/app.module';
import { REVIEW_NOT_FOUND } from '../src/reviews/review.constants';

const productId = new Types.ObjectId().toHexString();

const testDto: CreateReviewDto = {
	name: 'test',
	title: 'title',
	description: 'description',
	rating: 5,
	productId
};

describe('ReviewsService', () => {
	let app: INestApplication;
	let createdId: string;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [AppModule]
		}).compile();

		app = module.createNestApplication();
		await app.init();
	});

	it('/reviews/create (POST) - success', async () => {
		return request(app.getHttpServer())
			.post('/reviews/create')
			.send(testDto)
			.expect(201)
			.then(({ body }: request.Response) => {
				createdId = body._id;
				expect(createdId).toBeDefined();
			})
	});

	it('/reviews/create (POST) - fail', async () => {
		return request(app.getHttpServer())
			.post('/reviews/create')
			.send({ ...testDto, rating: 0 })
			.expect(400)
			.then(({ body }: request.Response) => {
				console.log(body);
			})
	});

	it('/reviews/byProduct/:productId (GET)', async () => {
		return request(app.getHttpServer())
			.get('/reviews/byProduct/' + createdId)
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body.length);
			})
	});

	it('/reviews/:id (DELETE)', () => {
		return request(app.getHttpServer())
			.delete('/reviews/' + createdId)
			.expect(200);
	});

	it('/reviews/:id (DELETE) - fail', () => {
		return request(app.getHttpServer())
			.delete('/reviews/' + new Types.ObjectId().toHexString())
			.expect(404, {
				statusCode: 404,
				message: REVIEW_NOT_FOUND
			});
	});

	afterAll(() => {
		disconnect();
	})
});
