import { Get, Route, Tags,  Post, Body, Path } from "tsoa";
import { getComments, ICommentPayload, createComment, getComment } from "../repositories/comment.repository";
import { Comment } from '../models';

@Route("comments")
@Tags("Comment")
export default class CommentController {
  @Get("/")
  public async getComments(): Promise<Array<Comment>> {
    return getComments()
  }

  @Post("/")
  public async createComment(@Body() body: ICommentPayload): Promise<Comment> {
    return createComment(body)
  }

  @Get("/:id")
  public async getComment(@Path() id: string): Promise<Comment | null> {
    return getComment(Number(id))
  }
}