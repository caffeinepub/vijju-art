import Map "mo:core/Map";
import Nat "mo:core/Nat";

module {
  type GalleryItem = {
    id : Nat;
    title : Text;
    category : Category;
    description : Text;
    imageUrl : Text;
  };

  type Category = {
    #pencilSketch;
    #portraitArt;
    #customOrders;
  };

  type ContactSubmission = {
    name : Text;
    email : Text;
    message : Text;
    timestamp : Int;
  };

  type OldActor = {
    contactSubmissions : Map.Map<Nat, ContactSubmission>;
    nextGalleryId : Nat;
    gallery : Map.Map<Nat, GalleryItem>;
    nextSubmissionId : Nat;
  };

  type NewActor = {
    contactSubmissions : Map.Map<Nat, ContactSubmission>;
    nextGalleryId : Nat;
    gallery : Map.Map<Nat, GalleryItem>;
    nextSubmissionId : Nat;
    owner : ?Principal;
  };

  public func run(old : OldActor) : NewActor {
    { old with owner = null };
  };
};
