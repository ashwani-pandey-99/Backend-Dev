const mongoose = require('mongoose');

function softDeletePlugin(schema) {
  schema.add({
    deleted: { type: Boolean, default: false },
    deletedAt: Date,
  });

  const queryMiddleware = function () {
    this.where({ deleted: false });
  };

  schema.pre('count', queryMiddleware);
  schema.pre('countDocuments', queryMiddleware);
  schema.pre('find', queryMiddleware);
  schema.pre('findOne', queryMiddleware);
  schema.pre('findOneAndUpdate', queryMiddleware);
  schema.pre('update', queryMiddleware);
  schema.pre('updateMany', queryMiddleware);
  schema.pre('updateOne', queryMiddleware);

  schema.methods.softDelete = function () {
    this.deleted = true;
    this.deletedAt = new Date();
    return this.save();
  };

  schema.methods.restore = function () {
    this.deleted = false;
    this.deletedAt = null;
    return this.save();
  };
}

module.exports = softDeletePlugin;
