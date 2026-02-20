import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Segment {
    x: bigint;
    y: bigint;
}
export interface backendInterface {
    getNumberOfUsers(): Promise<bigint>;
    getSnakeSegments(): Promise<Array<Segment>>;
    registerUser(username: string): Promise<void>;
}
