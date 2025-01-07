// Абстракная сущность, которая содержится в любой табличке
export interface IEntity {
    id: number;
    createdAt: Date;
    updatedAt: Date;
}