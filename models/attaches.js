const Sequelize = require('sequelize');

class Attach extends Sequelize.Model {
    static initiate(sequelize) {
        Attach.init({
            entityId: { // 유사 FK (lectureId, materialId, assingmentId, submissionId, noticeId 입력)
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            entityType: { // entitiId 구분 ('lecture', 'material', 'assingment', 'submission', 'notice' 입력)
                type: Sequelize.STRING(50),
                allowNull: false,
                primaryKey: true,
            },
            fileId: { // FK
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
            }
        }, {
            sequelize,
            timestamps: true,
            paranoid: false,
            underscored: false,
            modelName: "Attach",
            tableName: "attaches",
            charset: "utf8",
            collate: "utf8_general_ci",
        });
    }

    static associate(db) {
        db.Attach.belongsTo(db.File, {foreignKey: 'fileId', targetKey: 'id', onDelete: 'cascade'});
    }
}

module.exports = Attach;