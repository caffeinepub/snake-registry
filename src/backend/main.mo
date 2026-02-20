import List "mo:core/List";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";

actor {
  type User = {
    id : Principal;
    username : Text;
  };

  type Segment = {
    x : Int;
    y : Int;
  };

  let users = List.empty<User>();
  let snake = List.empty<Segment>();
  var currentDirection : Text = "right";
  let gridSize = 20;

  public shared ({ caller }) func registerUser(username : Text) : async () {
    for (user in users.values()) {
      if (user.id == caller) {
        Runtime.trap("User already registered");
      };
    };
    let newUser : User = {
      id = caller;
      username;
    };
    users.add(newUser);
    addSnakeSegment();
  };

  func addSnakeSegment() {
    let newSegment : Segment = {
      x = 0;
      y = 0;
    };
    snake.add(newSegment);
  };

  public query ({ caller }) func getSnakeSegments() : async [Segment] {
    snake.toArray();
  };

  public query ({ caller }) func getNumberOfUsers() : async Nat {
    users.size();
  };
};
