module.exports = (sequelize, DataTypes) => {
    const tourItem = sequelize.define(
        'tourItem',
        {
            tourId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: 'tours', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            itemId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            type: {
                type: DataTypes.STRING,
                allowNull: false,
            }
        },
        { timestamps: true }
    )

    // assocation with tour
    tourItem.associate = (models) => {
        tourItem.belongsTo(models.tour, { foreignKey: 'tourId' })
    }
    return tourItem;
}