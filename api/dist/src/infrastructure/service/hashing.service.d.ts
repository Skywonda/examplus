export declare class HashingService {
    hash(data: string): Promise<string>;
    verify(hashedData: string, plainData: string): Promise<boolean>;
}
