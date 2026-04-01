import List "mo:core/List";
import Time "mo:core/Time";

actor {
  type BookingForm = {
    name : Text;
    phone : Text;
    checkIn : Text;
    checkOut : Text;
    message : Text;
    submittedAt : Time.Time;
  };

  let bookingForms = List.empty<BookingForm>();

  public shared ({ caller }) func submitBooking(form : BookingForm) : async () {
    let newForm : BookingForm = {
      form with
      submittedAt = Time.now();
    };
    bookingForms.add(newForm);
  };

  public query ({ caller }) func getAllBookings() : async [BookingForm] {
    bookingForms.toArray();
  };
};
