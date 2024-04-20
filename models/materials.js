const Sequelize = require('sequelize');

class Material extends Sequelize.Model {
    static initiate(sequelize) {
        Material.init({
            name: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            content: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            author: { // FK
                type: Sequelize.STRING(30),
                allowNull: false,
            },
            courseId: { // FK
                type: Sequelize.INTEGER,
                allowNull: false,
            },
        }, {
            sequelize,
            timestamps: true,
            paranoid: false,
            underscored: false,
            modelName: "Material",
            tableName: "materials",
            charset: "utf8",
            collate: "utf8_general_ci",
        });
    }

    static associate(db) {
        db.Material.belongsTo(db.User, {foreignKey: 'author', targetKey: 'id'});
        db.Material.belongsTo(db.Course, {foreignKey: 'courseId', targetKey: 'id', onDelete: 'cascade'});
    }
}

module.exports = Material;