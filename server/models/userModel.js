import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    order_id : {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    amount: {
        type: Number,
        required: true,
        default: -2
    },
    status: {
        type: String,
        required: true,
        default: 'pending'

    }
});

const TicketSchema = new Schema({
    id: {
        type: String,
        required: true,
        default: 'ticketId'
        // unique: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    description: {
        type: String,
        required: true,
        default: 'ticket description'
    },
});

const UserSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    payment: {
        type: [PaymentSchema],
        default: null,
        index: {
            unique: true,
            sparse: true
        }
    },
    sessionsLeft: {
        type: Number,
        required: true,
        default: 0
    },
    tickets: {
        type: [TicketSchema],
        default: null,
        index: {
            unique: true,
            sparse: true
        }
    },
    role: {
        type: Number,
        required: true,
        default: 0
    },
    verifytoken: {
        type: String,
    }
}, {
    timestamps: true
});

export default mongoose.model('users', UserSchema);
