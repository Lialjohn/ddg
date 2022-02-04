import db from "../db"
import {
  Model,
  DataTypes,
  Optional,
} from "sequelize"

interface CharacterAttributes {
    id: number
    name: string
    level: number
    maxHp: number
    class: string
}

export interface CharacterInput extends Optional<CharacterAttributes, 'id' | 'level' | 'maxHp'> {}
export interface CharacterOutput extends Required<CharacterAttributes> {}

class Character extends Model<CharacterAttributes, CharacterInput> implements CharacterAttributes {
    declare id: number
    declare name: string
    declare level: number
    declare maxHp: number
    declare class: string
}

Character.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    level: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    },
    class: {
        type: DataTypes.ENUM('warrior', 'healer', 'mage'),
        allowNull: false
    },
    maxHp: {
        type: DataTypes.INTEGER
    },
},
{
    tableName: "character",
    sequelize: db
})

export default Character