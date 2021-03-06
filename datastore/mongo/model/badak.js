const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    pic_profile: {
      type: String,
    },
    user_phone: {
      type: String,
    },
    user_address: {
      type: String,
    },
    user_type: {
      type: String,
    },
    pic_ktp: {
      type: String,
    },
    num_ktp: {
      type: String,
    },
    address_ktp: {
      type: String,
    },
    pic_npwp: {
      type: String,
    },
    organizer: {
      type: Object({
        organization_name: {
          type: String,
        },
        logo: {
          type: String,
        },
        organization_address: {
          type: String,
        },
        organization_phone: {
          type: String,
        },
      }),
    },
  },
  {
    timestamps: true,
  }
);

// const organizationSchema = new mongoose.Schema({});
const ticketSchema = new mongoose.Schema({
  ticket_name: {
    type: String,
    required: true,
  },
  ticket_desc: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  sales_start: {
    type: Date,
    required: true,
  },
  sales_end: {
    type: Date,
    required: true,
  },
  ticket_status: {
    type: String,
    required: true,
    default: "on sale",
  },
});

const eventSchema = new mongoose.Schema({
  event_id: {
    type: String,
    required: true,
  },
  event_name: {
    type: String,
    required: true,
  },
  event_category: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  event_start: {
    type: Date,
    required: true,
  },
  event_end: {
    type: Date,
    required: true,
  },
  event_status: {
    type: String,
    required: true,
  },
  event_image: {
    type: String,
    required: true,
  },
  event_desc: {
    type: String,
    required: true,
  },
  ticketing: {
    type: [ticketSchema],
    required: true,
  },
});

const orderSchema = new mongoose.Schema(
  {
    order_id: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      ref: "User",
      required: true,
    },
    event_id: {
      type: String,
      ref: "Event",
      required: true,
    },
    ticketing: [
      {
        ticket_id: {
          type: String,
          required: true,
        },
        ticket_name: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = {
  userModel: mongoose.model("User", userSchema, "user"),
  eventModel: mongoose.model("Event", eventSchema, "event"),
  orderModel: mongoose.model("Order", orderSchema, "order"),
};
