export class CreateCommentaryDto {
    readonly userId: number;
    readonly videoId: number;
    readonly text: string;
}