const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const PizzaSchema = new Schema(
  {
    pizzaName: {
      type: String,
      required: "You need to provide a pizza name!",
      trim: true,
    },
    createdBy: {
      type: String,
      required: true,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal), // uses utils fate format function to adjust format before going to controllers
    },
    size: {
      type: String,
      required: true,
      enum: ["Personal", "Small", "Medium", "Large", "Extra Large"], // "Enumerable": Data set - only allows one of the items in the array to be selected/passed
      default: "Large",
    },
    toppings: [],
    comments: [
      {
        type: Schema.Types.ObjectId, //expect an object id from comments
        ref: "Comment",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true, // enable "getters" (for date format in this case)
    },
    id: false,
  }
);

// get total count of comments and replies on retrieval

// tally up the total of every comment with its replies. Takes (2) parameters an accumulator and a current value. Accumulator = total, currentvalue = comment. Lesson 3.4
PizzaSchema.virtual("commentCount").get(function () {
  return this.comments.reduce(
    (total, comment) => total + comment.replies.length + 1,
    0
  );
});

// create the Pizza model using the PizzaSchema
const Pizza = model("Pizza", PizzaSchema);

// export the Pizza model
module.exports = Pizza;
