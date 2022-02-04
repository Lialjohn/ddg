import db from "../db"
import {
  Model,
  DataTypes,
  Optional
} from "sequelize"
import crypto from "crypto"

interface UserAttributes {
  id: number
  name: string
  email: string
  password: string
  salt: string
}

export interface UserInput extends Optional<UserAttributes, 'id' | 'email' | 'salt'> {}
export interface UserOutput extends Required<UserAttributes> {}

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
  declare id: number
  declare name: string
  declare email: string
  declare password: string
  declare salt: string
  
  static generateSalt = function(): string {
    return crypto.randomBytes(16).toString('base64')
  }
  static encryptPassword = function(text: string, salt: string): string {
    const hash = crypto.createHash('sha256')
    hash.update(text)
    hash.update(salt)
    return hash.digest('hex')
  }
  isPasswordCorrect(pw: string): boolean {
    return User.encryptPassword(pw, this.salt) === this.password
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(128),
      unique: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      // allowNull: false,
      // validate: {
      //   isEmail: true,
      //   notEmpty: true
      // }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        return this.getDataValue('password')
      }
    },
    salt: {
      type: DataTypes.STRING,
      get() {
        return this.getDataValue('salt')
      }
    },
  },
  {
    tableName: "users",
    sequelize: db
  }
)

const setSaltAndPassword = (user: User) => {
  if (user.changed('password')) {
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password, user.salt)
  }
}

User.beforeCreate(setSaltAndPassword)
User.beforeUpdate(setSaltAndPassword)

export default User