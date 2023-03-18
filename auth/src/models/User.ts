import mongoose, { Document, Model, Schema } from 'mongoose'
import bcrypt from 'bcrypt'

interface UserAttrs {
    email: string
    password: string
}

interface UserDoc extends Document {
    email: string;
    password: string;
}

interface UserModel extends Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc
}

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
    },
    {
        toJSON: {
          transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
            delete ret.__v;
          }
        }
    }
)

userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs)
}

userSchema.pre('save', async function(done) {
    if (this.isModified('password')) {
        const hashed = await bcrypt.hash(this.get('password'), 10)
        this.set('password', hashed)
    }
    done()
})

const User = mongoose.model<UserDoc, UserModel>('User', userSchema)

export { User }
