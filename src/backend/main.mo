import Time "mo:core/Time";
import Map "mo:core/Map";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import Text "mo:core/Text";
import Order "mo:core/Order";
import Principal "mo:core/Principal";
import Migration "migration";

(with migration = Migration.run)
actor {
  public type GalleryItem = {
    id : Nat;
    title : Text;
    category : Category;
    description : Text;
    imageUrl : Text;
  };

  public type Category = {
    #pencilSketch;
    #portraitArt;
    #customOrders;
  };

  module Category {
    public func compare(cat1 : Category, cat2 : Category) : Order.Order {
      switch (cat1, cat2) {
        case (#pencilSketch, #pencilSketch) { #equal };
        case (#portraitArt, #portraitArt) { #equal };
        case (#customOrders, #customOrders) { #equal };
        case (#pencilSketch, _) { #less };
        case (#portraitArt, #customOrders) { #less };
        case (_, _) { #greater };
      };
    };
  };

  module GalleryItem {
    public func compareByCategory(item1 : GalleryItem, item2 : GalleryItem) : Order.Order {
      switch (Category.compare(item1.category, item2.category)) {
        case (#equal) { Text.compare(item1.title, item2.title) };
        case (order) { order };
      };
    };
  };

  public type ContactSubmission = {
    name : Text;
    email : Text;
    message : Text;
    timestamp : Time.Time;
  };

  var owner : ?Principal = null;
  let gallery = Map.empty<Nat, GalleryItem>();
  var nextGalleryId = 1;

  let contactSubmissions = Map.empty<Nat, ContactSubmission>();
  var nextSubmissionId = 1;

  public shared ({ caller }) func claimOwner() : async Text {
    switch (owner) {
      case (null) {
        owner := ?caller;
        "You are now the owner!";
      };
      case (_) { Runtime.trap("Owner already set.") };
    };
  };

  public query ({ caller }) func getOwner() : async Text {
    switch (owner) {
      case (null) { "No owner set yet." };
      case (?principal) { principal.toText() };
    };
  };

  public shared ({ caller }) func submitContactForm(name : Text, email : Text, message : Text) : async () {
    let submission : ContactSubmission = {
      name;
      email;
      message;
      timestamp = Time.now();
    };
    contactSubmissions.add(nextSubmissionId, submission);
    nextSubmissionId += 1;
  };

  public shared ({ caller }) func getAllContactSubmissions() : async [ContactSubmission] {
    switch (owner) {
      case (null) { Runtime.trap("Unauthorized: only the owner can access this.") };
      case (?_owner) { assertEqualPrincipals(caller, _owner) };
    };
    contactSubmissions.values().toArray();
  };

  public shared ({ caller }) func addGalleryItem(title : Text, category : Category, description : Text, imageUrl : Text) : async () {
    let item : GalleryItem = {
      id = nextGalleryId;
      title;
      category;
      description;
      imageUrl;
    };
    gallery.add(nextGalleryId, item);
    nextGalleryId += 1;
  };

  public query ({ caller }) func getAllGalleryItems() : async [GalleryItem] {
    gallery.values().toArray().sort(GalleryItem.compareByCategory);
  };

  public query ({ caller }) func getGalleryItemsByCategory(category : Category) : async [GalleryItem] {
    gallery.values().toArray().filter(
      func(item) {
        item.category == category;
      }
    );
  };

  public shared ({ caller }) func seedInitialGalleryItems() : async () {
    if (gallery.isEmpty()) {
      let initialItems : [GalleryItem] = [
        {
          id = nextGalleryId;
          title = "Charcoal Pencil Portrait";
          category = #pencilSketch;
          description = "Realistic portrait using charcoal pencils.";
          imageUrl = "url1";
        },
        {
          id = nextGalleryId + 1;
          title = "Family Portrait";
          category = #portraitArt;
          description = "Custom family portrait artwork.";
          imageUrl = "url2";
        },
        {
          id = nextGalleryId + 2;
          title = "Pet Sketch";
          category = #customOrders;
          description = "Custom pet sketch order.";
          imageUrl = "url3";
        },
        {
          id = nextGalleryId + 3;
          title = "Celebrity Sketch";
          category = #pencilSketch;
          description = "Portrait of a famous celebrity.";
          imageUrl = "url4";
        },
        {
          id = nextGalleryId + 4;
          title = "Wedding Portrait";
          category = #portraitArt;
          description = "Wedding portrait artwork.";
          imageUrl = "url5";
        },
        {
          id = nextGalleryId + 5;
          title = "House Sketch";
          category = #customOrders;
          description = "Custom house sketch order.";
          imageUrl = "url6";
        },
      ];

      for (item in initialItems.values()) {
        gallery.add(item.id, item);
      };

      nextGalleryId += initialItems.size();
    } else {
      Runtime.trap("Gallery already seeded!");
    };
  };

  func assertEqualPrincipals(p1 : Principal, p2 : Principal) {
    if (p1.toText() != p2.toText()) {
      Runtime.trap("Unauthorized: only the owner can access this.");
    };
  };
};
