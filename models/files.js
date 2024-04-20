const Sequelize = require('sequelize');

class File extends Sequelize.Model {
    static initiate(sequelize) {
        File.init({
            name: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            path: {
                type: Sequelize.STRING(260),
                allowNull: false,
            },
            author: { // FK
                type: Sequelize.STRING(30),
                allowNull: false,
            },
            size: {
                type: Sequelize.DOUBLE,
                allowNull: false,
            },
        }, {
            sequelize,
            timestamps: true,
            paranoid: false,
            underscored: false,
            modelName: "File",
            tableName: "files",
            charset: "utf8",
            collate: "utf8_general_ci",
        });
    }

    static associate(db) {
        db.File.belongsTo(db.User, {foreignKey: 'author', targetKey: 'id'});
        
        db.File.hasMany(db.Attach, {foreignKey: 'fileId', sourceKey: 'id'});
    }
}

module.exports = File;