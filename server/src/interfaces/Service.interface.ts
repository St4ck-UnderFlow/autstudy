export interface Service {
    save(data: any): Promise<void>;
    getAll(): void;
    getById(): void;
    delete(): void;
    update(): void;
}