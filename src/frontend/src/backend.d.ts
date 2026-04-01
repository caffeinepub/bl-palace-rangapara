import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface BookingForm {
    checkIn: string;
    name: string;
    submittedAt: Time;
    message: string;
    checkOut: string;
    phone: string;
}
export type Time = bigint;
export interface backendInterface {
    getAllBookings(): Promise<Array<BookingForm>>;
    submitBooking(form: BookingForm): Promise<void>;
}
