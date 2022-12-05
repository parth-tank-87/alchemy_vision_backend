import { Get, Route, Tags,  Post, Body, Path } from "tsoa";
import { getFeature, getFeatures, createFeature, IFeaturePayload } from "../repositories/features.repository";
import { getRepository, Repository } from "typeorm";
import { Features } from '../models';
@Route("features")
@Tags("Features")
export default class FeaturesController {

  protected _repository: Repository<Features>;

  constructor() {
    this._repository = getRepository(Features);
  }

  @Get("/")
  public async getFeatures(): Promise<Array<Features>> {
    return getFeatures(this._repository);
  }

  @Get("/:id")
  public async getFeature(@Path() id: string): Promise<Features | null> {
    return getFeature(this._repository, Number(id));
  }

  @Post("/")
  public async createFeature(@Body() body: IFeaturePayload): Promise<Features> {
    return createFeature(this._repository, body);
  }
}